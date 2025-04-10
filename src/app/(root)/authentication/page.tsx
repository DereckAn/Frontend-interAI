"use client";

import { LoginCard } from "@/src/components/authentication/LoginCard";
import { RegisterCard } from "@/src/components/authentication/RegisterCard";
import { useState } from "react";

export default function AuthenticationPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  function renderAuthComponent() {
    if (isLoginView) {
      return <LoginCard onToggleView={() => setIsLoginView(false)} />;
    }
    return <RegisterCard onToggleView={() => setIsLoginView(true)} />;
  }

  return (
    <main className="flex h-[calc(100vh-6rem)] items-center content-center justify-center">
      {renderAuthComponent()}
    </main>
  );
}
