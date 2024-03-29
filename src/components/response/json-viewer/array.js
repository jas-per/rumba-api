import { useState, memo } from 'react'
import ObjectJson from './object'
import ValueJson from './value'


const ArrayJson = memo(({ name, json, collapsible, indentSize, indentIncr, moreSiblings }) => {

    const [collapsed, toggleCollapse] = useState(false)
    const itemCount = json.length
    const indent = ' '.repeat(indentSize)

    return (
        <>
            <div style = {{ cursor: (collapsible && itemCount ? 'pointer' : 'text') }}
                 onClick = {(event) => {
                                if (!collapsible || !itemCount) return
                                event.stopPropagation()
                                event.preventDefault()
                                toggleCollapse(!collapsed)
                            }}>
                <span class="indent">{indent}</span>
                <span>
                    {collapsible && itemCount ? (
                        <span class={`${collapsed ? 'fold-open' : 'fold-close'}`} />
                    ) : (
                        <span class="foldIndent">  </span>
                    )}
                    {name && <><span class="property-name">"{name}"</span><span>: </span></>}
                    {"["}
                </span>
                {collapsed && (
                    <span class="collapsedInfo">
                        {` .. ${itemCount} item`}{itemCount > 1 && 's'}
                    </span>
                )}
                {(collapsed || !itemCount) && (
                    <span>{" ]"}{moreSiblings && ","}</span>
                )}
            </div>
            {!collapsed && json.map((element, index) => (
                <>
                    {(!!element && element.constructor === Object) ? (
                        <ObjectJson json={element}
                                    collapsible={collapsible}
                                    indentSize={indentSize + indentIncr}
                                    indentIncr={indentIncr}
                                    moreSiblings={index < itemCount -1}
                                    />
                    ) : ((Array.isArray(json[index])) ? (
                        <ArrayJson  json={element}
                                    collapsible={collapsible}
                                    indentSize={indentSize + indentIncr}
                                    indentIncr={indentIncr}
                                    moreSiblings={index < itemCount -1}
                                    />
                    ) : (
                        <ValueJson  name={index}
                                    json={element} 
                                    indent={indent + ' '.repeat(indentIncr+2)}
                                    moreSiblings={index < itemCount}
                                    />
                    ))}
                </>
            ))}
            {(!collapsed && !!itemCount) && (
                <div style={{ cursor: 'text'  }}>
                    <span class="indent">{indent}</span>
                    <span>
                        {"  ]"}
                        {moreSiblings && ","}
                    </span>
                </div>
            )}
        </> 
    )
})

export default ArrayJson