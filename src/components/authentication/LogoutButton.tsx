"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...");

      // Call Quarkus logout endpoint to clear the cookie
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log out from the server");
      }

      // Sign out from Auth.js
      await signOut({ redirect: false });

      toast.dismiss();
      toast.success("Logged out successfully");

      // Redirect to login page
      router.push("/authentication");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.dismiss();
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Logout
    </button>
  );
};
