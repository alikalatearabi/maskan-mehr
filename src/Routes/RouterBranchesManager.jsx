import SpecificationsMaskanMehr from "../Pages/Operation/SpecificationsMaskanMehr";
import NewReceiverFacility from "../Pages/Operation/NewReceiverFacility";
import SpecificationsSystemFacilities from "../Pages/Operation/SpecificationsSystemFacilities";
import ReceiveTheDeathFile from "../Pages/Operation/ReceiveTheDeathFile";

import ReportsDamageCases from "../Pages/Reports/ReportsDamageCases";


import Cheque from "../Pages/Cheque/Cheque";


import Err404 from "../Pages/error/Err404";
import ChangePassword from "../Pages/ChangePassword";


export const routerBranchesManager = [

    { path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsMaskanMehr/`, Component: <SpecificationsMaskanMehr /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/operations/NewReceiverFacility/`, Component: <NewReceiverFacility /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsSystemFacilities/`, Component: <SpecificationsSystemFacilities /> },
    { path: `${process.env.PUBLIC_URL}/dashboard/operations/ReceiveTheDeathFile/`, Component: <ReceiveTheDeathFile /> },

    { path: `${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`, Component: <ReportsDamageCases /> },

    { path: `${process.env.PUBLIC_URL}/changePassword/`, Component: <ChangePassword /> },

    { path: `${process.env.PUBLIC_URL}/*`, Component: <Err404 /> },
];