import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup, Card } from 'react-bootstrap'
import { BsFillCaretRightFill,BsFillCaretDownFill,BsExclamationDiamond } from 'react-icons/bs'
import Parameter from '/components/parameter'
import './index.css'

const Header = observer(({ api, appState }) => {

    const [showHeader, setShowHeader] = useState(false)
	const toggleHeader = (event) => {
		if (event.target.className.includes('category')) {
			setShowHeader(!showHeader)
		}
	}

	return (
        <ListGroup variant="flush" id="header-panel">
            <div class={`head-parameters category-panel list-group-item ${showHeader ? ' withOverlay' :''}`} onClick={toggleHeader}>
                <Card className="category-card">
                    <Card.Header className="category-header" >
                        {showHeader ? (<BsFillCaretDownFill />) : (<BsFillCaretRightFill />) } <BsExclamationDiamond /> head parameters
                    </Card.Header>
                    <ListGroup variant="flush" className="head-parameter-list">
                        {api.map((parameter, index) => (
                            <Parameter 
                                appState={appState.getHeadParameterByName(parameter.name)}
                                api={parameter}
                            />
                        ))}
                    </ListGroup>
                </Card>
            </div>
        </ListGroup>
    )
});

export default Header