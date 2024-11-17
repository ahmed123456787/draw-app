const ShapeComponent = ({ icon: Icon, label, color,className }) => {
    return (
        <div className="flex flex-col items-center relative">
            {/* Icon container*/}
            <div
                className={`lg:w-[80%] h-16 rounded-2xl flex items-center justify-center`}
                style={{ backgroundColor: color }}
            >
                <Icon className={`w-10 h-10 text-white ${className}`}/>
            </div>
            {/* Texte container*/}
            <div className="absolute bottom-0 py-1 -mb-4">
                <span
                    className="text-xs font-bold  bg-white w-14 h-5  flex justify-center items-center rounded-xl"
                    style={{ color: color }}
                >
                    {label}
                </span>
            </div>
        </div>
    );
};

export default ShapeComponent;
