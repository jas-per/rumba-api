import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import Endpoint from '/components/endpoint'
import './index.css'


const EndpointList = observer(({ api, appState, showHelp, fetchEndpoint }) => 
    <ListGroup variant="flush" className="category-endpoints">
        {api.map((endpoint) => (
            <Endpoint 
                api={endpoint}
                appState={appState.getEndpointByName(endpoint.name)}
                showHelp={showHelp}
                toggleActiveEndpoint={appState.toggleActiveEndpoint}
                fetchEndpoint={fetchEndpoint}
                />
        ))}
    </ListGroup>
)

export default EndpointList