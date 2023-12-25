import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const ModalSetup = (props) => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggler} size={props.size}>
            <ModalHeader toggle={props.toggler}>
                {props.title}
            </ModalHeader>
            <ModalBody className={props.bodyClass}>
                {props.children}
            </ModalBody>
        </Modal>
    );
};

export default ModalSetup;