"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoogleIcon from "../ui/googleIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectIsAuthenticated,
  selectIsRegistered,
} from "@/lib/redux/authSlice/selector";
import { registerRequest } from "@/lib/redux/authSlice";
import ErrorHandler from "@/lib/utils/errorHandler";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";

// List of departments for autocomplete
const departments = [
  "Biotechnology",
  "Chemical Engineering",
  "Civil Engineering",
  "Electrical and Computer Engineering",
  "Electromechanical Engineering",
  "Environmental Engineering",
  "Food Science and Applied Nutrition",
  "Industrial Chemistry",
  "Mechanical Engineering",
  "Freshman",
  "Software Engineering",
  "Other",
];

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    yearOfStudy: "1",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const isRegistered = useSelector(selectIsRegistered);
  const isLoading = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      router.push("/login");
    }
  }, [isRegistered, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(registerRequest(formData));
    } catch (error) {
      ErrorHandler.handleReduxError(error as string, "SIGNUP");
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Handle department suggestions
    if (field === "department") {
      const inputValue = value.toString().toLowerCase();
      if (inputValue.length > 1) {
        const filtered = departments.filter((dept) =>
          dept.toLowerCase().includes(inputValue)
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, department: suggestion }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

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

      {/* Left side - Hero Image */}
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
              Join Our Fellowship Community
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Connect with fellow students, grow in faith, and make lasting
              friendships through our Christ-centered fellowship activities and
              events.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="p-8 lg:p-14 pt-16 lg:pt-20 flex flex-col justify-start lg:justify-center bg-background h-screen overflow-auto ">
        <div className="max-w-lg mx-auto w-full pt-8 lg:pt-20">
          {/* Header */}
          <div className="mb-8 w-full mx-auto text-center">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-600">Join our fellowship community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name*
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1 h-12 border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email*
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 h-12 border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password*
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="mt-1 h-12 border-gray-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Department and Year of Study - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department Field */}
              <div className="relative">
                <Label
                  htmlFor="department"
                  className="text-gray-700 font-medium"
                >
                  Department*
                </Label>
                <Input
                  id="department"
                  type="text"
                  placeholder="Enter your department"
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  className="mt-1 h-12 border-gray-300"
                  list="department-list"
                  autoComplete="off"
                  required
                />
                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Year of Study Field */}
              <div>
                <Label htmlFor="yearOfStudy" className=" font-medium">
                  Year of Study*
                </Label>
                <Select
                  value={formData.yearOfStudy.toString()}
                  onValueChange={(value) =>
                    handleInputChange("yearOfStudy", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1 h-12 w-full">
                    <SelectValue placeholder="Select year of study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Phone Field */}
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number*
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 h-12 border-gray-300"
                required
              />
            </div>
            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/80 text-white font-medium mt-6"
            >
              {isLoading ? <Loader /> : "Sign Up"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
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

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
