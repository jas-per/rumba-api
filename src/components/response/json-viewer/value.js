import { memo } from 'react'

const ValueJson = memo(({ name, json, indent, moreSiblings }) => {

    let display = <span class="value-string">"{json}"</span>
    if (typeof(json) == Boolean){
        display = <span class="value-bool">{json}</span>
    }

    return (
        <div style={{ cursor: 'text'  }}>
            <span class="indent">{indent}</span>
            <span>"{name}": </span>{display}
            <span>{moreSiblings && ","}</span>
        </div>
    )
})

export default ValueJson