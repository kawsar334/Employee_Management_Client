

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Loader from '../../components/Loader';

const AdminEmployeeListComponent = () => {
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [newSalary, setNewSalary] = useState('');
    const [viewMode, setViewMode] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            setTimeout(async() => {
                setLoading(false)
                const response = await axios.get('https://server-wheat-xi.vercel.app/api/user/all-employee-list', { withCredentials: true });
                setEmployees(response.data.employees);
                console.log(response.data.employees[0])
            }, 1000);
        } catch (error) {
            console.log(error)
            toast.error("Error fetching employees");
        }
      };
    useEffect(() => {
        fetchEmployees();
    }, []);

    // fire or block user 
    const fireEmployee = async (id) => {
        try {
          const data =  await axios.put(`https://server-wheat-xi.vercel.app/api/user/fired/${id}`, {}, { withCredentials: true });
            setEmployees(employees.filter(emp => emp._id !== id));
            toast.success(data.data?.message);
            fetchEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Error firing employee");
        }
    };
    // unfire or unblock user 
    const unfireEmployee = async (item) => {
        try {
            if(window.confirm("Are you sure want to Unblock")){
                const data = await axios.put(`https://server-wheat-xi.vercel.app/api/user/unfired/${item._id}`, {}, { withCredentials: true });
                // setEmployees(employees.filter(emp => emp._id !== id));
                toast.success(data.data?.message);
                if(data){
                    window.location.reload()
                }
                fetchEmployees();
            }
        } catch (error) {
            console.error(error);
            toast.error("Error firing employee");
        }
    };

    // convert in hr
    const makeHR = async (id) => {
        setLoading(true)
        try {

           setTimeout(async() => {
            setLoading(false)
               const data = await axios.put(`https://server-wheat-xi.vercel.app/api/user/make-hr/${id}`, {}, { withCredentials: true });
               // setEmployees(employees.map(emp => emp._id === id ? { ...emp, isHR: true } : emp));
               toast.success(data?.data?.message)
               fetchEmployees();
           }, 600);

        } catch (error) {
            console.error(error);
            toast.error("Error promoting employee to HR");
        }
    };

    // update salary
    const handleUpdateSalary = async (item, e) => {
        e.preventDefault();
        if (Number(item.salary) > Number(newSalary)){
            toast.error("New salary should be greater than current salary");
            return;
        }
        if (Number(item.salary) === Number(newSalary)){
            toast.error("Salary should be different");
            return;
        }else{
            setLoading(true)
            try {
                setTimeout(async () => {
                    setLoading(false)
                    await axios.put(`https://server-wheat-xi.vercel.app/api/user/adjust-salary/${item?._id}`, { salary: newSalary }, { withCredentials: true });
                    setEmployees(employees.map(emp => emp._id === item._id ? { ...emp, salary: newSalary } : emp));
                    toast.success("Salary updated successfully");
                    setNewSalary("")
                }, 800);
            } catch (error) {
                console.error(error);
                toast.error("Error adjusting salary");
            }
        }
        
       
    };


    const toggleViewMode = () => {
       setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            setViewMode(viewMode === 'table' ? 'grid' : 'table');
        },600)
    };

    // if(loading){
    //     return(
    //         <div className='flex justify-center  items-center w-screen h-[500px]'>

    //             <Loader/>
    //         </div>
    //     )
    // }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="md:w-[1000px]  w-full px-0 md:px-4 py-6 overflow-x-scroll  md:overflow-x-auto     ">
            <div className="text-center mb-4 flex justify-center items-center gap-4">
                <h2 className="text-2xl font-semibold text-center mb-4">All Employees</h2>
                <button
                    className="bg-main text-white px-4 py-2 rounded-md  flex items-center gap-2"
                    onClick={toggleViewMode}
                >
                    {viewMode === 'table' ? (
                        <>
                            <i className="fas fa-th-large"></i>
                            Card View
                        </>
                    ) : (
                        <>
                            <i className="fas fa-table"></i>
                            Table View
                        </>
                    )}
                </button>
            </div>
            <div className=" w-screen md:w-full">
                {viewMode === 'table' ? <table className="table-auto w-full    border border-gray-200 shadow-sm text-center text-sm lg:text-base">
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
                        {employees.length > 0 ? currentEmployees.map((employee) => (
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
                                <td className="px-4 py-2 border flex flex-col justify-center items-center gap-1">
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
                                    {!employee.isFired ? (
                                        < >
                                            
                                        </>
                                    ) : (
                                            <button className="bg-[teal]  text-white text-[13px]  rounded px-2 cursor-pointer " onClick={() => unfireEmployee(employee)}>Unblock</button>
                                    )}
                                </td>
                                <td className="px-4 py-2 border  ">
                                    <form onSubmit={(e) => handleUpdateSalary(employee, e)} className='flex justify-center items-center gap-2 flex-wrap '>
                                        <input
                                            type="number"
                                            placeholder={employee.salary}
                                            onChange={(e) => setNewSalary(e.target.value)}
                                            className="w-[130px] border rounded-md px-2 py-1 text-center"
                                            required
                                        />
                                        <button type='submit' className='border bg-teal p-1 rounded'>Update</button>
                                   </form>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-gray-500">No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table> :<>
                
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {employees.length > 0 ? (
                                currentEmployees.map(employee => (
                                    <div key={employee._id} className="border p-4 rounded-lg shadow hover:shadow-lg">
                                        <h3 className="text-lg font-semibold">{employee.name}</h3>
                                        <p className="text-gray-600">Designation: {employee.designation || "Not Found"}</p>
                                        <form onSubmit={(e) => handleUpdateSalary(employee, e)} className="flex justify- items-start gap-2 f flex-wrap">
                                            <input
                                                type="number"
                                                placeholder={employee.salary >0 ? employee.salary :"Not Added Salary"}
                                                onChange={(e) => setNewSalary(e.target.value)}
                                                className="w-[60%] border rounded-md py-1 px-2"
                                                required
                                            />
                                            <button type="submit" className="border p-1 rounded text-[13px] w-max bg-[teal] text-white">Update </button>
                                        </form>
                                        <div className="mt-4 flex gap-2 ">
                                            {/* {!employee.isFired&&<div>Unblock</div> } */}
                                            {!employee.isFired ? (
                                                <>
                                                    <button
                                                        className="bg-blue-500 w-max text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                        onClick={() => makeHR(employee._id)}
                                                    >
                                                        {employee.role === "hr" ? "Hr" : "Make HR"}
                                                    </button>
                                                  
                                                    <button
                                                        className="bg-red-500 w-max text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setSelectedEmployee(employee);
                                                        }}
                                                    >
                                                        Fire
                                                    </button>

                                                    
                                                </>
                                            ) : (
                                                    <button disabled className="text-gray-500 cursor-not-allowed">Fired </button>
                                            )}

                                            {!employee.isFired ? (
                                                < >

                                                </>
                                            ) : (
                                                <button className="bg-teal py-1 w-max  text-white text-[13px]  rounded px-2 cursor-pointer " onClick={() => unfireEmployee(employee)}>Unblock</button>
                                            )}
                                            
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No employees found.</p>
                            )}
                        </div>

                </>}
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

            {/*  */}
            <div className="flex justify-center items-center mt-4 gap-2">
    
                <button
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800'
                        }`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: Math.ceil(employees.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 border rounded-md ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => currentPage < Math.ceil(employees.length / itemsPerPage) && paginate(currentPage + 1)}
                    className={`px-3 py-1 border rounded-md ${currentPage === Math.ceil(employees.length / itemsPerPage)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>


            {/*  */}

        </div>
    );
};

export default AdminEmployeeListComponent;




