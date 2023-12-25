import {Btn} from '../../../AbstractElements';
import React, {Fragment, useState} from 'react';
import SpecificationsSystemFacilitiesWizard from "./ModalWizard";
import ModalSetup from "./ModalWizard/ModalSetup";
import "./modal.css"
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import PaymentDetails from "./PaymentDetails";
import Chatting from "./Chatting";
import axios from "../../../api/axios";
import {useEffectOnce} from "react-use";


const SpecificationsSystemFacilitiesModal = ({idTracking}) => {

    const token = localStorage.getItem('token')

    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    // tab
    const [BasicTab, setBasicTab] = useState('1');



    const [systemState, setSystemState] = useState();

    useEffectOnce(() => {
        axios.post("/DeceasedDocument/GetSystemState", parseInt(idTracking),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                setSystemState(response.data)
            })
    })


    return (
        <Fragment>
            <a onClick={LargeModaltoggle} className="text-primary mx-2"><i className="icofont icofont-settings"></i></a>
            <ModalSetup isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="xl">

                <Nav tabs>
                    <NavItem>
                        <NavLink className={BasicTab === '1' ? 'active' : ''} onClick={() => setBasicTab('1')}>عملیات</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={BasicTab === '2' ? 'active' : ''} onClick={() => setBasicTab('2')}>مشخصات پرداخت</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={BasicTab === '3' ? 'active' : ''} onClick={() => setBasicTab('3')}>مکاتبات</NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={BasicTab}>

                    <TabPane className="fade show" tabId="1">
                        <SpecificationsSystemFacilitiesWizard idTracking={idTracking} />
                    </TabPane>
                    <TabPane tabId="2">
                        <PaymentDetails idTracking={idTracking} />
                    </TabPane>
                    <TabPane tabId="3">
                        <Chatting idTracking={idTracking} />
                    </TabPane>

                </TabContent>

            </ModalSetup>
        </Fragment>
    );
};
export default SpecificationsSystemFacilitiesModal;
