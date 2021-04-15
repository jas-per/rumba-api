import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const Download = observer(({ url, onerror, onload }) => {
    // use iframe for download to be able to directly show error-json inside
	useEffect(() => {
            let iframe = document.getElementById('iframe-download')
            iframe.src = 'about:blank'
            // little timeout to blank src inbetween
            if (url.get()) {
                setTimeout(function() {
                    iframe.src = url.get()
                }, 100)
            }
        },
        [url]
    )

    return (
        <div>
            <div>file download</div>
            <iframe id="iframe-download"
                    onerror={onerror}
                    onload={onload} />
        </div>
    )
})

export default Download