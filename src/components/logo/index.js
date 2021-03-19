import { useState } from 'react'
import AboutDialog from './about'
import './index.css'

const NetworkIndicator = ({serverVersion, requestPending}) => {

    const [showAbout, setShowAbout] = useState(false)

    return (
        <div id="logo">
            {requestPending ? (
                <picture onClick={ () => setShowAbout(true) } >
                    <source srcSet="/resources/logo/logo_load.webp" type="image/webp" />
                    <source srcSet="/resources/logo/logo_load.apng" type="image/png" />
                    <img src="/resources/logo/logo_load.gif" />
                </picture>
            ) : (
                <img src="/resources/logo/logo_still.png" onClick={ () => setShowAbout(true) } />
            )}
            <AboutDialog show={showAbout} closeFn={ () => setShowAbout(false) } serverVersion={serverVersion}/>
        </div>
    )
}

export default NetworkIndicator
