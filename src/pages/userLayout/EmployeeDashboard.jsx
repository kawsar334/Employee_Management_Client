// import React from 'react'
// import PaymentHistory from './PaymentHistory'
// import WorkSheet from './EmployeeWorkSheet'
// import Sidebar from '../../components/sidebar/Sidebar'

// const EmployeeDashboard = () => {
//   return (
//     <div className=''>
//     <div className='flex justify-start items-start gap-3'>
//       <Sidebar/>
//         EmployeeDashboard
//     </div>
//     </div>
//   )
// }

// export default EmployeeDashboard


import React from 'react';
import PaymentHistory from './PaymentHistory';
import WorkSheet from './EmployeeWorkSheet';
import Sidebar from '../../components/sidebar/Sidebar';

const EmployeeDashboard = () => {
  return (
    <div className="w-full h-screen flex bg-gray-100">
     
    <WorkSheet/>
      
    </div>
  );
};

export default EmployeeDashboard;
