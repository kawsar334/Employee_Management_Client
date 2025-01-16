


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

    useEffect(() => {
        axios
            .get('http://localhost:7000/api/work/workList', { withCredentials: 'include' })
            .then((res) => setTasks(res.data?.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        setTimeout(()=>{
            setLoading(false)
            axios
                .post('http://localhost:7000/api/work/creatework', form, { withCredentials: 'include' })
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
              .put(`http://localhost:7000/api/work/${modalData._id}`, modalData, { withCredentials: 'include' })
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
                .delete(`http://localhost:7000/api/work/${id}`, { withCredentials: 'include' })
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
       <div className='flex justify-start'>
            <Sidebar/>
            <div className=" sm:p-10 bg-gray-100  min-h-screen">
                <h1 className="text-2xl font-semibold text-gray-700 mb-6">Work Sheet</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center"
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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add / Submit
                    </button>
                </form>

                {tasks.length === 0 ? (<div className='w-full h-[400px] justify-center items-center flex  text-3xl '>

                    <h1>No work added yet</h1>
                </div>) : <table className="w-full mt-6 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-3">Task</th>
                            <th className="p-3">Hours Worked</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Edit</th>
                            <th className="p-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task) => (
                                <tr key={task?._id} className="border-t">
                                    <td className="p-3">{task?.task}</td>
                                    <td className="p-3">{task?.hoursWorked}</td>
                                    <td className="p-3">{new Date(task.date).toLocaleDateString()}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="p-3 text-center">
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
