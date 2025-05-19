"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState(""); // Store the code sent to the user

  const handleSendVerificationCode = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsVerifying(true);
    setError("");
    try {
      // Simulate sending a verification code to the user's email
      const response = await axios.post("/api/(auth)/send-verification-code", {
        email,
      });
      if (response.data.success) {
        setSentCode(response.data.code); // Store the code returned by the API
        setError("");
      } else {
        setError("Failed to send verification code. Please try again.");
        setIsVerifying(false);
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      setError("An unexpected error occurred while sending the verification code.");
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === sentCode) {
      setIsEmailVerified(true);
      setIsVerifying(false);
      setError("");
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAgreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (!isEmailVerified) {
      setError("Please verify your email address.");
      return;
    }
    try {
      const response = await axios.post("/api/(auth)/sign-up", {
        username,
        email,
        password,
      });
      if (response.data.success) {
        router.push("/"); // Redirect to homepage on success
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await axios.get("/api/(auth)/google-signup");
      if (response.data.success) {
        router.push("/");
      } else {
        setError("Google sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      setError("An unexpected error occurred during Google sign-up.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Logo and Sign In Link */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png" // Replace with your logo path
              alt="LearnLive Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="ml-2 text-xl font-bold text-blue-600">LearnLive</h1>
          </div>
          <a
            href="/signin"
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            Sign in
          </a>
        </div>

        {/* Header */}
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          Create your account
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Join LearnLive to get started
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-sm text-red-600">{error}</div>
        )}

        {/* Google Sign-Up Button */}
        <button
  onClick={handleGoogleSignUp}
  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-800 font-medium hover:shadow-md transition duration-200"
>
  <FcGoogle size={22} />
  <span>Sign up with Google</span>
</button>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or sign up with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1 relative">
              <input
                id="username"
                type="text"
                placeholder="John Doe"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label="Full Name"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isEmailVerified}
                  aria-label="Email address"
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12H8m4 4v-8m-4 4h8m-5-9h2a9 9 0 019 9v2a9 9 0 01-9 9H7a9 9 0 01-9-9v-2a9 9 0 019-9z"
                    />
                  </svg>
                </span>
              </div>
              {!isEmailVerified && !isVerifying && (
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                >
                  Verify
                </button>
              )}
            </div>
            {isVerifying && !isEmailVerified && (
              <div className="mt-2">
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Verification Code
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    id="verificationCode"
                    type="text"
                    placeholder="Enter code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    aria-label="Verification Code"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {isEmailVerified && (
              <div className="mt-2 text-sm text-green-600">
                Email verified successfully!
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-1.104 0-2 .896-2 2v3h4v-3c0-1.104-.896-2-2-2zm7-5h-1V6c0-2.761-2.239-5-5-5S8 3.239 8 6v2H7c-1.104 0-2 .896-2 2v9c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-9c0-1.104-.896-2-2-2z"
                  />
                </svg>
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              aria-label="Agree to Terms of Service and Privacy Policy"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Sign up


          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;