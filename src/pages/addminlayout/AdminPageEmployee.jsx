

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const AdminEmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [newSalary, setNewSalary] = useState('');

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/user/all-employee-list', { withCredentials: true });
            setEmployees(response.data.employees);
        } catch (error) {
            console.error(error);
            toast.error("Error fetching employees");
        }
      };
    useEffect(() => {

        fetchEmployees();
    }, []);

    // fire or block user 
    const fireEmployee = async (id) => {
        try {
          const data =  await axios.put(`http://localhost:7000/api/user/fired/${id}`, {}, { withCredentials: true });
            setEmployees(employees.filter(emp => emp._id !== id));
            toast.success(data.data?.message);
            fetchEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Error firing employee");
        }
    };

    // convert in hr
    const makeHR = async (id) => {
        try {
         const data =   await axios.put(`http://localhost:7000/api/user/make-hr/${id}`, {}, { withCredentials: true });
            // setEmployees(employees.map(emp => emp._id === id ? { ...emp, isHR: true } : emp));
            toast.success(data?.data?.message)
            fetchEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Error promoting employee to HR");
        }
    };

    // update salary
    const handleUpdateSalary = async (id, e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7000/api/user/adjust-salary/${id}`, { salary: newSalary }, { withCredentials: true });
            setEmployees(employees.map(emp => emp._id === id ? { ...emp, salary: newSalary } : emp));
            toast.success("Salary updated successfully");
            setNewSalary("")
        } catch (error) {
            console.error(error);
            toast.error("Error adjusting salary");
        }
    };

    return (
        <div className="w-full px-4 py-6">
            <h2 className="text-2xl font-semibold text-center mb-4">All Employees</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-200 shadow-sm text-center text-sm lg:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Designation</th>
                            <th className="px-4 py-2 border">Make HR</th>
                            <th className="px-4 py-2 border">Fire</th>
                            <th className="px-4 py-2 border">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? employees.map((employee) => (
                            <tr key={employee._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{employee?.name}</td>
                                <td className="px-4 py-2 border">{employee.designation || "Not Found"}</td>
                                <td className="px-4 py-2 border">
                                    {!employee.isFired ? (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => makeHR(employee._id)}
                                        >
                                            {employee.role === "hr" ? "Hr" :"Make HR"}
                                        </button>
                                    ):<div disabled className='cursor-not-allowed text-[lightgray]'>Not Allowed</div>}
                                </td>
                                <td className="px-4 py-2 border">
                                    {!employee.isFired ? (
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => { setShowModal(true); setSelectedEmployee(employee); }}
                                        >
                                            Fire
                                        </button>
                                    ) : (
                                        <button disabled className="text-gray-500 cursor-not-allowed">Fired</button>
                                    )}
                                </td>
                                <td className="px-4 py-2 border  ">
                                    <form onSubmit={(e) => handleUpdateSalary(employee._id, e)} className='flex justify-center items-center gap-2 flex-wrap '>
                                        <input
                                            type="number"
                                            placeholder={employee.salary}
                                            onChange={(e) => setNewSalary(e.target.value)}
                                            className="w-[130px] border rounded-md px-2 py-1 text-center"
                                            required
                                        />
                                        <button type='submit' className='border p-1 rounded'>Update salaray</button>
                                   </form>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-gray-500">No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for confirmation */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Confirm Fire"
                className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to fire {selectedEmployee?.name}?</h3>
                <div className="flex justify-end gap-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => { fireEmployee(selectedEmployee._id); setShowModal(false); }}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={() => setShowModal(false)}
                    >
                        No
                    </button>
                </div>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default AdminEmployeeList;
