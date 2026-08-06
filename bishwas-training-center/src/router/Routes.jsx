
import { createBrowserRouter } from "react-router";
import RootLayout from "../rootlayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Admission from "../Pages/Admission";
import AdmissionForm from "../Components/AdmissionForm";
import DashboardLayout from "../Dashboard/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import StudentInfoStaff from "../Dashboard/StudentInfoStaff";
import AllStudentInfo from "../Dashboard/AllStudentInfo";
import UpdateAllStd from "../Dashboard/UpdateAllStd";
import TotalPymentInfo from "../Dashboard/TotalPymentInfo";
import BatchRelease from "../Dashboard/BatchRelease";
import PrivateRouter from "./PrivateRouter";
import DashboardMain from "../Dashboard/DashboardMain";
import About from "../Pages/About";
import TodayPaymentInfo from "../Dashboard/TodayPaymentInfo";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path:"about",
                Component:About
            },
            {
                path:'/admission',
                element: <PrivateRouter><Admission></Admission></PrivateRouter>
            },
            {
                path:'/admissionForm',
                element:<PrivateRouter><AdmissionForm></AdmissionForm></PrivateRouter>
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children:[
            {
              path:"/dashboard",
              element:<DashboardMain></DashboardMain>
            },
            {
                path:'/dashboard/users',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/dashboard/studentinfo',
                element:<StudentInfoStaff></StudentInfoStaff>
            },
            {
                path:'/dashboard/allstudentinfo',
                element:<AllStudentInfo></AllStudentInfo>
            },
            {
                path:'/dashboard/updateallstinfo',
                element:<UpdateAllStd></UpdateAllStd>
            },
            {
                path:'/dashboard/totalpaymentinfo',
                element:<TotalPymentInfo></TotalPymentInfo>
            },
            {
                path:'/dashboard/batchrelease',
                element:<BatchRelease></BatchRelease>
            },
            {
                path:'/dashboard/today-payment',
                element:<TodayPaymentInfo></TodayPaymentInfo>
            }
        ]
    }

])

export default router;