"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call Quarkus logout endpoint to clear the cookie
      await fetch(process.env.NEXT_PUBLIC_API_URL + "api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Sign out from Auth.js
      await signOut({ redirect: false });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Logout
    </button>
  );
};
