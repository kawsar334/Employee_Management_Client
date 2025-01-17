

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/sidebar/Sidebar';

// const PaymentHistory = () => {
//     const [payments, setPayments] = useState([
       
//     ]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);

//     const fetchPayments = async (page = 1) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`https://employee-one-coral.vercel.app/api/payment/getPaymentHistory?page=${page}&limit=5`,{
//                 withCredentials:true
//             });
//             const { data, currentPage, totalPages } = response.data;
//             // setPayments(page === 1 ? data : [...payments, ...data]); // Append data for infinite scrolling
//             setPayments(response?.data.payments)
//             setCurrentPage(currentPage);
//             setTotalPages(totalPages);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching payment history:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPayments(1); 
//     }, []);

//     // Infinite scroll handler
//     const handleScroll = () => {
//         if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading) {
//             if (currentPage < totalPages) {
//                 fetchPayments(currentPage + 1); 
//             }
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll); 
//     }, [currentPage, loading]);

//     return (
//        <div className='flex justify-start items-start '>
//         <Sidebar/>
//             <div className="w-full my-3">
//                 {payments.length !== 0 && <h2 className="text-xl font-bold mb-4 text-center w-full m-auto   ">Payment History</h2>}
//                 {payments.length === 0 ? <div className='w-full h-screen text-3xl capitalize flex justify-center items-center '>empty data </div> : <table className="min-w-full table-auto border-collapse border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="border border-gray-300 px-4 py-2">Month</th>
//                             <th className="border border-gray-300 px-4 py-2">Year</th>
//                             <th className="border border-gray-300 px-4 py-2">Amount</th>
//                             <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((payment, index) => (
//                             <tr key={index}>
//                                 <td className="border border-gray-300 px-4 py-2">{payment.month}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{payment.year}</td>
//                                 <td className="border border-gray-300 px-4 py-2">${payment.amount}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>}
//                 {loading && <p>Loading...</p>}
//                 {!loading && currentPage >= totalPages && <p>No more records to load.</p>}
//             </div>
//        </div>
//     );
// };

// export default PaymentHistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import InfiniteScroll from 'react-infinite-scroll-component';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const [hasMore, setHasMore] = useState(true);
    const fetchPayments = async (page = 1) => {
        try {
            const response = await axios.get(
                `https://employee-one-coral.vercel.app/api/payment/getPaymentHistory?page=${page}&limit=5`,
                { withCredentials: true }
            );
            const { payments: fetchedPayments, currentPage, totalPages } = response.data;
            setPayments((prevPayments) => [...prevPayments, ...fetchedPayments]);
            setCurrentPage(currentPage);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching payment history:', error);
        }
    };

    useEffect(() => {
        fetchPayments(1); // Fetch the first page on mount
    }, []);

    const loadMorePayments = () => {
        if (currentPage < totalPages) {
            fetchPayments(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-start items-start">
            <Sidebar />
            <div className="w-full my-3">
                {payments.length !== 0 && (
                    <h2 className="text-xl font-bold mb-4 text-center w-full m-auto">Payment History</h2>
                )}
                {payments.length === 0 ? (
                    <div className="w-full h-screen text-3xl capitalize flex justify-center items-center">
                        empty data
                    </div>
                ) : (
                    <InfiniteScroll
                        dataLength={payments.length} 
                        next={loadMorePayments} 
                        hasMore={currentPage < totalPages} 
                        loader={<p className="text-center mt-4">Loading...</p>}
                        endMessage={<p className="text-center mt-4">No more records to load for  scorll.</p>}
                    >
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Month</th>
                                    <th className="border border-gray-300 px-4 py-2">Year</th>
                                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                                    <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{payment.month}</td>
                                        <td className="border border-gray-300 px-4 py-2">{payment.year}</td>
                                        <td className="border border-gray-300 px-4 py-2">${payment.amount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
