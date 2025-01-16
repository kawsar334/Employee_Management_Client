import React from 'react'
import PaymentHistory from './PaymentHistory'
import WorkSheet from './EmployeeWorkSheet'
import Sidebar from '../../components/sidebar/Sidebar'

const UserDashboard = () => {
  return (
    <div className=''>

    <div className='flex justify-center items-start gap-3'>
      <Sidebar/>

        <WorkSheet />
    </div>
    </div>
  )
}

export default UserDashboard