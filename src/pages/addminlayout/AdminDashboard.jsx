import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import AdminEmployeeList from './AdminPageEmployee';

const AdminDashboard = () => {

  return (
    <div className='flex justify-start gap-3'>
      <Sidebar/>
      <AdminEmployeeList/>
    </div>
  )
}

export default AdminDashboard