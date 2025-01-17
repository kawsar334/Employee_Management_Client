import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({ month: '', year: '' });
  const [salary, setSalary] = useState(0)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchEmployees();
  }, [page, limit]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://employee-one-coral.vercel.app/api/user/userList', {
        params: { page, limit },
        withCredentials: true,
      });
      const user = response?.data?.data.filter((i) => i.role === "employee");
      console.log(user)
      setEmployees(user);
    } catch (err) {
      console.error(err);
    }
  };



  const toggleVerification = async (id) => {
    const data = await axios.put(`https://employee-one-coral.vercel.app/api/user/verifiyemployee/${id}`, { withCredentials: true });
    toast.success(data?.data.message);
    fetchEmployees();
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setSalary(employee?.salary)
    setModalIsOpen(true);
  };

  const handlePay = async () => {
    const { month, year, } = paymentInfo
    try {

      const data = await axios.post(`https://employee-one-coral.vercel.app/api/payment/createpay/${selectedEmployee._id}`, { month, year, amount: salary }, { withCredentials: true });
      console.log(data)
      setModalIsOpen(false);
      fetchEmployees();
    } catch (err) {
      console.log(err)
    }
  };




  return (
    <div className='flex '>
     
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee List</h2>


        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg ">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Bank Account</th>
                <th className="px-4 py-2">Salary</th>
                <th className="px-4 py-2">Pay</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 && employees?.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleVerification(employee._id)}
                      className={`px-2 py-1 rounded ${employee.isVerified
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}
                    >
                      {employee.isVerified ? '✅' : '❌'}
                    </button>
                  </td>
                  <td className="px-4 py-2">{employee?.bankAccountNo || "Not found"}</td>
                  <td className="px-4 py-2">${employee?.salary}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(employee)}
                      disabled={!employee.isVerified}
                      className={`px-4 py-2 rounded ${employee.isVerified
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                    >
                      Pay
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`/employedetails/${employee._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=' p-4 flex justify-center items-center gap-3 '>
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className='border px-2 py-1 rounded'>
              Previous
            </button>
            <span>Page {page}</span>
            <button className='border px-2 py-1 rounded' onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>

        {/* Payment Modal */}
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h3 className="text-lg font-semibold mb-4">Pay Salary</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Month</label>
              <input
                type="text"
                value={paymentInfo.month}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, month: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Year</label>
              <input
                type="text"
                value={paymentInfo.year}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, year: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              onClick={handlePay}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Pay
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeList;





