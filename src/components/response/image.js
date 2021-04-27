import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const Image = observer(({ url, onerror, onload }) => {

    useEffect(() => {
            // avoid passing xhr-urls to img.src (view gets changed only after xhr-responses arrive)
            if (url.endpoint == 'getCoverArt') {
                // trigger reload even if src unchanged:
                // directly setting src needed because react caches img.src
                document.getElementById('cover-image').src=url.get()
            }
        },
        [url, url.ts]
    )

    return (
        <img    id="cover-image"
                onerror={onerror}
                onload={onload} />
    )
    
})

export default Image