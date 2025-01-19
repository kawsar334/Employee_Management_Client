import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';
import EmployeeList from '../../components/hrcomponents/EmployeeLists';
import StripeCheckout from 'react-stripe-checkout';
const EmployeeListForHr = () => {
    

    
    return (
        <div className='flex '>

       
            <Sidebar/>
           <EmployeeList/>
        </div>
    );
};

export default EmployeeListForHr;





