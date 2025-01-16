import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payroll() {
    const [employees, setEmployees] = useState([
        {
            name:"kawsar",
            id: 1,
            salary: 50000,
            paymentDate: null,
            isPaid: false,
        },
        {
            name: "kawsar",
            id: 1,
            salary: 50000,
            paymentDate: null,
            isPaid: true,
        }
    ]);

    // Fetch employee payment requests
    useEffect(() => {
        axios.get('http://localhost:7000/api/payment/payment-history',{
            withCredentials:true
        })
            .then(response => console.log(response?.data))
            .catch(error => console.log(error));
    }, []);

    // Handle Payment Execution
    const handlePayment = async (employeeId, amount, month, year) => {
        try {
            // Send payment request to backend
            const response = await axios.post('/api/payroll/pay-employee', {
                employeeId,
                amount,
                month,
                year,
            });

            // Update the employee payment status
            const updatedEmployees = employees.map(employee => {
                if (employee._id === employeeId) {
                    return { ...employee, paymentDate: response.data.paymentDate, isPaid: true };
                }
                return employee;
            });

            setEmployees(updatedEmployees);  // Update UI
        } catch (error) {
            console.log("Payment error:", error);
        }
    };

    return (
        <div>
            <h1>Payroll Management</h1>
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
                            <td className="px-4 py-2 border">{employee.name}</td>
                            <td className="px-4 py-2 border">{employee.salary}</td>
                            <td className="px-4 py-2 border">{employee.month}/{employee.year}</td>
                            <td className="px-4 py-2 border">
                                {employee.paymentDate ? employee.paymentDate : "Not Paid"}
                            </td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => handlePayment(employee._id, employee.salary, employee.month, employee.year)}
                                    disabled={employee.isPaid}
                                    className={`px-4 py-2 ${employee.isPaid ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white`}
                                >
                                    {employee.isPaid ? "Paid" : "Pay"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Payroll;
