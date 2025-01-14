import React, { useState, useEffect } from 'react';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 5;

    // Fetch payments from the backend
    const fetchPayments = async (page) => {
        try {
            const response = await fetch(`/api/payments?page=${page}&limit=${itemsPerPage}`);
            const data = await response.json();
            if (data.length < itemsPerPage) {
                setHasMore(false);
            }
            setPayments((prev) => [...prev, ...data]);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchPayments(currentPage);
    }, [currentPage]);

    // Load more rows (for infinite scrolling)
    const loadMore = () => {
        if (hasMore) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className="payment-history p-6">
            <h1 className="text-2xl font-bold mb-4">Payment History</h1>
            <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Month, Year</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index} className="text-center">
                            <td className="border p-2">{payment.month}, {payment.year}</td>
                            <td className="border p-2">${payment.amount.toFixed(2)}</td>
                            <td className="border p-2">{payment.transactionId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination/Infinite Scroll */}
            {hasMore ? (
                <button
                    onClick={loadMore}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Load More
                </button>
            ) : (
                <p className="text-gray-500">No more payments to display.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
