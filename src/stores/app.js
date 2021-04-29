import { types, flow } from "mobx-state-tree"


const Parameter = types.model({

    name:   types.string,
    value:  types.maybe(types.frozen()),
    send:   false

}).actions(self => ({

    setValue(newValue) {
        self.value = newValue
    },

    appendValue(newValue) {
        self.value += `,${newValue}`
    },

    toggleSend() {
        self.send = !self.send
    },
    
    setSend(newValue) {
        self.send = newValue
    }

}))



const Endpoint = types.model({

    name:       types.string,
    parameters: types.maybe(types.array(Parameter)),
    active:     false

}).actions(self => ({

    // take input data from query string and update UI
    setInput(queryString) {
        if (self.parameters) {
            self.parameters.forEach((parameter) => {
                parameter.setSend(false)
            })
            if (queryString) {
                queryString.split('&').forEach( (newParameter) => {
                    let param = self.getParameterByName(newParameter.split('=')[0])
                    if (param) {
                        let value = newParameter.split('=')[1]
                        if (value) {
                            if (param.send) { // send is false for first in multi
                                param.appendValue(value)
                            } else {
                                param.setValue(value)
                            }
                            param.setSend(true)
                        }
                    }
                })
            }
        }
    }

})).views(self => ({

    getParameterByName(parameterName) {
        return self.parameters.find(parameter => parameter.name == parameterName)
    }

}))



const Category = types.model({

    name:       types.string,
    endpoints:  types.array(Endpoint),
    active:     false

}).actions(self => ({

    toggleActiveEndpoint(endpointName) {
        self.endpoints.forEach((endpoint) => {
            endpoint.active = (endpoint.name == endpointName && !endpoint.active)
        })
    }

})).views(self => ({

    hasEndpoint(endpointName) {
        return (self.endpoints.filter(endpoint => endpoint.name == endpointName).length > 0)
    },
    getEndpointByName(endpointName) {
        return self.endpoints.find(endpoint => endpoint.name == endpointName)
    }

}))



const Url = types.model({

    base: '',
    appDir: '',
    endpoint: '',
    headparams: '',
    query: '',
    ts: types.optional(types.integer, () => new Date().getTime() ) // timestamp to also trigger same param urls

}).actions(self => ({

    setBase(base) {
        self.base = base
    },
    setEndpoint(endpoint) {
        self.endpoint = endpoint
    },
    setHeadparams(headparams) {
        self.headparams = headparams
    },
    setQuery(query) {
        self.query = query
    },
    setUrl( { base, endpoint, headparams, query, ts } ) {
        self.base = base
        self.endpoint = endpoint
        self.headparams = headparams
        self.query = query
        self.ts = ts
    }

})).views(self => ({

    get() {
        return `${self.base}/rest/${self.endpoint}.view?${self.headparams}${self.query != '' ? '&': ''}${self.query}`
    }

}))

