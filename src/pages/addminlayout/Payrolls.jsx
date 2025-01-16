import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';

function Payroll() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false)
    // Fetch employee payment requests
    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            axios.get('http://localhost:7000/api/payment/payment-history', {
                withCredentials: true
            })
                .then(response => {
                    console.log(response?.data)
                    setEmployees(response?.data?.payment);
                })
                .catch(error => console.log(error));
        }, 800);
    }, []);

    // Handle Payment Execution
    const handlePayment = async (employeeId, amount, month, year) => {
        try {
            const response = await axios.put(`http://localhost:7000/api/payment/updatestatusOfPayment/${employeeId}`, {
                employeeId,
                amount,
                month,
                year,
            }, {
                withCredentials: true
            });

            // Update the employee payment status
            const updatedEmployees = employees.map(employee => {
                if (employee._id === employeeId) {
                    return { ...employee, paymentDate: response.data.paymentDate, status: "Paid" };
                }
                return employee;
            });
            toast.success(response.data.message)
            setEmployees(updatedEmployees); 
        } catch (error) {
            console.log("Payment error:", error);
        }
    };

    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <Loader />
            </div>
        )
    }

    return (
    <div className='flex justify-start items-start'>

        <Sidebar/>

            <div className='overflow-auto h-max'>
                <h1 className='text-center py-5 text-2xl font-semibold'>Payroll Management</h1>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Employee Name</th>
                            <th className="px-4 py-2 border">Salary</th>
                            <th className="px-4 py-2 border">Month/Year</th>
                            <th className="px-4 py-2 border">Payment Date</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map((employee) => (
                            <tr key={employee._id}>
                                <td className="px-4 py-2 border">{employee.name || "Not found"}</td>
                                <td className="px-4 py-2 border">{employee.amount}</td>
                                <td className="px-4 py-2 border">{employee.month}/{employee.year}</td>
                                <td className="px-4 py-2 border">
                                    {employee.status === "Pending" ? employee.status : <span className='text-[teal]'> ✅ {employee.createdAt} </span>}
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handlePayment(employee._id, employee.salary, employee.month, employee.year)}
                                        disabled={employee.status === "Paid"}
                                        className={`px-4 py-2 ${employee.status === "Paid" ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white`}
                                    >
                                        {employee.status === "Paid" ? "Paid" : "Pay"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
    );
}

export default Payroll;
