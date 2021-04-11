import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from 'react-bootstrap'
import NetworkIndicator from '/components/logo'
import Help from '/components/help'
import Header from '/components/header'
import Category, { CategoryList } from '/components/category'
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
				<Card id="request-panel" className={`${showHelp ? 'col-7' : 'col-4'}`}>
					{/* header */}
					<Card.Header className="logo-header">
						<NetworkIndicator serverVersion={api.version} responsePending={appState.response.pending} />
						<h2>Request</h2>
						<Help toggle={toggleHelp} showing={showHelp} />
					</Card.Header>
					{/* head parameters */}
					<Header api={api.header}
							appState={appState}
							showHelp={showHelp} />
					{/* categories & selected endpoint */}
					<div id="api-panel">
						<CategoryList 	api={api.categories}
										appState={appState}
										showHelp={showHelp} />
						{appState.hasActiveCategory && (
							<div id="endpoints-panel">
								<Category
									api={api.categories.filter(category => category.name == appState.activeCategory.name)[0]}
									appState={appState.activeCategory}
									isMinimized={false}
									showEndpoints={true}
									showHelp={showHelp}
									toggleActiveCategory={appState.toggleActiveCategory}
									fetchEndpoint={appState.fetchEndpoint}
									/>
							</div>
						)}
					</div>
					{/* footer */}
					<Card.Footer className="text-muted">
						<div id="footer-actions">
							<div>
								<Button size="sm" variant="warning" onClick={clearLS}>reset form</Button>
							</div>
						</div>
					</Card.Footer>
				</Card>
				{/* response */}
				<Card id="response-panel" className="main-panel">
					<Card.Header className="logo-header">
						<h2>Response</h2>
					</Card.Header>
					<Response response={appState.response} />
				</Card>
			</div>
		</div>
	)
})

export default App                  