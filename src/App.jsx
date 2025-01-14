import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import NotFoundPage from './pages/Notfound';
import Layout from './pages/userLayout/Layout';
import Home from './pages/userLayout/Home';
import Login from './pages/userLayout/Login';
import Register from './pages/userLayout/Registe';
import ContactUs from './pages/Contact';
import WorkSheet from './pages/userLayout/EmployeeWorkSheet';
import PaymentHistory from './pages/userLayout/PaymentHistory';
import UserDashboard from './pages/userLayout/UserDashboard';




function App() {

  
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
          path: "/userdashboard",
          element: (
            <UserDashboard />
          )


        },
        {
          path: "/contact",
          element: (
            <ContactUs />
          )

          
        },

        {
          path: "/worksheet",
          element: (
            <WorkSheet />
          )
        },

        {
          path: "/paymenthistoroy",
          element: (
            <PaymentHistory />
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
