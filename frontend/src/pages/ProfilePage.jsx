import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const handleImageUpdate = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-base-300 rounded-xl p-6 space-y-8"></div>
      </div>
    </div>
  );
}

export default ProfilePage;
