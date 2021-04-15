import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const Image = observer(({ url, onerror, onload }) => {

    useEffect(() => {
        // trigger reload even if src unchanged:
        // directly setting src needed because react caches img.src
        document.getElementById('cover-image').src=url.get()
        },
        [url]
    )

    return (
        <img    id="cover-image"
                onerror={onerror}
                onload={onload} />
    )
})

export default Image