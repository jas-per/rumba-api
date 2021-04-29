import { observer } from 'mobx-react-lite'
import { ListGroup, Card, Form, Col, Button } from 'react-bootstrap'
import { CaretRightIcon, CaretDownIcon } from '/icons'
import Parameter from '/components/parameter'
import './index.css'


const Endpoint = observer(({ api, appState, showHelp, toggleActiveEndpoint, pushBrowserState }) => {

	const onFormSubmit = (event) => {
		event.preventDefault()
		let endpoint = event.target.getAttribute('action')
		// use browser processed form data:
		// -> input gets validated via FormData
		let formParams = new FormData(event.target)
		// -> split text inputs with comma-separated arrays into multiple params with the same name
		if (api.parameters && api.parameters.filter(parameter => parameter.multiple)) {
			for (let param of api.parameters.filter(parameter => parameter.multiple)) {
				param = appState.getParameterByName(param.name)
				if (param.send && param.value) {
					let values = param.value.split(',')
					formParams.delete(param.name)
					for (let value of values) {
						if (value.trim()) {
							formParams.append(param.name, value.trim())
						}
					}
				}
			}
		}
		// -> and encode with URLSearchParams()
		let params = new URLSearchParams(formParams).toString()
		pushBrowserState(endpoint, params)
	}

	return (
		<ListGroup.Item className={`endpoint-panel ${appState.active ? 'active' : ''}`}>
			<Card className="endpoint-card">
				<Card.Header className="endpoint-header" onClick={() => toggleActiveEndpoint(api.name)}>
					{appState.active ? <CaretDownIcon /> : <CaretRightIcon /> } {api.name}
				</Card.Header>
				{showHelp && (
					<div class="help-text">
						<div>
						{api.hint}
						</div>
						{api.compat && (
							<div class="compat-remark">
								{api.compat}
							</div>
						)}
					</div>
				)}
				<Form 	className={`endpoint-form ${appState.active ? 'active' : ''}`}
						onSubmit={(event) => { onFormSubmit(event) }}
						action={api.name}
						>
					<div class="parameters-border">
						{api.parameters ? (
							<>
								<Form.Row className="parameters-header">
									<Col className="name-col">
										parameter
									</Col>
									<Col className="send-col">
										send
									</Col>
									<Col className="input-col">
										value
									</Col>
									{showHelp && (
										<Col className="help-col" />
									)}
								</Form.Row>
								<div class="parameters-list">
									{api.parameters.map((parameter) => (
										<Parameter 
											appState={appState.getParameterByName(parameter.name)}
											api={parameter}
											showHelp={showHelp}
										/>
									))}
								</div>
							</>
						) : (
							<Form.Row className="parameters-none">
								<Col>
									endpoint without parameters
								</Col>
							</Form.Row>
						)}
					</div>
					<Form.Row className="submit-panel">
						<Button size="sm" type="submit">Call</Button>
					</Form.Row>
				</Form>
			</Card>
		</ListGroup.Item>
	)
})

export default Endpoint
export { default as EndpointList } from './list'