import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';
import EmployeeList from '../../components/hrcomponents/EmployeeLists';

const EmployeeListForHr = () => {
    const [employees, setEmployees] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({ month: '', year: '' });
    const [salary, setSalary] = useState(0)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
  
    useEffect(() => {
        fetchEmployees();
    }, [page, limit]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://employee-one-coral.vercel.app/api/user/userList', {
                params: { page, limit },
                withCredentials: true,
            } );
            const user = response?.data?.data.filter((i)=>i.role === "employee");
            console.log(user)
            setEmployees(user);
        } catch (err) {
            console.error(err);
        }
    };



    const toggleVerification = async (id) => {
     const data =  await axios.put(`https://employee-one-coral.vercel.app/api/user/verifiyemployee/${id}`, { withCredentials: true });
       toast.success(data?.data.message);
        fetchEmployees();
    };

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setSalary(employee?.salary)
        setModalIsOpen(true);
    };

    const handlePay = async () => {
        const {month,year,} = paymentInfo
      try{

        const data =  await axios.post(`https://employee-one-coral.vercel.app/api/payment/createpay/${selectedEmployee._id}`, { month, year, amount: salary }, { withCredentials: true });
        console.log(data)
          setModalIsOpen(false);
          fetchEmployees();
      }catch(err){
        console.log(err)
      }
    };


    

    return (
        <div className='flex '>
            <Sidebar/>
           <EmployeeList/>
        </div>
    );
};

export default EmployeeListForHr;





