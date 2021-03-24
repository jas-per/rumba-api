import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup, Card } from 'react-bootstrap'
import { BsFillCaretRightFill,BsFillCaretDownFill } from 'react-icons/bs'
import Parameter from '/components/parameter'
import './index.css'

const Header = observer(({ api, appState, showHelp }) => {

    const [showHeader, setShowHeader] = useState(false)
	const toggleHeader = (event) => {
		if (event.target.tagName == 'svg' || event.target.tagName == 'path' || event.target.className.includes('category')) {
			setShowHeader(!showHeader)
		}
	}

	return (
        <ListGroup variant="flush" id="header-panel">
            <div class={`head-parameters category-panel list-group-item ${showHeader ? 'with-overlay' :''}`} onClick={toggleHeader}>
                <Card className="category-card">
                    <Card.Header className="category-header" >
                        {showHeader ? <BsFillCaretDownFill /> : <BsFillCaretRightFill /> } head parameters
                    </Card.Header>
                    <ListGroup variant="flush" className="head-parameter-list">
                        {api.map((parameter, index) => (
                            <Parameter 
                                appState={appState.getHeadParameterByName(parameter.name)}
                                api={parameter}
                                showHelp={showHelp}
                            />
                        ))}
                    </ListGroup>
                </Card>
            </div>
        </ListGroup>
    )
});

export default Header