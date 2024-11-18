import React from 'react';
import Topbar from '../components/drawSpace/Topbar';
import Sidebar from '../components/drawSpace/Sidebar';
import Drawingarea from '../components/drawSpace/Drawingarea';
import Colorbar from '../components/drawSpace/Colorbar';
function DrawSpace() {
  return (
    <div className="h-screen">
      {/* Top Bar */}

        <Topbar />
     
      {/* Draw Space */}
      <div className="sm:h-[86%] md:h-[88%]  lg:h-[90%] flex">
        {/* Side Bar */}
        <Sidebar />
        {/* Draw Paper */}
        <Drawingarea />
        {/* Color Bar */}
        <Colorbar />
      </div>
    </div>
  );
}

export default DrawSpace;
{/* chaque conteniare et sa propre configuration dans ce contenaire  (div) */ }