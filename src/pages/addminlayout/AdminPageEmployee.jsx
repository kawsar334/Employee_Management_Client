

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import AdminEmployeeListComponent from '../../components/admincomponents/AdminEmployeeComponent';

const AdminEmployeeList = () => {

    return (
        <div className="w-full px-4 py-6 flex">
            <Sidebar/>
         <div>
            <AdminEmployeeListComponent/>
         </div>
        </div>
    );
};

export default AdminEmployeeList;
