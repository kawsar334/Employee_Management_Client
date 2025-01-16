import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'


const HrDashboard = () => {
  return (
    <div className='w-full '>
     <div className='flex justify-start items-start'>
        <Sidebar />
        <div className='h-max overflow-y-auto px-10'>
        employee ilist
        </div>
     </div>
    </div>
  )
}

export default HrDashboard