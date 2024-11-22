import React from 'react'

function Colorbar() {
    return (
        <div className="sm:w-[10%] md:w-[10%] lg:w-[7%] w-[10%] h-full overflow-y-scroll space-y-10 lg:pt-5 md:pt-5 sm:pt-5 pt-[30%]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="bg-red-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
            <div className="bg-blue-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
            <div className="bg-yellow-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
            <div className="bg-green-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
            <div className="bg-purple-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
            <div className="bg-gray-500 w-[80%] h-10 rounded-2xl mx-auto"></div>
        </div>
    )
}

export default Colorbar
