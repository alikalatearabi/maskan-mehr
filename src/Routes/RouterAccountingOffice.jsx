import ReportsDamageCases from "../Pages/Reports/ReportsDamageCases";
import Err404 from "../Pages/error/Err404";
import ChangePassword from "../Pages/ChangePassword";


export const routerAccountingOffice = [

    { path: `${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`, Component: <ReportsDamageCases /> },

    { path: `${process.env.PUBLIC_URL}/changePassword/`, Component: <ChangePassword /> },

    { path: `${process.env.PUBLIC_URL}/*`, Component: <Err404 /> },
];