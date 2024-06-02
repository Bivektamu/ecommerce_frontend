import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../../../pages/admin/Private";
import DashBoard from "../../../pages/admin/DashBoard";


const router = createBrowserRouter([
   {
    path: '/',
    element: <DashBoard />
   },
])

export default router