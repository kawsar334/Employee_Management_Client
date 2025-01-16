import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import  { useState } from "react";
const Analytics = () => {
    const workflowRecords = [
        { id: 1, name: "John Doe", month: "January", tasks: 20 },
        { id: 2, name: "Jane Smith", month: "February", tasks: 15 },
        { id: 3, name: "John Doe", month: "March", tasks: 25 },
        { id: 4, name: "Jane Smith", month: "January", tasks: 10 },
        { id: 5, name: "Mark Lee", month: "February", tasks: 30 },
    ];

    const [filteredRecords, setFilteredRecords] = useState(workflowRecords);
    const [filters, setFilters] = useState({ name: "", month: "" });

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

        const filtered = workflowRecords.filter((record) => {
            const matchesName = name === "name" && value
                ? record.name.toLowerCase().includes(value.toLowerCase())
                : record.name.toLowerCase().includes(filters.name.toLowerCase());

            const matchesMonth = name === "month" && value
                ? record.month.toLowerCase().includes(value.toLowerCase())
                : record.month.toLowerCase().includes(filters.month.toLowerCase());

            return matchesName && matchesMonth;
        });

        setFilteredRecords(filtered);
    };


    return (
        <div className='flex'>
            <Sidebar />
            <>
                <div className="p-6 bg-gray-100 min-h-screen">
                    <h2 className="text-2xl font-bold mb-4">Employee Workflow Records</h2>

                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                        {/* Filter by Name */}
                        <input
                            type="text"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            placeholder="Filter by Employee Name"
                            className="px-4 py-2 border rounded-md focus:outline-blue-500"
                        />

                        {/* Filter by Month */}
                        <select
                            name="month"
                            value={filters.month}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded-md focus:outline-blue-500"
                        >
                            <option value="">Filter by Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                        </select>
                    </div>

                    {/* Records Table */}
                    <table className="w-full bg-white shadow rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Employee Name</th>
                                <th className="px-4 py-2">Month</th>
                                <th className="px-4 py-2">Tasks Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record) => (
                                    <tr key={record.id} className="border-b">
                                        <td className="px-4 py-2">{record.id}</td>
                                        <td className="px-4 py-2">{record.name}</td>
                                        <td className="px-4 py-2">{record.month}</td>
                                        <td className="px-4 py-2">{record.tasks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </>
        </div>
    )
}

export default Analytics