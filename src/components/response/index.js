import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'
import { BsChevronDoubleLeft,BsBullseye } from 'react-icons/bs'
import XMLViewer from 'react-xml-viewer'
import JSONViewer from './json-viewer'
import Player from '/components/audio'
import './index.css'

const xmlViewerTheme = {
	tagColor: '#008',
	textColor: '#606',
	attributeKeyColor: '#606',
	attributeValueColor: '#080'
}

const Response = observer(({ response }) =>

    <div id="response-display" class={`${response.error ? 'err' : 'noErr'}`}>
        <Card>
            <Card.Header id="response-url">
                <span>
                    <BsBullseye/> url: 
                </span>
                <span >
                    {response.url}
                </span>
            </Card.Header>
        </Card>
        <div id="response-body">
            {response.type == 'none' ? (
                <div class="response-none">
                    <BsChevronDoubleLeft/>
                    <span>
                        <div>please use left menu</div>
                        <div>to call api endpoints</div>
                    </span>
                </div>
            ) : (response.type == 'json' ? (
                <div class="scrollbox">
                    <JSONViewer json={response.getBody()} collapsible="true" />
                </div>
            ) : (response.type == 'xml' ? (
                <div class="scrollbox">
                    <XMLViewer xml={response.getBody()} theme={xmlViewerTheme} collapsible="true" />
                </div>
            ) : (response.type == 'imageUrl' ? (
                <img src={response.url}/>
            ) : (response.type == 'audioUrl' ? (
                <Player url={response.url}/>
            ) : (response.type == 'fileUrl' ? (
                <div>file download</div>
            ) : (
                <div>default TODO: insert helptext</div>
            ))))))}
        </div>
    </div>
)

export default Response