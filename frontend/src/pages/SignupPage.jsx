import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageSquare } from "lucide-react";

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
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8 ">
          <div className="text-center mb-8">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2 ">Create Account</h1>
            <p className="text-base-content/60">
              Get Started with your free account
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6"></form>
      </div>
    </div>
  );
}

export default SignupPage;
