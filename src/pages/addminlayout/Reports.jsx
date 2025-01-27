import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Sidebar from "../../components/sidebar/Sidebar";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
            setTimeout(async() => {
                setLoading(false)
                const response = await axios.get("https://server-wheat-xi.vercel.app/api/message/messages", { withCredentials: true });
                setReports(response.data);
                setLoading(false);
                console.log(response.data)
            }, 800);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader/>
        </div>;
    }

    return (
      

        <div className="flex justify-start items-start ">
            <Sidebar/>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center text-main mb-8">User Reports</h1>
                    {reports.length === 0 ? (
                        <p className="text-center text-gray-600">No reports found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map((report) => (
                                <div
                                    key={report._id}
                                    className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {report.email || "Report"}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {report.message}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Submitted by: <span className="font-medium">{report.email || "Report"}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Date: <span className="font-medium">{report.createdAt}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
