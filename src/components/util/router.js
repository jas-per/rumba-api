import { useEffect, useRef, useCallback } from 'react'
import useLocation from 'wouter-preact/use-location'

const useRouter = appState => {

	const directFetch = useRef(false) // adapt ui only on history changes from browser not on form submit 
	const [path, setLocation] = useLocation({base:appState.response.url.appDir}) // access to history states
    
	// api call
	const fetchEndpoint =  useCallback((endpoint, query) => {
		appState.fetchEndpoint(endpoint, query, directFetch.current)
		directFetch.current = false // reset direct flag
	},[appState])

	// form-submit
	const pushBrowserState = (endpoint, query) => {
		directFetch.current = true 
		// don't push new state to history if same endpoint&query but do fetch again from server
		if (`${endpoint}` == path && ((!query && !location.search) || `?${query}` == location.search)) {
			fetchEndpoint(endpoint, query)
		} else {
			if (query) {
				query = `?${query}`
			}
			setLocation(`${endpoint}${query}`)
		}	
	}

	// location changed! (history event from browser)
	useEffect(() => {
			// remove starting '$'
			let query = location.search ? location.search.slice(1) : location.search
			// using location.search directly because wouter doesn't support querystring access yet
			// see https://github.com/molefrog/wouter/issues/58
			fetchEndpoint(path, query)
		},
		// linter thinks location.search is unnecessary -> is needed to trigger on querystring changes!
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[path, location.search, fetchEndpoint]
	)

    return [pushBrowserState]
}

export default useRouter