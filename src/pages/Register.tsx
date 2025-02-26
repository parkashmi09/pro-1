import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
  })
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  })

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value) return "Full name is required";
        if (value.length < 2) return "Full name must be at least 2 characters";
        return "";
      case 'email':
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
        return "";
      case 'phone':
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Please enter a valid 10-digit phone number";
        return "";
      case 'password':
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  }

  useEffect(() => {
    const newErrors: ValidationErrors = {}
    
    Object.keys(touched).forEach((field) => {
      if (touched[field as keyof typeof touched]) {
        const error = validateField(field, formData[field as keyof typeof formData])
        if (error) newErrors[field as keyof ValidationErrors] = error
      }
    })
    
    setErrors(newErrors)
  }, [formData, touched])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const validateForm = (): boolean => {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
    });

    const newErrors: ValidationErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field as keyof ValidationErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        "https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      toast.success("Registered successfully!")
      navigate("/login")
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-left text-gray-900">Create Account</h1>
        <p className="text-[#7F7F7F] text-[14px] text-left mt-1">
          Join Free shops App controller
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block w-full px-3 py-2 border ${
              touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
          />
          {touched.fullName && errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block w-full px-3 py-2 border ${
              touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block w-full px-3 py-2 border ${
              touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full px-3 py-2 border ${
                touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-[50%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#199FB1] hover:bg-[#168c9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-teal-500">
            Already have an account? Log in
          </Link>
        </div>
      </form>
    </div>
  )
}

