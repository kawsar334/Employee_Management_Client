

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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Modal from 'react-modal';

// const AdminEmployeeList = () => {
//     const [employees, setEmployees] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [newSalary, setNewSalary] = useState('');
//     const [viewMode, setViewMode] = useState('table');

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get('https://employee-one-coral.vercel.app/api/user/all-employee-list', { withCredentials: true });
//             setEmployees(response.data.employees);
//         } catch (error) {
//             console.error(error);
//             toast.error("Error fetching employees");
//         }
//     };

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const toggleViewMode = () => {
//         setViewMode(viewMode === 'table' ? 'grid' : 'table');
//     };

//       return (
//         <div className="w-full px-4 py-6">

//             <div className="text-center mb-4 flex justify-center items-center gap-4">
//             <h2 className="text-2xl font-semibold text-center mb-4">All Employees</h2>
             
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
//                     onClick={toggleViewMode}
//                 >
//                     {viewMode === 'table' ? (
//                         <>
//                             <i className="fas fa-th-large"></i> 
//                             Card View
//                         </>
//                     ) : (
//                         <>
//                             <i className="fas fa-table"></i> 
//                             Table View
//                         </>
//                     )}
//                 </button>

//             </div>

//             {viewMode === 'table' ? (
//                 <div className="overflow-x-auto">
//                     <table className="table-auto w-full border border-gray-200 shadow-sm text-center text-sm lg:text-base">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="px-4 py-2 border">Name</th>
//                                 <th className="px-4 py-2 border">Designation</th>
//                                 <th className="px-4 py-2 border">Make HR</th>
//                                 <th className="px-4 py-2 border">Fire</th>
//                                 <th className="px-4 py-2 border">Salary</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {employees.length > 0 ? employees.map((employee) => (
//                                 <tr key={employee._id} className="hover:bg-gray-50">
//                                     <td className="px-4 py-2 border">{employee?.name}</td>
//                                     <td className="px-4 py-2 border">{employee.designation || "Not Found"}</td>
//                                     <td className="px-4 py-2 border">
//                                         {!employee.isFired ? (
//                                             <button
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//                                                 onClick={() => makeHR(employee._id)}
//                                             >
//                                                 {employee.role === "hr" ? "Hr" : "Make HR"}
//                                             </button>
//                                         ) : <div disabled className='cursor-not-allowed text-[lightgray]'>Not Allowed</div>}
//                                     </td>
//                                     <td className="px-4 py-2 border">
//                                         {!employee.isFired ? (
//                                             <button
//                                                 className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                                                 onClick={() => { setShowModal(true); setSelectedEmployee(employee); }}
//                                             >
//                                                 Fire
//                                             </button>
//                                         ) : (
//                                             <button disabled className="text-gray-500 cursor-not-allowed">Fired</button>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-2 border">
//                                         <form onSubmit={(e) => handleUpdateSalary(employee._id, e)} className='flex justify-center items-center gap-2 flex-wrap'>
//                                             <input
//                                                 type="number"
//                                                 placeholder={employee.salary}
//                                                 onChange={(e) => setNewSalary(e.target.value)}
//                                                 className="w-[130px] border rounded-md px-2 py-1 text-center"
//                                                 required
//                                             />
//                                             <button type='submit' className='border p-1 rounded'>Update Salary</button>
//                                         </form>
//                                     </td>
//                                 </tr>
//                             )) : (
//                                 <tr>
//                                     <td colSpan="5" className="px-4 py-2 text-gray-500">No employees found.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {employees.length > 0 ? employees.map((employee) => (
//                         <div key={employee._id} className="border p-4 rounded-lg shadow hover:shadow-lg">
//                             <h3 className="text-lg font-semibold">{employee.name}</h3>
//                             <p className="text-gray-600">Designation: {employee.designation || "Not Found"}</p>
//                             {/* <p className="text-gray-600">Salary: {employee.salary}</p> */}
//                             <form onSubmit={(e) => handleUpdateSalary(employee._id, e)} className='flex justify-between items-center gap-2 flex-wrap'>
//                                 <input
//                                     type="number"
//                                     placeholder={employee.salary}
//                                     onChange={(e) => setNewSalary(e.target.value)}
//                                     className="w-[100px] border rounded-md  py-1 text-center"
//                                     required
//                                 />
//                                 <button type='submit' className='border p-1 rounded text-[13px] bg-[teal] text-white'>Update Salary</button>
//                             </form>
//                             <div className="mt-4 flex gap-2">
//                                 {!employee.isFired ? (
//                                     <>
//                                         <button
//                                             className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//                                             onClick={() => makeHR(employee._id)}
//                                         >
//                                             {employee.role === "hr" ? "Hr" : "Make HR"}
//                                         </button>
//                                         <button
//                                             className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                                             onClick={() => { setShowModal(true); setSelectedEmployee(employee); }}
//                                         >
//                                             Fire
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <button disabled className="text-gray-500 cursor-not-allowed">Fired</button>
//                                 )}
//                             </div>
//                         </div>
//                     )) : (
//                         <p className="text-gray-500">No employees found.</p>
//                     )}
//                 </div>
//             )}

//             {/* Modal for confirmation */}
//             <Modal
//                 isOpen={showModal}
//                 onRequestClose={() => setShowModal(false)}
//                 contentLabel="Confirm Fire"
//                 className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20"
//                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
//             >
//                 <h3 className="text-lg font-semibold mb-4">Are you sure you want to fire {selectedEmployee?.name}?</h3>
//                 <div className="flex justify-end gap-4">
//                     <button
//                         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                         onClick={() => { fireEmployee(selectedEmployee._id); setShowModal(false); }}
//                     >
//                         Yes
//                     </button>
//                     <button
//                         className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//                         onClick={() => setShowModal(false)}
//                     >
//                         No
//                     </button>
//                 </div>
//             </Modal>

//             <ToastContainer />
//         </div>
//     );
// };

// export default AdminEmployeeList;
