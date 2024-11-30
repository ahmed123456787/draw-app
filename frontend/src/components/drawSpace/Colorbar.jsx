import React ,{useState} from 'react';

function Colorbar({setColorShape}) {
    // Tableau des couleurs en hexadécimal
    const [activeColor, setActiveColor] = useState("");
    const colors = [
        "#EF4444", // Red
        "#3B82F6", // Blue
        "#F59E0B", // Yellow
        "#10B981", // Green
        "#8B5CF6", // Purple
        "#6B7280", // Gray
    ];

    return (
        <div className="sm:w-[10%] md:w-[10%] lg:w-[7%] w-[10%] h-full overflow-y-scroll space-y-10 lg:pt-5 md:pt-5 sm:pt-5 pt-[30%]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <ul className="space-y-4">
                {colors.map((color, index) => (
                    <li key={index} className="mx-auto">
                        <div
                            style={{ backgroundColor: color ,cursor:'pointer', marginInline:'auto', border: color === activeColor ? "1px solid" : "none",}}
                            className="w-[80%] h-10 rounded-2xl"
                            onClick={()=>{setColorShape(color);

                                            setActiveColor(color);
                            }}

                        ></div>
                    </li>   
                ))}
            </ul>
        </div>
    );
}

export default Colorbar;
