// import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Welcome() {
//   const navigate = useNavigate();

  return (
    <div className="w-full max-w-[650px]">
      <div className="bg-white rounded-[20px] p-12 text-center">
        <img
          src={logo}
          alt="Free Shops Logo"
          className="w-[100px] h-[100px] object-contain mx-auto mb-8"
        />

        <h1 className="text-[32px] font-bold text-black mb-1">Welcome</h1>
        <h2 className="text-[24px] text-[#FF8553]  font-bold mb-4">
          to the Free Shops App Admin Panel
        </h2>

        <p className="text-[16px] text-[#7F7F7F] mb-8 max-w-[450px] mx-auto">
          Manage and monitor all aspects of your app seamlessly from one place.
          Use the tools below to get started.
        </p>

        <button
        //   onClick={() => navigate("/dashboard")}
          className="w-[180px] h-[40px] bg-[#199FB1] text-white rounded-[8px] text-[14px] font-medium hover:bg-[#168c9d] transition-colors"
        >
          Get Start
        </button>
      </div>
    </div>
  );
}
