


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';

const EmployeeWorkSheet = () => {
    const [loading, setLoading] = useState(false)
    const [modalData, setModalData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        task: 'Sales',
        hoursWorked: '',
        date: new Date(),
    });

    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        axios
            .get('https://server-wheat-xi.vercel.app/api/work/workList', { withCredentials: 'include' })
            .then((res) => setTasks(res.data?.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        setTimeout(()=>{
            setLoading(false)
            axios
                .post('https://server-wheat-xi.vercel.app/api/work/creatework', form, { withCredentials: 'include' })
                .then((res) => {
                    setTasks([res?.data?.data, ...tasks]);
                    if(res){
                        toast.success("Task added successfully")
                    }
                })
                .catch((err) => console.error(err));
        },1000)
    };

    const handleEdit = (task) => {
        setModalData(task);
    };

    const handleUpdate = () => {
        setLoading(true)
    
      setTimeout(() => {
         setLoading(false)
          axios
              .put(`https://server-wheat-xi.vercel.app/api/work/${modalData._id}`, modalData, { withCredentials: 'include' })
              .then((res) => {
                  setTasks(tasks.map((task) => (task._id === res?.data?.data._id ? res?.data?.data : task)));
                  setModalData(null);
                  if (res) {
                      toast.success("Task updated successfully")
                  }
              })
              .catch((err) => console.error(err));
      }, 600);
    };

    const handleDelete = (id) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            axios
                .delete(`https://server-wheat-xi.vercel.app/api/work/${id}`, { withCredentials: 'include' })
                .then((res) => {
                    setTasks(tasks.filter((task) => task._id !== id))
                    if (res) {
                        toast.success("Task deleted successfully")
                    }
                })
                .catch((err) => console.error(err));
        }, 600);
    };

    if(loading){
        return <div className='w-full flex justify-center items-center h-[500px]'><Loader/></div>
    }

    return (
       <div className='flex justify-start items-start h-[600px]  overflow-x-auto   '>
            <Sidebar/>
            <div className=" px-4 bg-gray-100 p-3 ">
                <h1 className="text-2xl font-semibold text-gray-700 mb-1">Work Sheet</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-2 rounded-lg shadow-md flex flex-wrap gap-4 items-center"
                >
                    <select
                        value={form.task}
                        onChange={(e) => setForm({ ...form, task: e.target.value })}
                        className="w-full sm:w-auto p-2 border rounded-md"
                    >
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Content">Content</option>
                        <option value="Paper-work">Paper-work</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Hours Worked"
                        value={form.hoursWorked}
                        onChange={(e) => setForm({ ...form, hoursWorked: e.target.value })}
                        className="w-full sm:w-auto p-2 border rounded-md"
                    />
                    <DatePicker
                        selected={form.date}
                        onChange={(date) => setForm({ ...form, date })}
                        className="w-full sm:w-auto p-2 border rounded-md"
                    />
                    <button type="submit" className="bg-text text-white px-4 py-1 rounded-md">
                        Add / Submit
                    </button>
                </form>

                {tasks.length === 0 ? (<div className='w-full h-[400px] justify-center items-center flex  text-3xl '>

                    <h1>No work added yet</h1>
                </div>) : <table className="w-full  md:mt-1 bg-white shadow-md rounded-lg ">
                    <thead className="bg-main text-white text-start">
                        <tr>
                            <th className="p-2 text-start">Task</th>
                            <th className="p-2 text-start">Hours Worked</th>
                            <th className="p-2 text-start">Date</th>
                            <th className="p-2 text-start">Edit</th>
                            <th className="p-2 text-start">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                currentTasks.map((task) => (
                                <tr key={task?._id} className="border-t">
                                    <td className="p-2">{task?.task}</td>
                                    <td className="p-2">{task?.hoursWorked}</td>
                                    <td className="p-2">{new Date(task.date).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="text-white bg-teal p-1 rounded hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>}

                <div className="flex justify-center items-center mt-4 gap-2">
                    <button
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-800'
                            }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: Math.ceil(tasks.length / itemsPerPage) }, (_, index) => (
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
                        onClick={() => currentPage < Math.ceil(tasks.length / itemsPerPage) && paginate(currentPage + 1)}
                        className={`px-3 py-1 border rounded-md ${currentPage === Math.ceil(tasks.length / itemsPerPage)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                        disabled={currentPage === Math.ceil(tasks.length / itemsPerPage)}
                    >
                        Next
                    </button>
                </div>
                {/*  */}

                {modalData && (
                    <Modal
                        isOpen
                        onRequestClose={() => setModalData(null)}
                        className="bg-white border p-6 rounded-lg shadow max-w-lg mx-auto mt-[100px]"
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <form>
                            <select
                                value={modalData.task}
                                onChange={(e) => setModalData({ ...modalData, task: e.target.value })}
                                className="w-full p-2 border rounded-md mb-4"
                            >
                                <option value="Sales">Sales</option>
                                <option value="Support">Support</option>
                                <option value="Content">Content</option>
                                <option value="Paper-work">Paper-work</option>
                            </select>
                            <input
                                type="number"
                                value={modalData.hoursWorked}
                                onChange={(e) => setModalData({ ...modalData, hoursWorked: e.target.value })}
                                className="w-full p-2 border rounded-md mb-4"
                            />
                            <DatePicker
                                selected={new Date(modalData.date)}
                                onChange={(date) => setModalData({ ...modalData, date })}
                                className="w-full p-2 border rounded-md mb-4"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalData(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </Modal>
                )}
            </div>
       </div>
    );
};

export default EmployeeWorkSheet;