const Response = types.model({

    url:    Url,
    body:   '',
    type:   'none',
    pending:false,
    error:  false,

}).actions(self => ({

    setBody(newBody, type) {
        let error = false
        if (type == 'json') {
            self.body = JSON.stringify(newBody)
            if (newBody['subsonic-response'].status != 'ok') {
                error = true
            }
        } else {
            self.body = newBody
            if (type == 'xml' && /status="(\w+)"/.exec(newBody)[1] != 'ok') {
                error = true
            }
        }
        self.type = type
        self.error = error
    },

    setPending(newState) {
        self.pending = newState
    },

    setError: flow(function* (newState, errorMsg) {
        if (errorMsg) {
            self.setBody(errorMsg, self.type)
        }
        self.error = newState
        // reload error-json when request for image or stream fails (no XHR used for those and no way to access original error json) 
        if ( newState && (self.type == 'imageUrl' || self.type == 'audioUrl')) {
            yield self.fetchUrl()
        }
    }),

    fetchUrl: flow(function* () {
        try {
            const response = yield fetch(self.url.get(), {credentials: 'omit'})
            if (!response.ok) {
                throw new Error(yield response.text())
            }
            if (self.url.get() != response.url) {
                // more recent fetch performed/in transit -> don't process this result
                return
            }
            if (response.headers.get('Content-Type').includes('json')) {
                self.setBody( yield response.json(), 'json')
            } else if (response.headers.get('Content-Type').includes('xml')) {
                self.setBody( yield response.text(), 'xml')
            } else {
                // probably wrong media type
                self.type = response.headers.get('Content-Type')
                self.setError(true, `${self.getBody()}\n${response.headers.get('Content-Type')}`)
            }
        } catch (error) {
            try {
                // html error page from server (404 etc)
                self.setBody(/<body>([\s\S]+)<\/body>/.exec(error)[1], 'html')
            } catch (e) {
                // sometimes its impossible to get a proper reason from the browser eg intentionally when using cors 
                self.setBody(`Server not found?!\n${error}`, 'text')
            }
            self.error = true
        }
        self.pending = false
    })

})).views(self => ({

    getBody(){
        return (self.type == 'json') ? JSON.parse(self.body) : self.body
    }

}))



const AppStore = types.model({

    categories:     types.array(Category),
    header:         types.array(Parameter),
    version:        types.string,
    response:       types.maybe(Response),

}).actions(self => ({

    initResponse(appDir) {
        self.response = Response.create({url: {appDir}})
    },

    toggleActiveCategory(categoryName) {
        self.categories.forEach((category) => {
            category.active = (category.name == categoryName && !category.active)
        })
    },

    // adapt UI to query (history changes from browser)
    selectEndpoint(endpointName, parameters) {
        let cat = self.getCategoryByEndpoint(endpointName)
        if (cat) {
            cat.active = false
            self.toggleActiveCategory(cat.name)
            let endpoint = cat.getEndpointByName(endpointName)
            if (endpoint) {
                endpoint.active = false
                cat.toggleActiveEndpoint(endpointName)
                endpoint.setInput(parameters)
            }
        }
    },

    fetchEndpoint: flow(function* (endpointName, parameters, directFetch) {
        if (!endpointName || endpointName == '/') { // show startpage if root url
            self.response.type = 'none'
            return
        }
        let headParameters = ''
        let requestUrl = Url.create()
        requestUrl.setEndpoint(endpointName)
        requestUrl.setQuery(parameters)

        self.header.forEach((parameter) => { // transfer head parameters
            if (['c','v','f','u','p'].includes(parameter.name.charAt(0))) {
                headParameters += `${parameter.name.charAt(0)}=${parameter.value}&`
            } else if (parameter.name == 'server') {
                requestUrl.setBase(parameter.value)
            }
        })
        requestUrl.setHeadparams(headParameters.slice(0, -1)) // remove trailing &

        if (!directFetch) {
            self.selectEndpoint(endpointName, parameters)
        }
        self.response.error = false
        self.response.pending = true
        self.response.url.setUrl(requestUrl)
        if (['getCoverArt','stream','download'].includes(endpointName)) {
            if (endpointName == 'getCoverArt') {
                self.response.type = 'imageUrl'
            } else if (endpointName == 'stream') {
                self.response.type = 'audioUrl'
            } else {
                self.response.type = 'fileUrl'
            }
        } else {
            yield self.response.fetchUrl()
        }
    })

})).views(self => ({

    get hasActiveCategory() {
        return (self.categories.filter(category => category.active === true).length > 0)
    },
    get activeCategory() {
        return self.categories.find(category => category.active === true)
    },
    getCategoryByName(categoryName) {
        return self.categories.find(category => category.name == categoryName)
    },
    getCategoryByEndpoint(endpointName) {
        return self.categories.find(category => category.hasEndpoint(endpointName))
    },
    getHeadParameterByName(parameterName) {
        return self.header.find(headParameter => headParameter.name == parameterName)
    }

}))

export default AppStore