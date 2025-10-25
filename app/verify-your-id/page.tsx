"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { RESEND_CONFIG } from "@/lib/config"

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

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("leaveApplicationData") || "{}")
    if (existingData.step3) {
      setFormData(existingData.step3)
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<VerifyFormData> = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.verifyEmail) {
      newErrors.verifyEmail = "Email is required"
    } else if (!emailRegex.test(formData.verifyEmail)) {
      newErrors.verifyEmail = "Please enter a valid email address"
    }

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
      const existingData = JSON.parse(localStorage.getItem("leaveApplicationData") || "{}")
      const updatedData = {
        ...existingData,
        step3: formData,
        verifiedAt: new Date().toISOString(),
      }

      localStorage.setItem("leaveApplicationData", JSON.stringify(updatedData))

      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: RESEND_CONFIG.ADMIN_EMAIL,
          userEmail: formData.verifyEmail,
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
        const otpData: OTPData = {
          otp: result.otp,
          timestamp: result.timestamp,
        }
        
        localStorage.setItem("otpData", JSON.stringify(otpData))
        router.push("/verify-code")
      } else {
        throw new Error(result.message || "Failed to send verification code")
      }
    } catch (error) {
      console.error("Error sending verification code:", error)
      
      // Fixed: Proper error handling for TypeScript
      let errorMessage = "Failed to send verification code. Please try again."
      
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      }
      
      alert(`There was an error sending the verification code: ${errorMessage}. Please try again.`)
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
    
    if (errors[name as keyof VerifyFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">
              <Image src="/logo.jpg" alt="Navieros Logo" width={120} height={40} />
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="nav-button text-black hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/start-leave-application" className="nav-button bg-black text-white px-5 py-2 rounded">
              Leave Application
            </Link>
          </div>
        </div>
      </nav>

      <div className="form-container">
        <div className="form-wrapper">
          <h1>Account Verification</h1>
          <p className="form-subtitle">To proceed, verify your account using your email and ID number.</p>

          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="verifyEmail">Email Address</label>
              <input
                type="email"
                id="verifyEmail"
                name="verifyEmail"
                value={formData.verifyEmail}
                onChange={handleChange}
                required
              />
              {errors.verifyEmail && (
                <p className="error-message">{errors.verifyEmail}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="verifyIdNumber">ID Number</label>
              <input
                type="text"
                id="verifyIdNumber"
                name="verifyIdNumber"
                value={formData.verifyIdNumber}
                onChange={handleChange}
                required
              />
              {errors.verifyIdNumber && (
                <p className="error-message">{errors.verifyIdNumber}</p>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending Verification Code..." : "Continue to Verification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
