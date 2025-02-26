import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function WithoutAuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('../src/assets/images/bg.png')",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-8 items-center rounded-[20px] bg-[#A5A5A5] bg-opacity-[0.22] backdrop-blur-[56.5px] min-h-[600px] relative py-12">
          {/* Logo Section */}
          <div className="hidden md:flex justify-center">
            <img
              src="../src/assets/images/logo.png"
              alt="Free Shops Logo"
              className="w-[251px] h-[248px] object-contain"
            />
          </div>

          {/* Routes Container with Red Line */}
          <div className="relative flex">
            {/* Red Vertical Line */}
            <div className="absolute left-0 h-[100%] flex items-center">
              <div className="h-full w-0.5 bg-red-500 relative">
                <div className="absolute -top-2 -left-[3px] w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="absolute -bottom-2 -left-[3px] w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto ml-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
} 