

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [workRecords, setWorkRecords] = useState([]);
    const [originalWorkRecords, setOriginalWorkRecords] = useState([]); 
    const [months, setMonths] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); 
    const [recordsPerPage] = useState(5); 

    useEffect(() => {
        axios.get('https://server-wheat-xi.vercel.app/api/work/work-records')
            .then((response) => {
                const works = response.data?.works || [];
                const users = response.data?.users || [];

                const uniqueMonths = Array.from(
                    new Set(
                        works.map(work => JSON.stringify({ month: work.month, employeeId: work.employeeId }))
                    )
                ).map(item => JSON.parse(item));

                setMonths(uniqueMonths);
                setEmployees(users);
                setWorkRecords(works);
                setOriginalWorkRecords(works);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleFilter = () => {
        const filteredWorks = originalWorkRecords.filter((item) => {
            const employeeMatch = selectedEmployee ? item.employeeId === selectedEmployee._id : true;
            const monthMatch = selectedMonth ? item.month === selectedMonth.month : true;
            return employeeMatch && monthMatch;
        });
        setWorkRecords(filteredWorks);
        setCurrentPage(1); 
    };

    const resetFilters = () => {
        setWorkRecords(originalWorkRecords);
        setSelectedEmployee(null);
        setSelectedMonth(null);
        setCurrentPage(1); 
    };

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = workRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(workRecords.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="w-full mx-auto p-4">
            <div className="mb-4 flex gap-1 md:gap-4 flex-col md:flex-row flex-wrap ">
                <select
                    value={selectedEmployee?._id || ''}
                    onChange={(e) =>
                        setSelectedEmployee(employees.find(emp => emp._id === e.target.value))
                    }
                    className="p-2 border rounded"
                >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedMonth?.month || ''}
                    onChange={(e) =>
                        setSelectedMonth(months.find(month => month.month === e.target.value))
                    }
                    className="p-2 border rounded"
                >
                    <option value="">Select Month</option>
                    {months.map((month, i) => (
                        <option key={month.month} value={month.month} className="text-text capitalize ">
                            {["january", "february", "march", "april", "may", "jun", "july", "august", "september", "october", "november", "december"][i]}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleFilter}
                    className="p-2 bg-main text-white rounded"
                >
                    Apply Filters
                </button>

                <button
                    onClick={resetFilters}
                    className="p-2 bg-text text-white rounded"
                >
                    Reset Filters
                </button>
            </div>

         <div className='overflow-x-auto w-[98%]  p-3 mx-auto '>
                <table className="w-full table-auto border-collapse ">
                    <thead>
                        <tr>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Task Description</th>
                            <th className="border p-2">Hours Worked</th>
                        </tr>
                    </thead>
                    {workRecords.length === 0 ? (
                        <div className="flex justify-center items-center w-full my-10">Empty WorkList</div>
                    ) : (
                        <tbody>
                            {currentRecords.map((record) => (
                                <tr key={record._id}>
                                    <td className="border p-2">
                                        {new Date(record.date).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2">{record.task.slice(0,15)}</td>
                                    <td className="border p-2">{record.hoursWorked}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
         </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`p-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-text text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProgressComponent;
