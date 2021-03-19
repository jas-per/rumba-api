import { observer } from 'mobx-react-lite'
import { Form } from 'react-bootstrap'


const TextParam = observer(({ appState, api }) => 
	<Form.Control
		type={(api.type == 'float' || (api.type == 'int' && !api.multiple)) ? "number" : "text"}
		name={api.name}
		value={appState.value}
		defaultValue={api.default}
		disabled={!api.required && !appState.send}
		placeholder={api.multiple ? "1 or [1, 2, 3, ..]" : api.type}
		min={api.min} max={api.max} step={api.type == 'float' ? 0.01 : 1}
		onChange={(event) => {appState.setValue(event.target.value)}}
		size="sm"
	/>
)

export default TextParam