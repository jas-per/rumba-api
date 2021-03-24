import ObjectJson from './object';
import './index.css';

const defaultIndentIncr = 2;
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

export default JSONViewer;

