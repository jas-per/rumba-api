import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const Download = observer(({ url, onerror, onload }) => {

    // use iframe for download to be able to directly show error-json inside
    // since iframes fire onLoad only once, not when changing src after creation
    // the iframe has to be recreated every time
	useEffect(() => {
            // avoid passing xhr-urls to iframe (view gets changed only after xhr-responses arrive)
            if (url.endpoint == 'download') {
                // delete old iframe
                document.getElementById('iframe-div').innerHTML = ''
                //  create new one
                const iframe = document.createElement("iframe")
                iframe.onload = () => onload(false)
                iframe.onerror = () => onerror(true, 'Failed to load file')
                iframe.src = url.href
                // append to dom
                document.getElementById('iframe-div').appendChild(iframe)
            }
        },
        [url, url.ts, onload, onerror]
    )

    return (
        <div>
            <div>file download</div>
            <div id="iframe-div" />
        </div>
    )
    
})

export default Download