"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // correct for App Router











export default function AuthPage() {
    const [isSignup, setIsSignup] = useState(false);

const router = useRouter();
// login
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

// signup
const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");
const [name, setName] = useState("");

const [gender, setGender] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [errors, setErrors] = useState({});




const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;



function validateForm() {
    setErrors({}); // reset errors
  let newErrors = {};

  // required fields
  if (!name || !signupEmail || !signupPassword || !confirmPassword || !gender) {
    newErrors.message = "All fields are required";
    return setErrors(newErrors);
  }

  // email
  if (!emailRegex.test(signupEmail)) {
  newErrors.email = "Invalid email format";
  return setErrors(newErrors);
}

if (!passwordRegex.test(signupPassword)) {
  newErrors.password = "Password must include uppercase, lowercase & number";
  return setErrors(newErrors);
}

if (signupPassword !== confirmPassword) {
  newErrors.confirmPassword = "Passwords do not match";
  return setErrors(newErrors);
}

  

  return Object.keys(newErrors).length === 0;
}



async function handleLogin(e) {
  e.preventDefault();
setErrors({}); // reset errors
  let newErrors = {};

   if (!loginEmail || !loginPassword) {
    newErrors.message = "All fields are required";
    return setErrors(newErrors);
  }
  if (!emailRegex.test(loginEmail)) {
    newErrors.email = "Invalid email format";
    return setErrors(newErrors);
  }

  if (!passwordRegex.test(loginPassword)) {
    newErrors.password = "Invalid password format";
    return setErrors(newErrors);
  }

 

  if (Object.keys(newErrors).length > 0) return;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
  });
let data=await res.json(); 
  if (!res.ok) {
    setErrors({ message: data.message || "Login failed" });
    return;
  }

  router.push("/select_user");
}




async function handleSignup(e) {
  e.preventDefault();

  if (!validateForm()) return;

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email: signupEmail,
      password: signupPassword,
      gender,
    }),
  });
  let data=await res.json();

  if (!res.ok) {
    setErrors({ message:data.message });
    return;
  }

  router.push("/select_user");
}






    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="relative w-full max-w-4xl h-[550px] bg-white rounded-3xl overflow-hidden shadow-2xl flex">

                {/* LOGIN FORM */}
                <div className="w-1/2 flex items-center justify-center p-10">
                    <motion.div
                        animate={{
                            opacity: isSignup ? 0 : 1,
                            x: isSignup ? -50 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm"
                    >
                        <h2 className="text-4xl font-bold text-[#155ABF] mb-3">
                            Login
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Welcome back! Please login.
                        </p>

                        <form onSubmit={handleLogin}  className="space-y-4">
                                {errors.message && (
                    <p className="text-red-500">{errors.message}</p>
                        )}
                       
                            {errors.email && (
                             <p className="text-red-500 text-sm">{errors.email}</p>
                             )}
                         
                            <input
                                type="email"
                                value={loginEmail}
                               onChange={(e) => setLoginEmail(e.target.value)}

                                placeholder="Email"
                                className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:border-[#1E63D0]"
                            />
                           {errors.password && (
                             <p className="text-red-500 text-sm">{errors.password}</p>
                             )}
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:border-[#1E63D0]"
                            />

                            <button 
                            className="w-full p-3 bg-[#1E63D0] text-white rounded-lg hover:bg-[#155ABF] transition">
                                Login
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* SIGNUP FORM */}
                <div className="w-1/2 flex items-center justify-center p-10">
                    <motion.div
                        animate={{
                            opacity: isSignup ? 1 : 0,
                            x: isSignup ? 0 : 50,
                        }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm"
                    >
                        <h2 className="text-4xl font-bold text-[#155ABF] mb-3">
                            Sign Up
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Create your new account.
                        </p>

                        <form className="space-y-4" onSubmit ={handleSignup}>
                                {errors.message && (
                    <p className="text-red-500">{errors.message}</p>
                        )}

                         
                            <input
                                type="text"
                                value={name}
                               onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-lg text-gray-500 focus:outline-none focus:border-[#1E63D0]"
                            />
                             {errors.email && (
                             <p className="text-red-500 text-sm">{errors.email}</p>
                             )}
                             
                            <input
                                type="email"
                                placeholder="Email"
                                 value={signupEmail}
                               onChange={(e) => setSignupEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg  text-gray-500 focus:outline-none focus:border-[#1E63D0]"
                            />


                             {errors.password && (
                             <p className="text-red-500 text-sm">{errors.password}</p>
                             )}
                            <input
                                type="password"
                                value={signupPassword}
                               onChange={(e) => setSignupPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-3 border rounded-lg text-gray-500 focus:outline-none focus:border-[#1E63D0]"
                            />
                            <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg text-gray-500"
                             />

{errors.confirmPassword && (
  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
)}
                            <div className="space-y-2">
                                <p className="text-gray-600 font-medium">Gender:</p>

                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                                        <input type="radio"
                                        value="male"
                               onChange={(e) => setGender(e.target.value)}   className="accent-[#1E63D0]" />
                                        Male
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer text-gray-500 text-gray-500">
                                        <input type="radio" value="female"
                               onChange={(e) => setGender(e.target.value)}  className="accent-[#1E63D0]" />
                                        Female
                                    </label>
                                </div>
                            </div>
                            <button onClick={()=>{handleSignup}}
                            className="w-full p-3 bg-[#1E63D0] text-white rounded-lg hover:bg-[#155ABF] transition">
                                Create Account
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* SLIDER PANEL */}
                <motion.div
  suppressHydrationWarning
  animate={{
    x: isSignup ? "-100%" : "0%",
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
  }}
                    transition={{
                        x: {
                            duration: 0.6,
                            ease: "easeInOut",
                        },
                        backgroundPosition: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                    className="absolute top-0 right-0 w-1/2 h-full z-20 flex flex-col items-center justify-center text-white p-10
  bg-[linear-gradient(135deg,#1E63D0,#155ABF,#4F8FF7,#1E63D0)]
  bg-[length:300%_300%]"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        {isSignup ? "Welcome Back!" : "Hello Friend!"}
                    </h1>

                    <p className="text-center mb-6">
                        {isSignup
                            ? "Already have an account?"
                            : "Don't have an account?"}
                    </p>

                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-[#155ABF] transition"
                    >
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
