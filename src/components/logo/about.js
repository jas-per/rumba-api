import { Modal, Button } from 'react-bootstrap'

/* global APP_META */

const AboutDialog = ({ show, closeFn, serverVersion }) => 
    <Modal show={show} onHide={closeFn} dialogClassName="modal-about">
        <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body id="dialog-about">
            <div className="infobox">
                <div>
                    <img src="resources/logo.svg" />
                </div>
                <div>
                    <div className="infohead">
                    {APP_META.name} v{APP_META.version}
                    </div>
                    <div>
                    written by {APP_META.author}, license: {APP_META.license}
                    </div>
                    <div>
                    Homepage: <a href={APP_META.homepage} target="_blank" rel="noopener noreferrer">{APP_META.homepage}</a>
                    </div>
                    <div>
                    Bugtracker: <a href={APP_META.bugs.url} target="_blank" rel="noopener noreferrer">{APP_META.bugs.url}</a>
                    </div>
                    <div>
                    Server-Api version: {serverVersion}
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={closeFn} bsStyle="warning">Close</Button>
        </Modal.Footer>
    </Modal>

export default AboutDialog