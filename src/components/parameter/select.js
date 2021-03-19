import { observer } from 'mobx-react-lite'
import { Form } from 'react-bootstrap'


const SelectParam = observer(({ appState, api}) =>
	<Form.Control 	as="select"
					name={api.name}
					value={appState.value}
					defaultValue={api.default}
					disabled={!api.required && !appState.send}
					onChange={(event) => {appState.setValue(event.target.value)}}
					custom
					size="sm"
					>
		{ ( api.options || [true,false] ).map((value) => (
			<option value={value}>
				{`${value}`}
			</option>
		))}
	</Form.Control>
)

export default SelectParam
