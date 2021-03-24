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
    error:  false,

}).actions(self => ({

    setUrl(newUrl) {
        self.url = newUrl
    },

    setBody(newBody, type) {
        if (type == 'json') {
            self.body = JSON.stringify(newBody)
        } else {
            self.body = newBody
        }
        self.type = type
    }

})).views(self => ({

    getBody(){
        return (self.type == 'json') ? JSON.parse(self.body) : self.body
    }

}))



const AppStore = types.model({

    categories:     types.array(Category),
    header:         types.array(Parameter),
    version:        types.string,
    requestPending: false,
    response:       types.maybe(Response),

}).actions(self => ({

    initResponse() {
        self.response = Response.create()
    },

    toggleActiveCategory(categoryName) {
        self.categories.forEach((category) => {
            category.active = (category.name == categoryName && !category.active)
        });
    },

    fetchEndpoint: flow(function* (endpoint, parameters) {
        if (self.requestPending) return
        let requestUrl = '', headParameters = ''
        // transfer head parameters
        self.header.forEach((parameter) => {
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

        if (['getCoverArt','stream','download'].includes(endpoint)){
            self.response.url = requestUrl
            if (endpoint == 'getCoverArt') {
                self.response.type = 'imageUrl'
            } else if (endpoint == 'stream') {
                self.response.type = 'audioUrl'
            } else {
                self.response.type = 'fileUrl'
                window.location.href = requestUrl
            }
        } else {
            self.requestPending = true
            try {
                const response = yield fetch(requestUrl, {credentials: 'omit'})
                if (!response.ok) {
                    throw new Error('Server error', response);
                }
                self.response.url = response.url
                if (response.headers.get('Content-Type').includes('json')) {
                    self.response.setBody( yield response.json(), 'json')
                } else {
                    let newType = (response.headers.get('Content-Type').includes('xml')) ? 'xml' : 'text'
                    self.response.setBody( yield response.text(), newType)
                }
            } catch (error) {
                // TODO: error handling including subsonic error responses
                console.error("Failed to fetch", error)
            }
            self.requestPending = false
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