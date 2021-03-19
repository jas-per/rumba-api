import ObjectJson from './object';
import './index.css';

const defaultIndentIncr = 2;
// const defaultTheme = {
//   tagColor: '#d43900',
//   textColor: '#333',
//   attributeKeyColor: '#2a7ab0',
//   attributeValueColor: '#008000',
//   separatorColor: '#333',
//   commentColor: '#aaa',
//   cdataColor: '#1d781d',
//   overflowBreak: false,
// };

const invalidJson = (<div>Invalid JSON!</div>);

const JSONViewer = ({ json, collapsible, indentSize, indentIncr, ...props }) => {

    return (
        <div style={{ whiteSpace: 'pre'}} {...props}>
            <ObjectJson json={json}
                        indentSize={0}
                        indentIncr={indentIncr || defaultIndentIncr}
                        collapsible={collapsible}
                        moreSiblings={false} />
        </div>
    )

}

const JSONViewer4 = ({ json, collapsible, indentSize, ...props }) => {
    // const customTheme = { ...defaultTheme, ...theme };

    return (
        <div style={{ whiteSpace: 'pre'}} {...props}>
            <div>
                {'\{'}
            </div>
            <Element    json={json}
                        indentSize={2}
                        collapsible={collapsible} />
            <div>
                {'\}'}
            </div>
        </div>
    )
}

const JSONViewer2 = ({ json, theme, collapsible, indentSize, ...props }) => {
    const customTheme = { ...defaultTheme, ...theme };

    return (
        <div style={{ whiteSpace: 'pre'}} {...props}>
            <pre>
                {JSON.stringify(json,null,2)}
            </pre>
        </div>
    )
}

const JSONViewer3 = ({ json, theme, collapsible, indentSize, ...props }) => {
    const customTheme = { ...defaultTheme, ...theme };
    // console.log(json);
    // if (!Array.isArray(json.elements)) {
    //     return invalidJson;
    // }

    return (
        <div style={{ whiteSpace: 'pre'}} {...props}>
            <div>
                {(Array.isArray(json)) ? '[' : '{'}
            </div>
            <Element    json={json}
                        theme={customTheme}
                        indentation="  "
                        indentSize={indentSize || defaultIndentSize}
                        collapsible={collapsible} />
            <div>
                {(Array.isArray(json)) ? ']' : '}'}
            </div>
        </div>
    );
}

export default JSONViewer;

