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
import UserDashboard from './pages/userLayout/UserDashboard';
import AdminDashboard from './pages/addminlayout/AdminDashboard';
import HrDashboard from './pages/hrLayout/HrDashboard';
import ProtectedRoute from './essentialRoutes/ProtectedRoute';
import UserRole from './essentialRoutes/UserRole';
import EmployeeListForHr from './pages/hrLayout/EmployeeListForHr';
import EmployeeDetails from './pages/hrLayout/EmployeeSolug';
import Reports from './pages/addminlayout/Reports';
import Payroll from './pages/addminlayout/Payrolls';




function App() {
  const {
    userRole,
    error,
  } = UserRole();
 

 
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,


      children: [
        {
          path: "/",
          element: (
        //  <ProtectedRoute>
          
              <Home />

    

          ),
        },
        {
          path: "/dashboard",
          element: (
            userRole === "admin" ? <AdminDashboard /> : userRole === "hr" ? <HrDashboard /> : <UserDashboard />
          ),
           
        },
        {
          path: "/admin/reports",
          element: (
            <Reports />
          )


        },

       
        {
          path: "/hremployeelist",
          element: (
            <EmployeeListForHr/>
          )
        },

        {
          path: "/payroll",
          element: (
            <Payroll />
          )
        },
        {
          path: "/analytics",
          element: (
            <PaymentHistory />
          )
        },


        {
          // for employee
          path: "/worksheet",
          element: (
            <WorkSheet />
          )
        },

        {
            path:"/employedetails/:id",
           element:(
           <EmployeeDetails/>
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
