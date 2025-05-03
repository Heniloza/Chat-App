import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, MessageSquare, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigninUp } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* {left side } */}
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8 ">
          <div className="text-center mb-8 flex justify-center items-center flex-col gap-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ">
              <MessageSquare className="size-6 text-primary " />
            </div>
            <h1 className="text-2xl font-bold mt-2 ">Create Account</h1>
            <p className="text-base-content/60">
              Get Started with your free account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[50%]">
          {/* {input} */}
          <div className="form-control">
            <label className="label p-2">
              <span className="label-text font-medium">Full Name</span>
            </label>

            <div className="relative">
              <input
                type="text"
                className={`input input-bordered w-full  pl-4 pr-8`}
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>
          {/* {email} */}
          <div className="form-control">
            <div className="label p-2">
              <span className="label-text font-medium">Email</span>
            </div>
            <div className="relative">
              <input
                type="email"
                className={`input input-bordered w-full  pl-4 pr-8`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          {/* {password} */}
          <div className="form-control">
            <label className="label p-2">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-4 pr-10"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          {/* {button} */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isSigninUp}
          >
            {isSigninUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/40 mt-2">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* {right side } */}
      <AuthImagePattern
        title="Join our commuinity"
        subtitle="Connect with friends, share moments, and stay in touch with loved once"
      />
    </div>
  );
}

export default SignupPage;
