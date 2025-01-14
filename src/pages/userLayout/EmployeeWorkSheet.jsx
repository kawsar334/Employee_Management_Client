import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkSheet = () => {
    const [tasks, setTasks] = useState([
        { id: 1, task: 'Sales', hours: 5, date: new Date() },
        { id: 2, task: 'Support', hours: 3, date: new Date() },
    ]);
    const [newTask, setNewTask] = useState({ task: 'Sales', hours: '', date: new Date() });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    // Handle date change
    const handleDateChange = (date) => {
        setNewTask({ ...newTask, date });
    };

    // Add/Submit Task
    const handleAddTask = () => {
        const taskToAdd = { ...newTask, id: Date.now() }; // Add unique ID
        setTasks([taskToAdd, ...tasks]); // Optimistic UI update

        console.log('Task added:', taskToAdd);
    };

    // Delete Task
    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        // Remove from database (API call)
        console.log('Task deleted:', id);
    };

    // Edit Task
    const handleEdit = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        // Logic to open form pre-filled with the task to edit
        console.log('Task to edit:', taskToEdit);
    };

    return (
        <div className="worksheet p-6">
            <h1 className="text-2xl font-bold mb-4">employee dashboard Work Sheet</h1>
            {/* Form */}
            <div className="form flex gap-4 items-center mb-6">
                <select
                    name="task"
                    value={newTask.task}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                >
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Content">Content</option>
                    <option value="Paper-work">Paper-work</option>
                </select>
                <input
                    type="number"
                    name="hours"
                    value={newTask.hours}
                    onChange={handleInputChange}
                    placeholder="Hours Worked"
                    className="border p-2 rounded w-20"
                />
                <DatePicker
                    selected={newTask.date}
                    onChange={handleDateChange}
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add / Submit
                </button>
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Task</th>
                        <th className="border p-2">Hours Worked</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} className="text-center">
                            <td className="border p-2">{task.task}</td>
                            <td className="border p-2">{task.hours}</td>
                            <td className="border p-2">{task.date.toLocaleDateString()}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleEdit(task.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkSheet;
