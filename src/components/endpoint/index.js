import { observer } from 'mobx-react-lite';
import { ListGroup, Card, Form, Col, Button } from 'react-bootstrap';
import { BsFillCaretRightFill,BsFillCaretDownFill } from "react-icons/bs";
import Parameter from '/components/parameter';
import './index.css';

const onFormSubmit = (event, fetchEndpoint) => {
    event.preventDefault();
	fetchEndpoint(	event.target.getAttribute('action'),
					new URLSearchParams(new FormData(event.target)).toString()
					)
};

const Endpoint = observer(({ api, appState, showHelp, toggleActiveEndpoint, fetchEndpoint }) => 
	<ListGroup.Item className={`endpoint-panel ${appState.active ? 'active' : ''}`}>
		<Card className="endpoint-card">
			<Card.Header className="endpoint-header" onClick={() => toggleActiveEndpoint(api.name)}>
				{appState.active ? <BsFillCaretDownFill /> : <BsFillCaretRightFill /> } {api.name}
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
					onSubmit={(event) => {onFormSubmit(event, fetchEndpoint)}}
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
								<Col className="help-col" />
							</Form.Row>
							<div class="parameters-list">
								{api.parameters.map((parameter, index) => (
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
);

export default Endpoint;
export { default as EndpointList } from './list'