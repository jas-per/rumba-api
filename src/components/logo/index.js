import { useState } from 'react'
import AboutDialog from './about'
import './index.css'

const NetworkIndicator = ({serverVersion, responsePending}) => {

    const [showAbout, setShowAbout] = useState(false)

    return (
        <div id="logo">
            <img src="resources/logo.svg" class={`logo-animation ${responsePending ? '' : 'paused'}`} onClick={ () => setShowAbout(true) } />
            <AboutDialog show={showAbout} closeFn={ () => setShowAbout(false) } serverVersion={serverVersion} />
        </div>
    )
}

export default NetworkIndicator
