import { observer } from 'mobx-react-lite'
import { Form, Col} from 'react-bootstrap'
import SelectParam from '/components/parameter/select'
import TextParam from '/components/parameter/text'
import './index.css'

const activateInput = (event, appState) => {
	if (!appState.send) {
		appState.setSend(true)
		setTimeout(() => {
			event.target.children[0].focus();
		}, 0)
	}
}

const Parameter = observer(({ appState, api, showHelp }) => 
	<Form.Row className="parameter">
		<Col className="name-col">
			{api.name}
		</Col>
		<Col className="send-col">
			<Form.Switch
				custom
				inline
				disabled={api.required}
				checked={api.required || appState.send}
				id={`send-${Math.floor(Math.random() * 10000000)}-${api.name}`}
				type="switch"
				onChange={() => {appState.toggleSend()}}
			/>
		</Col>
		<Col className="input-col" onClick={api.required ? '' : (event) => activateInput(event, appState)}>
			{(api.type == 'boolean' || (api.options && api.options.length)) ? (
				<SelectParam 
					appState={appState}
					api={api}
				/>
			) : (
				<TextParam 
					appState={appState}
					api={api}
					/>
			)}
		</Col>
		{showHelp && (
			<Col className="help-col">
				<div>
					{api.hint}
				</div>
				{api.compat && (
						<div class="compat-remark">
							{api.compat}
						</div>
					)}
			</Col>
		)}
	</Form.Row>
)

export default Parameter
