import React from 'react'
import { PiBatteryWarningVertical } from "react-icons/pi";

const EmptyCart = ({size}) => {
    return (
        <div className='text-gray-400 text-center my-5'>
            <h2 className='text-lg'>Cart Empty</h2>
            <div className=''>
                <PiBatteryWarningVertical className={`items-center text-center my-5 size-${size}`} />
            </div>
        </div>

    )
}

export default EmptyCart