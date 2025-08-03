"use client";

import { Button } from "@/src/components/ui/button";

export function PasswordForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="current-password" className="text-sm font-medium">
          Current Password
        </label>
        <input
          id="current-password"
          type="password"
          className="w-full p-2  bg-gray2/10 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="new-password" className="text-sm font-medium">
          New Password
        </label>
        <input
          id="new-password"
          type="password"
          className="w-full p-2  bg-gray2/10 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-medium">
          Confirm New Password
        </label>
        <input
          id="confirm-password"
          type="password"
          className="w-full p-2  bg-gray2/10 rounded-md"
        />
      </div>
      <Button variant="outline">Update Password</Button>
    </div>
  );
}
