import React from "react";
import { MessageSquare } from "lucide-react";

function NoChatSelected() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          Welcome to
          <span className="px-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Sync
          </span>
        </h2>
        <p className="text-base-content/60">
          a new way to stay connected — instantly.
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
