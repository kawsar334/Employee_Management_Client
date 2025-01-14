import React from 'react'

const Title = ({ title, sub =null }) => {
    return (
        <div className='capitalize w-full mx-auto  py-10 flex justify-center items-center gap-1 flex-col '>
            <h1 className='text-3xl'>{title}</h1>
            {sub &&<p className='text-gray-500'>{sub}</p>}
        </div>
    )
}

export default Title