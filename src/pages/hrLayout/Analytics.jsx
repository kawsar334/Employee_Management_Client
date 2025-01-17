

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressComponent from '../../components/hrcomponents/Progress';
import Sidebar from '../../components/sidebar/Sidebar';

const Progress = () => {
  
    return (
       <div className='flex justify-start items-start'>
        <Sidebar/>
        <ProgressComponent/>
        </div>
    );
};

export default Progress;
