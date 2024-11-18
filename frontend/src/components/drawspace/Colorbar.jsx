import React from 'react'

function Colorbar() {
    return (
        <div className="w-[10%] sm:w-[10%] md:w-[8%] lg:w-[6%] h-full overflow-y-scroll space-y-10 pt-5 mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
