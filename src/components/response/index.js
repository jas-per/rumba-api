import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'
import { DoubleLeftIcon, BullseyeIcon, AlertIcon } from '/icons'
import XMLViewer from 'react-xml-viewer'
import JSONViewer from './json-viewer'
import Download from './download'
import Image from './image'
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
                { response.type != 'none' && (
                    <>
                    <span class="url-base">
                        {response.url.base}
                    </span>
                    <span class="url-fill">
                        /rest/
                    </span>
                    <span class="url-endpoint">
                        {response.url.endpoint}
                    </span>
                    <span class="url-fill">
                        .view?
                    </span>
                    <span class="url-headparams">
                        {response.url.headparams}
                    </span>
                    {response.url.query && (
                        <span class="url-query">
                            &{response.url.query}
                        </span>
                    )}
                    </>
                )}
            </Card.Header>
        </Card>
        <div id="response-body">
            { response.type == 'none' ? (
                <div class="response-none">
                    <DoubleLeftIcon />
                    <span>
                        {/* TODO: insert help intro */}
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
                <Image  onerror={() => response.setError(true, 'Failed to load image')}
                        onload={() => response.setPending(false)}
                        url={response.url} />

            ) : (response.type == 'audioUrl' ? (
                <Card className="media-player">
                    <Player url={response.url}
                            onError={response.setError}
                            onLoad={response.setPending} />
                </Card>

            ) : (response.type == 'fileUrl' ? (
                <Download   url={response.url}
                            onerror={response.setError}
                            onload={response.setPending} />
            ) : (response.type == 'html' ? (
                /* eslint-disable-next-line react/no-danger */
                <div class="scrollbox" dangerouslySetInnerHTML={{__html: response.getBody()}} >
                    {/* trusts the servermessages ! pr welcome if you're concerned about xss */}
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