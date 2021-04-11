import { types, flow } from "mobx-state-tree"


const Parameter = types.model({

    name:   types.string,
    value:  types.maybe(types.frozen()),
    send:   false

}).actions(self => ({

    setValue(newValue) {
        self.value = newValue
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

}).views(self => ({

    getParameterByName(parameterName) {
        return self.parameters.filter(parameter => parameter.name == parameterName)[0]
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
        });
    }

})).views(self => ({

    getEndpointByName(endpointName) {
        return self.endpoints.filter(endpoint => endpoint.name == endpointName)[0]
    }

}))



const Response = types.model({

    url:    '',
    body:   '',
    type:   'none',
    pending: false,
    error:  false,

}).actions(self => ({

    setUrl(newUrl) {
        self.url = newUrl
    },

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
        self.error = newState
        // reload error-json when request for image or stream fails (no XHR used for those and no way to access original error json) 
        if ( newState && (self.type == 'imageUrl' || self.type == 'audioUrl')) {
            yield self.fetchUrl(self.url)
        }
    }),

    fetchUrl: flow(function* (requestUrl) {
        self.pending = true
        try {
            const response = yield fetch(requestUrl, {credentials: 'omit'})
            if (!response.ok) {
                throw new Error(yield response.text());
            }
            if (response.headers.get('Content-Type').includes('json')) {
                self.setBody( yield response.json(), 'json')
            } else {
                let newType = (response.headers.get('Content-Type').includes('xml')) ? 'xml' : 'text'
                self.setBody( yield response.text(), newType)
            }
            self.url = response.url
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

    initResponse() {
        self.response = Response.create()
    },

    cancelPendingRequest() {
        self.response.setPending(false)
    },

    toggleActiveCategory(categoryName) {
        self.categories.forEach((category) => {
            category.active = (category.name == categoryName && !category.active)
        });
    },

    fetchEndpoint: flow(function* (endpoint, parameters) {
        if (self.response.pending) return
        // create request url
        let requestUrl = '', headParameters = ''
        self.header.forEach((parameter) => { // transfer head parameters
            if (['c','v','f','u','p'].includes(parameter.name.charAt(0))) {
                headParameters += `${parameter.name.charAt(0)}=${parameter.value}&`
            } else if (parameter.name == 'server') {
                requestUrl = parameter.value
            }
        });
        if (parameters == '') { // no additional params, remove trailing &
            headParameters = headParameters.slice(0, -1)
        }
        requestUrl = `${requestUrl}/rest/${endpoint}.view?${headParameters}${parameters}`

        if (['getCoverArt','stream','download'].includes(endpoint)) {
            self.response.error = false
            if (self.response.url != requestUrl && endpoint != 'download') {
                self.response.pending = true
            }
            self.response.url = requestUrl
            if (endpoint == 'getCoverArt') {
                self.response.type = 'imageUrl'
            } else if (endpoint == 'stream') {
                self.response.type = 'audioUrl'
            } else {
                self.response.type = 'fileUrl'
                //  TODO mit iFrame ausprobieren, vielleicht geht dann auch onLoad!?
                window.location.href = requestUrl
            }
        } else {
            yield self.response.fetchUrl(requestUrl)
        }
    })

})).views(self => ({

    get hasActiveCategory() {
        return (self.categories.filter(category => category.active === true).length > 0)
    },
    get activeCategory() {
        return self.categories.filter(category => category.active === true)[0]
    },
    getCategoryByName(categoryName) {
        return self.categories.filter(category => category.name == categoryName)[0]
    },

    getHeadParameterByName(parameterName) {
        return self.header.filter(headParameter => headParameter.name == parameterName)[0]
    }

}))

export default AppStore;