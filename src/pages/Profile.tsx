import type React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/getProfile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      const { fullName, email, phone } = data.data;
      setFormData({ fullName, email, phone });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch profile"
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("image", ""); 

      const response = await fetch(
        "https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
      navigate("/welcome");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/welcome");
  };

  return (
    <div className="w-full max-w-[650px]">
      <div className="bg-white rounded-[20px] p-8">
        <div className="text-right">
          <button
            onClick={handleSkip}
            className="text-[#7F7F7F] text-[14px]"
          >
            Skip
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-[120px] h-[120px] bg-[#F5F5F5] rounded-full flex items-center justify-center mb-2">
              <Camera className="w-12 h-12 text-[#7F7F7F]" />
            </div>
          </div>
          <h2 className="text-[#199FB1] text-[14px]">Upload Profile Pitchers</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8">
          <div>
            <label className="text-[#7F7F7F] text-[14px] block mb-1">
              Your Name
            </label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-[40px] px-3 border border-[#E5E5E5] rounded-[8px] text-[14px]"
            />
          </div>

          <div>
            <label className="text-[#7F7F7F] text-[14px] block mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[40px] px-3 border border-[#E5E5E5] rounded-[8px] text-[14px]"
            />
          </div>

          <div>
            <label className="text-[#7F7F7F] text-[14px] block mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[40px] px-3 border border-[#E5E5E5] rounded-[8px] text-[14px]"
            />
          </div>

          <div>
            <label className="text-[#7F7F7F] text-[14px] block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[40px] px-3 border border-[#E5E5E5] rounded-[8px] text-[14px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-[#7F7F7F]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#7F7F7F]" />
                )}
              </button>
            </div>
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-[14px] text-[#7F7F7F]"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-[180px] h-[40px] mx-auto block bg-[#199FB1] text-white rounded-[8px] text-[14px] font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
