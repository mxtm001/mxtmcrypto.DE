"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const ADMIN_EMAIL = "rabiuali168@gmail.com"
  const ADMIN_PASSWORD = "Xanthosis2234@"

  useEffect(() => {
    setMounted(true)
    // Check if admin is already logged in
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      router.push("/admin/dashboard")
    }
  }, [router])

  const verifyAdmin = (adminEmail: string, adminPassword: string) => {
    return adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (verifyAdmin(email, password)) {
        // Store admin info in localStorage
        localStorage.setItem("admin_user", JSON.stringify({ email: email, role: "admin" }))
        localStorage.setItem("user", JSON.stringify({ email: email, role: "admin" }))

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        throw new Error("Invalid admin credentials. Please try again.")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050e24] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f9a826]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050e24] via-[#0a1735] to-[#162040] flex flex-col">
      <header className="container mx-auto py-4 px-4">
        <Link href="/" className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
          </div>
          <span className="ml-2 text-white font-medium">MXTM INVESTMENT PLATFORM</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl p-8">
            <Link href="/" className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <h2 className="text-3xl font-bold text-white mb-2 text-center">Admin Access</h2>
            <p className="text-gray-300 text-center mb-6">Enter your administrator credentials</p>

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-500/20 border-red-500/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#f9a826] transition-colors h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#f9a826] transition-colors h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f9a826] to-yellow-500 hover:from-[#f9a826]/90 hover:to-yellow-500/90 text-black font-semibold h-12 transition-all hover:scale-105"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-300">
                Not an administrator?{" "}
                <Link href="/login" className="text-[#f9a826] hover:underline font-medium transition-colors">
                  Regular Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
