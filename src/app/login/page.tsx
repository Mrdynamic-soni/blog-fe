"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 1 lowercase, 1 uppercase, 1 digit, 1 special char, min 6 chars
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return pattern.test(password);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await fetch(`${process.env.API_LOCAL_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start lg:justify-center pt-24 lg:pt-2 bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 p-2 border border-gray-300 text-gray-800 rounded-md placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <p className="text-xs text-red-500 mt-1 ml-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-2 border border-gray-300 text-gray-800 rounded-md placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {passwordError && (
            <p className="text-xs text-red-500 mt-1 ml-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </main>
  );
}
