import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button, ListGroup } from 'react-bootstrap'
import NetworkIndicator from '/components/logo'
import Header from '/components/header'
import Category from '/components/category'
import Response from '/components/response'
import './bootstrap.scss'
import './index.css'

const clearLS = () => {
	window.localStorage.clear()
	window.clearLocalStorage = true
	document.location.reload()
}

const App = observer(({ api, appState }) => {

	const [showHelp, setShowHelp] = useState(false)
	const toggleHelp = () => setShowHelp(!showHelp)

	return (
		<div id="app" class="container-fluid">
			<div class="row">
				{/* request */}
				<Card id="request-panel" className={`${showHelp ? 'col-7 withHelp' : 'col-4 withoutHelp'}`}>
					<Card.Header className="logo-header">
						<NetworkIndicator serverVersion={api.version} requestPending={appState.requestPending} />
						<h2>Request</h2>
					</Card.Header>
					{/* head parameters */}
					<Header api={api.header}
							appState={appState} />
					{/* categories */}
					<ListGroup variant="flush" id="categorys-panel">
						{api.categories.map((category, index) => (
							<Category
								api={category}
								appState={appState.getCategoryByName(category.name)}
								toggleActiveCategory={appState.toggleActiveCategory}
								fetchEndpoint={appState.fetchEndpoint}
								/>
						))}
					</ListGroup>
					<Card.Footer className="text-muted">
						<div id="footer-actions">
							<div>
								<Button size="sm" onClick={clearLS}>reset form</Button>
							</div>
							<div>
								<Button size="sm" onClick={toggleHelp}>help</Button>
							</div>
						</div>
					</Card.Footer>
				</Card>
				{/* response */}
				<Card id="response-panel" className="main-panel">
					<Card.Header className="logo-header">
						<h2>Response</h2>
					</Card.Header>
					<Response response={appState.response}/>
				</Card>
			</div>
		</div>
	)
})

export default App                  