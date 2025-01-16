import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Using Chart.js for the bar chart
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useLocation } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const EmployeeDetails = ({  }) => {
    const [employee, setEmployee] = useState(null);
    const [salaryData, setSalaryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const slug = useLocation().pathname.split("/")[2]

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/user/details/${slug}`);
                console.log(response?.data?.employee)
                // const { employee, salaryData } = response.data;
                setEmployee(response?.data?.employee);
                // setSalaryData(salaryData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee details:', error);
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [slug]);

    // Prepare data for the bar chart
    const chartData = {
        labels: salaryData.map(item => `${item.month} ${item.year}`), // Example: "Jan 2022"
        datasets: [
            {
                label: 'Salary',
                data: salaryData.map(item => item.salary),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Render employee details page
    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <h2>Employee Details</h2>
            <div>
                <img src={employee?.photoURL} alt="Employee" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                <h3>{employee?.name}</h3>
                <p>Designation: {employee?.designation || "Not Found"}</p>
            </div>

            <div>
                <h4>Salary History</h4>
                <Bar data={chartData} />
            </div>
        </div>
    );
};

export default EmployeeDetails;
