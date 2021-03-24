import { memo } from 'react'

const ValueJson = memo(({ name, json, indent, moreSiblings }) => {

    let display = <span class="value-string">"{json}"</span>
    
    if (typeof json === 'boolean') {
        display = <span class="value-bool">{json.toString()}</span>
    } else if ( !isNaN(json) && !isNaN(parseFloat(json)) ) {
        display = <span class="value-numeric">{json}</span>
    } else if ( json === null ) {
        display = <span class="value-null">null</span>
    }

    return (
        <div style={{ cursor: 'text'  }}>
            <span class="indent">{indent}</span>
            <span class="property-name">"{name}"</span>
            <span>: </span>
            {display}
            {moreSiblings && <span>,</span>}
        </div>
    )
})

export default ValueJson