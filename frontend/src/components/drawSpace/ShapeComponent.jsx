const ShapeComponent = ({ icon: Icon, label, color,className }) => {
    return (
        <div className="flex flex-col items-center relative">
            {/* Icon container*/}
            <div
                className={`w-[70%] sm:h-16 md:h-16 lg:h-16 h-10 rounded-xl  flex items-center justify-center`}
                style={{ backgroundColor: color }}
            >
                <Icon className={`h-10 w-10 text-white ${className}`}/>
            </div>
            {/* Texte container*/}  
            <div className="absolute bottom-0 py-1 -mb-4">
                <span
                    className="text-xs font-bold  bg-white p-2 h-5 border md:text-xs sm:text-xs sm:p-1 border-gray-300 border-1 flex justify-center items-center rounded-xl"
                    style={{ color: color }}
                >
                    {label}
                </span>
            </div>
        </div>
    );
};

export default ShapeComponent;
