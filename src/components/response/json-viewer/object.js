import { useState, memo } from 'react'
import ArrayJson from './array'
import ValueJson from './value'


const ObjectJson = memo(({ name, json, collapsible, indentSize, indentIncr, moreSiblings }) => {

    const [collapsed, toggleCollapse] = useState(false)
    const propCount = Object.keys(json).length
    const indent = ' '.repeat(indentSize)

    return (
        <>
            <div style = {{ cursor: (collapsible && propCount ? 'pointer' : 'text') }}
                 onClick = {(event) => {
                                if (!collapsible || !propCount) return
                                event.stopPropagation();
                                event.preventDefault();
                                toggleCollapse(!collapsed);
                            }}>
                <span class="indent">{indent}</span>
                <span>
                    {collapsible && propCount ? (
                        <span class={`${collapsed ? 'fold-open' : 'fold-close'}`} />
                    ) : (
                        <span class="foldIndent">  </span>
                    )}
                    {name && <><span class="property-name">"{name}"</span><span>: </span></>}
                    {"{"}
                </span>
                {collapsed && (
                    <span class="collapsedInfo">
                        {` .. ${propCount} prop`}{propCount > 1 && 's'}
                    </span>
                )}
                {(collapsed || !propCount) && (
                    <span>{" }"}{moreSiblings && ","}</span>
                )}
            </div>
            {!collapsed && Object.keys(json).map((key, index) => (
                <>
                    {(!!json[key] && json[key].constructor === Object) ? (
                        <ObjectJson name={key}
                                    json={json[key]}
                                    collapsible={collapsible}
                                    indentSize={indentSize + indentIncr}
                                    indentIncr={indentIncr}
                                    moreSiblings={index < propCount -1}
                                    />
                    ) : ((Array.isArray(json[key])) ? (
                        <ArrayJson  name={key}
                                    json={json[key]}
                                    collapsible={collapsible}
                                    indentSize={indentSize + indentIncr}
                                    indentIncr={indentIncr}
                                    moreSiblings={index < propCount -1}
                                    />
                    ) : (
                        <ValueJson  name={key}
                                    json={json[key]} 
                                    indent={indent + ' '.repeat(indentIncr+2)}
                                    moreSiblings={index < propCount -1}
                                    />
                    ))}
                </> 
            ))}
            {(!collapsed && !!propCount) && (
                <div style={{ cursor: 'text'  }}>
                    <span class="indent">{indent}</span>
                    <span>
                        {"  }"}
                        {moreSiblings && ","}
                    </span>
                </div>
            )}
        </> 
    )
})

export default ObjectJson