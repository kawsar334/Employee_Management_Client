import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import NotFoundPage from './pages/publicLayout/Notfound';
import Layout from './pages/publicLayout/Layout';
import Home from './pages/publicLayout/Home';
import Login from './pages/publicLayout/Login';
import Register from './pages/publicLayout/Registe';
import ContactUs from './pages/publicLayout/Contact';
import WorkSheet from './pages/userLayout/EmployeeWorkSheet';
import PaymentHistory from './pages/userLayout/PaymentHistory';
import UserDashboard from './pages/userLayout/EmployeeDashboard';
import AdminDashboard from './pages/addminlayout/AdminDashboard';
import HrDashboard from './pages/hrLayout/HrDashboard';
import ProtectedRoute from './essentialRoutes/ProtectedRoute';
import UserRole from './essentialRoutes/UserRole';
import EmployeeListForHr from './pages/hrLayout/EmployeeListForHr';
import EmployeeDetails from './pages/hrLayout/EmployeeSolug';
import Reports from './pages/addminlayout/Reports';
import Payroll from './pages/addminlayout/Payrolls';
import Analytics from './pages/hrLayout/Analytics';
import AdminEmployeeList from './pages/addminlayout/AdminPageEmployee';
import Profile from './pages/profile/Profile';




function App() {
  const { userRole, error,} = UserRole();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,


      children: [
        {
          path: "/",
          element: (
            <Home />
          ),
        },
        {
          path: "/dashboard",
          element: (
            userRole === "admin" ? <ProtectedRoute> <AdminDashboard /> </ProtectedRoute> : userRole === "hr" ? <ProtectedRoute><HrDashboard /></ProtectedRoute> : <ProtectedRoute> <UserDashboard /></ProtectedRoute>
          ),
        },
      
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>

          ),
        },
        // for admin
        {
          path:"/payroll",
          element: userRole === "admin" ? <Payroll /> : <Login />
        },
        {
          path:"/all-employee-list",
          element: userRole === "admin" ? <AdminEmployeeList /> : <Login />
        },
        {
          path: "/admin/reports",
          element: (
            userRole === "admin" ? <Reports /> : <Login />
          )
        },


        {
          // for employee
          path: "/worksheet",
          element: (

            userRole === "employee" ? <WorkSheet /> : <Login />
          )
        },
        // for employee
        {
          path: "/payment-history",
          element: (
            userRole === "employee" ? <PaymentHistory /> : <Login />
          )
        },
        // for hr
        {
          path: "/employedetails/:id",
          element: (
            userRole === "hr" ? <EmployeeDetails /> : <Login />
          )
        },
        // for hr
        {
          path: "/employeelist",
          element: (
            userRole === "hr" ? <EmployeeListForHr /> : <Login />
          )
        },
        // for hr
        {
          path: "/analytics",
          element: (
            userRole === "hr" ? <Analytics />:<Login />
          )
        },
        // public routes
        {
          path: "/contact",
          element: (
            <ContactUs />
          )


        },

        {
          path: "/login",
          element: (
            <Login />
          )
        },
        {
          path: "/register",
          element: (
            <Register />
          )
        },

      ],
    },

    {
      path: "*",
      element: (
        <NotFoundPage />
      ),
    },



  ]);


  return (
    <>

      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
