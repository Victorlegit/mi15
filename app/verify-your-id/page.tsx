"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { RESEND_CONFIG } from "@/lib/config"

// Add type safety for form data
interface VerifyFormData {
  verifyEmail: string
  verifyIdNumber: string
}

interface OTPData {
  otp: string
  timestamp: number
}

export default function VerifyYourId() {
  const router = useRouter()
  const [formData, setFormData] = useState<VerifyFormData>({
    verifyEmail: "",
    verifyIdNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<VerifyFormData>>({})

  // Pre-fill form data from localStorage if available
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("leaveApplicationData") || "{}")
    if (existingData.step3) {
      setFormData(existingData.step3)
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<VerifyFormData> = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.verifyEmail) {
      newErrors.verifyEmail = "Email is required"
    } else if (!emailRegex.test(formData.verifyEmail)) {
      newErrors.verifyEmail = "Please enter a valid email address"
    }

    // ID number validation
    if (!formData.verifyIdNumber.trim()) {
      newErrors.verifyIdNumber = "ID number is required"
    } else if (formData.verifyIdNumber.trim().length < 3) {
      newErrors.verifyIdNumber = "ID number must be at least 3 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Get all stored form data
      const existingData = JSON.parse(localStorage.getItem("leaveApplicationData") || "{}")
      const updatedData = {
        ...existingData,
        step3: formData,
        verifiedAt: new Date().toISOString(),
      }

      // Store the updated data
      localStorage.setItem("leaveApplicationData", JSON.stringify(updatedData))

      // Generate and send OTP
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: RESEND_CONFIG.ADMIN_EMAIL,
          userEmail: formData.verifyEmail, // Send user's email for reference
          userData: updatedData,
        }),
      })

      let result
      try {
        result = await response.json()
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError)
        throw new Error("Server returned invalid response")
      }

      if (response.ok && result.success) {
        // Store OTP data in localStorage for verification
        const otpData: OTPData = {
          otp: result.otp,
          timestamp: result.timestamp,
        }
        
        localStorage.setItem("otpData", JSON.stringify(otpData))

        // Navigate to OTP verification page
        router.push("/verify-code")
      } else {
        throw new Error(result.message || "Failed to send verification code")
      }
    } catch (error) {
      console.error("Error sending verification code:", error)
      alert(`There was an error sending the verification code: ${error.message}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof VerifyFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="navbar bg-white shadow-sm">
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.jpg" 
                alt="Navieros Logo" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/" 
              className="nav-button text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/start-leave-application" 
              className="nav-button bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Leave Application
            </Link>
          </div>
        </div>
      </nav>

      <div className="form-container py-8">
        <div className="form-wrapper max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Account Verification
            </h1>
            <p className="text-gray-600">
              To proceed, verify your account using your email and ID number.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="application-form space-y-6">
            <div className="form-group">
              <label htmlFor="verifyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="verifyEmail"
                name="verifyEmail"
                value={formData.verifyEmail}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.verifyEmail ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
                required
              />
              {errors.verifyEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.verifyEmail}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="verifyIdNumber" className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                id="verifyIdNumber"
                name="verifyIdNumber"
                value={formData.verifyIdNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.verifyIdNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your ID number"
                required
              />
              {errors.verifyIdNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.verifyIdNumber}</p>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Verification Code...
                </span>
              ) : (
                "Continue to Verification"
              )}
            </button>
          </form>

          {/* Additional helpful information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> A verification code will be sent to the administrator. 
              You'll need to enter this code on the next screen to complete your verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
