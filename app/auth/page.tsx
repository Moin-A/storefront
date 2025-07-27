"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { Checkbox } from "../../components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    // Handle success/error here
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-xl md:text-2xl font-bold">ShopHub</span>
            </Link>
            <div className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" className="p-0 ml-1 h-auto font-semibold text-primary" onClick={toggleAuthMode}>
                {isLogin ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Branding */}
          <div className="hidden lg:block">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl xl:text-5xl font-bold mb-6 text-gray-900">Welcome to ShopHub</h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover amazing products at unbeatable prices. Join thousands of happy customers today.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Exclusive deals and offers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Secure and fast checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Personalized recommendations</span>
                </div>
              </div>

              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Shopping illustration"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <CardDescription className="text-base">
                  {isLogin
                    ? "Sign in to your account to continue shopping"
                    : "Join ShopHub and start your shopping journey"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full h-12 bg-transparent" type="button">
                    <Image
                      src="/placeholder.svg?height=20&width=20"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full h-12 bg-transparent" type="button">
                    <Image
                      src="/placeholder.svg?height=20&width=20"
                      alt="Facebook"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Continue with Facebook
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                {/* Auth Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" placeholder="John" required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" required className="h-12" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="h-12"
                    />
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-12" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          required
                          className="h-12 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required className="mt-1" />
                      <Label htmlFor="terms" className="text-sm leading-5">
                        I agree to the{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isLogin ? "Signing in..." : "Creating account..."}
                      </div>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                {/* Mobile toggle */}
                <div className="text-center lg:hidden">
                  <span className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <Button
                    variant="link"
                    className="p-0 ml-1 h-auto font-semibold text-primary"
                    onClick={toggleAuthMode}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Protected by industry-standard encryption and security measures
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
