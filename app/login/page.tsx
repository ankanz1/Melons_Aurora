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
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login data:", loginData)
    toast({
      title: "Login Successful",
      description: "You have been logged in successfully.",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
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
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                    value={loginData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginData.password}
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={loginData.rememberMe}
                  onCheckedChange={(checked) => setLoginData((prev) => ({ ...prev, rememberMe: !!checked }))}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  Remember me for 30 days
                </Label>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
