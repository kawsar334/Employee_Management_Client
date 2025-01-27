

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useLocation } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState(null);
    const [salaryData, setSalaryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const slug = useLocation().pathname.split("/")[2];

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`https://server-wheat-xi.vercel.app/api/payment/getEmployeeDetails/${slug}`, {
                    withCredentials: true
                });
                
                setEmployee(response?.data?.employee);
                setSalaryData(response?.data?.pay);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee details:', error);
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [slug]);

    const chartData = {
        labels: salaryData?.map(item => `${item.month} ${item.year}`),
        datasets: [
            {
                label: 'Salary',
                data: salaryData.map(item => item.amount ),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2,
                borderRadius: 10,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.7)',
                hoverBorderColor: 'rgba(255, 159, 64, 1)',
                hoverBorderWidth: 3,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }
        ]
    };

    return loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555' }}>
            Loading...
        </div>
    ) : (
        <div style={{ minWidth: '100%', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Employee Details</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '20px' }}>
                <img
                    src={employee?.photoURL}
                    alt="Employee"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ddd' }}
                />
                <div>
                    <h3 style={{ color: '#555', margin: '0 0 10px' }}>{employee?.name}</h3>
                    <p style={{ margin: 0, color: '#777' }}>Designation: {employee?.designation || "Not Found"}</p>
                </div>
            </div>

            <div>
                <h4 style={{ color: '#444', marginBottom: '20px', textAlign: 'center' }}>Salary History</h4>
                <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <Bar data={chartData} options={{
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color: '#333',
                                    font: { size: 14 }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: '#555'
                                }
                            },
                            y: {
                                grid: {
                                    color: '#eee'
                                },
                                ticks: {
                                    color: '#555'
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }} />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
