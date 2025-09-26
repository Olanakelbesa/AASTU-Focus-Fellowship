"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleIcon from "../ui/googleIcon";
import ErrorHandler from "@/lib/utils/errorHandler";
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from "@/lib/redux/authSlice/selector";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/lib/redux/authSlice";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading)

  const route = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(loginRequest({ email, password }));
    } catch (error) {
      ErrorHandler.handleReduxError(error as string, "LOGIN");
    }
  };

  useEffect(() => {
    if(isAuthenticated){
      route.push("/")
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative">
      {/* Logo - Top Left Corner */}
      <div className="absolute top-4 left-10 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900"
        >
          <div className="flex ">
            <span className="text-primary-gradient mr-1">AASTU</span>{" "}
            <span>FOCUS</span>
          </div>
        </Link>
      </div>

      {/* Left side - Form */}
      <div className="p-8 lg:p-12 flex flex-col justify-center bg-background h-screen">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-8 w-full mx-auto text-center">
            <h1 className="text-2xl font-bold  mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className=" font-medium">
                Email*
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12"
              />
            </div>

            <div>
              <Label htmlFor="password" className=" font-medium">
                Password*
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-12"
              />
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="mt-0.5" />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/80 text-white font-medium mt-6"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full mb-6 h-12 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
            type="button"
          >
            <GoogleIcon />
            Login with Google
          </Button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="relative bg-gradient-to-br from-primary-foreground to-primary/20 hidden lg:block h-screen">
        <div className="absolute inset-2 ">
          <div className="absolute inset-0 rounded-[10px] overflow-hidden ">
            <Image
              src="/hero-image.jpg"
              alt="Cozy living room with modern furniture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800" />
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white ">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-balance">
              Welcome Back to AASTU Focus
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Continue your journey of faith and fellowship. Sign in to access
              events, connect with your team, and stay updated with our
              community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
