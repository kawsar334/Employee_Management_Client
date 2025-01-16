

import React, { useState, useEffect } from 'react';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([
        {
        month: 'January',
        year: 2022,
        amount: 100.00,
        transactionId: 'TR-1234567890',
    },]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPayments = async (currentPage) => {
        try {
            const response = await fetch(`/api/payment-history?page=${currentPage}&limit=5`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
                },
            });
            const data = await response.json();
            setPayments((prev) => (currentPage === 1 ? data.payments : [...prev, ...data.payments]));
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching payment history:', error);
        }
    };

    useEffect(() => {
        fetchPayments(page);
    }, [page]);

    const loadMore = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 text-left border-b">Month, Year</th>
                            <th className="px-4 py-2 text-left border-b">Amount</th>
                            <th className="px-4 py-2 text-left border-b">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.transactionId} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{`${payment.month}, ${payment.year}`}</td>
                                <td className="px-4 py-2 border-b">${payment.amount}</td>
                                <td className="px-4 py-2 border-b">{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {page < totalPages && (
                <div className="mt-4 text-center">
                    <button
                        onClick={loadMore}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
