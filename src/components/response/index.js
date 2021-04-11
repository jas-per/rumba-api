import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'
import { DoubleLeftIcon, BullseyeIcon, AlertIcon } from '/icons'
import XMLViewer from 'react-xml-viewer'
import JSONViewer from './json-viewer'
import Player from '/components/player'
import './index.css'

const xmlViewerTheme = {
	tagColor: '#008',
	textColor: '#606',
	attributeKeyColor: '#606',
	attributeValueColor: '#080'
}

const Response = observer(({ response }) =>

    <div id="response-display" class={`${response.error ? 'error' : ''}`}>
        <Card>
            <Card.Header id="response-url">
                <span>
                    {response.error ? <AlertIcon /> : <BullseyeIcon />} url: 
                </span>
                <span >
                    {response.url}
                </span>
            </Card.Header>
        </Card>
        <div id="response-body">
            { response.type == 'none' ? (
                <div class="response-none">
                    <DoubleLeftIcon />
                    <span>
                        <div>please use left menu</div>
                        <div>to call api endpoints</div>
                    </span>
                </div>

            ) : (response.type == 'json' ? (
                <div class="response-json scrollbox">
                    <JSONViewer json={response.getBody()} collapsible="true" />
                </div>

            ) : (response.type == 'xml' ? (
                <div class="response-xml scrollbox">
                    <XMLViewer xml={response.getBody()} theme={xmlViewerTheme} collapsible="true" />
                </div>

            ) : (response.type == 'imageUrl' ? (
                <img    onerror={() => response.setError(true, 'Failed to load image')}
                        onload={() => response.setPending(false)}
                        src={response.url} />

            ) : (response.type == 'audioUrl' ? (
                <Card>
                    <Player url={response.url}
                            onError={response.setError}
                            onLoad={response.setPending} />
                </Card>

            ) : (response.type == 'fileUrl' ? (
                <div>file download</div>

            ) : (response.type == 'html' ? (
                <div class="scrollbox" dangerouslySetInnerHTML={{__html: response.getBody()}} >
                    {/* trusts the servermessages ! */}
                </div>
            ) : (
                <pre>{response.getBody()}</pre>
            )))))))}
        </div>
        { response.pending && (
            <div id="pending">
                <div>
                    awaiting response ..
                </div>
            </div>
        )}
    </div>
)

export default Response