import {Card, CardBody, Col} from 'reactstrap';
import StepZilla from "react-stepzilla";
import React from "react";
import Step1 from "./operations/Step1";
import Step2 from "./operations/Step2";
import Step3 from "./operations/Step3";
import Step4 from "./operations/Step4";
import Step5 from "./operations/Step5";
import Step6 from "./operations/Step6";


const SpecificationsSystemFacilitiesWizard = ({idTracking}) => {

    const DefaultStep =[
        {name: 'تسهیلات گیرنده',component:<Step1 idTracking={idTracking} />, key: 1},
        {name: 'مشخصات فوتی',component:<Step2 idTracking={idTracking} />, key: 2},
        {name: 'مدارک شخصی',component:<Step3 idTracking={idTracking} />, key: 3},
        {name: 'مدارک قرارداد',component:<Step4 idTracking={idTracking} />, key: 4},
        {name: 'وضعیت کلی پرونده',component:<Step5 idTracking={idTracking} />, key: 5},
        {name: 'مشخصات قرارداد',component:<Step6 idTracking={idTracking} />, key: 6},
    ]

    return (
        <Col sm="12">
            <Card>
                <CardBody>
                    <StepZilla
                        steps={DefaultStep}
                        showNavigation={true}
                        stepsNavigation={true}
                        prevBtnOnLastStep={true}
                        className="u-pearls-xs"
                        nextButtonText={"بعدی"}
                        nextButtonCls={"btn btn-prev btn-primary btn-lg pull-right"}
                        backButtonText={"قبلی"}
                        backButtonCls={"btn btn-next btn-primary btn-lg pull-left"}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};
export default SpecificationsSystemFacilitiesWizard;