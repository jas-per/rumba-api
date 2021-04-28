import React from 'react'
import ReactDOM from 'react-dom'
import { getSnapshot } from "mobx-state-tree"
import App from '/components/app'
import AppStore from '/stores/app'
import apiJSON from '/stores/legacyApi'


// flag used on unload page, is set to true when user wants to reset the form data
window.clearLocalStorage = false

// create appState model from api-structure
let appState = AppStore.create(apiJSON)

// apply default values for head parameters because no html form is used here
// (default values for endpoint parameters will be stored in <input defaultValue>)
apiJSON.header.forEach((headParameter) => {
    appState.getHeadParameterByName(headParameter.name).setValue(headParameter.default)
})
// initialize with current server location as default
appState.getHeadParameterByName('server').setValue(location.origin)

// adapt base url if served from subdir
let appDir = location.pathname.substring(0, location.pathname.lastIndexOf('/')+1)

// start with empty response
appState.initResponse(appDir)

// uncomment when modifying model
// localStorage.clear()

if (window.localStorage) {
    // look for snapshot
    let snapshot = JSON.parse(localStorage.getItem('snapshot'))
    // restore state if snapshot present and api unchanged
    if (snapshot && (snapshot.version == appState.version)) {
        appState = AppStore.create(snapshot)
    }
    // register handler to take snapshot on unload
    window.addEventListener("unload", () => {
        if(!window.clearLocalStorage){
            try {
                // don't store response (could be too large) 
                appState.initResponse(appDir)
                localStorage.setItem('snapshot', JSON.stringify(getSnapshot(appState)))
            } catch(domException) {
                if (domException.name === 'QuotaExceededError' ||
                    domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        // very unlikely to happen - quota should give more than enough space for state data on modern browsers
                        console.log('Storage quota exeeded, deleting ui-state')
                        localStorage.clear()
                    }
            }
        }
    })
}

ReactDOM.render(
    React.createElement(App, {api: apiJSON, appState}),
    document.getElementById('root')
)
