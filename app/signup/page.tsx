"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password match
    if (signupData.password !== signupData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      })
      return
    }

    // Validate password strength
    if (signupData.password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long",
      })
      return
    }

    console.log("Signup data:", signupData)
    toast({
      title: "Account Created",
      description: "Your account has been created successfully.",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user types
    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
              <div className="absolute w-6 h-6 rounded-full bg-background flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse" />
              </div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">Aurora</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="pl-10"
                    value={signupData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={signupData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                    value={signupData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    value={signupData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={signupData.agreeTerms}
                  onCheckedChange={(checked) => setSignupData((prev) => ({ ...prev, agreeTerms: !!checked }))}
                  required
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="agreeTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!signupData.agreeTerms}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
