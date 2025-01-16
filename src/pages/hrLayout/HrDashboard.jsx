import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import EmployeeListForHr from './EmployeeListForHr'

const HrDashboard = () => {
  return (
    <div className='w-full '>
     <div className='flex justify-between items-start'>
        <Sidebar />
        <div className='h-max overflow-y-auto px-10'>
        <EmployeeListForHr />
        </div>
     </div>
    </div>
  )
}

export default HrDashboard