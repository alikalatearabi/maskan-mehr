import React, { Fragment } from 'react';
import { TabContent } from 'reactstrap';
import ColorPicker from './Tabs/ColorPicker/index';
import SidebarCusmizer from './Tabs/Sidebar';

const TabCustomizer = ({ selected, callbackNav }) => {
    return (
        <Fragment>
            <TabContent activeTab={selected} >
                <div className="customizer-body custom-scrollbar tab-content">
                    <ColorPicker />
                    <SidebarCusmizer />
                </div>
            </TabContent>
        </Fragment>
    );
};

export default TabCustomizer;