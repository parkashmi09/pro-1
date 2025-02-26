import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function WithAuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative">
    {/* Background Image */}
    <div
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
      style={{
        backgroundImage: "url('/images/bg.png')",
      }}
    />

    {/* Content Container */}
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] gap-8 items-center rounded-[20px] bg-[#A5A5A5] bg-opacity-[0.22] backdrop-blur-[56.5px] min-h-[600px] relative py-12">
       

     <div className="w-full h-full flex justify-center items-center">

     <Outlet />
     </div>
      
        
      </div>
    </div>

    <Toaster position="top-center" />
  </div>
  );
} 