"use client";

import { Brain, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

// Enlaces para usuarios autenticados
const authenticatedLinks = [
  {
    href: "/historial",
    label: "History",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

// Enlaces para usuarios no autenticados
const unauthenticatedLinks = [
  {
    href: "/authentication",
    label: "Login",
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  // Determinar qué enlaces mostrar basado en el estado de autenticación
  const links =
    status === "authenticated" ? authenticatedLinks : unauthenticatedLinks;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-5 text-background left-5 right-5 z-50 bg-gray2/50 backdrop-blur-sm shadow-sm px-4 py-2 sm:px-6 lg:px-8 rounded-xl mx-auto flex justify-between items-center lg:max-h-[48px] max-w-[1690px]">
      <Link href={"/"} className="flex items-center justify-start gap-3">
        <Brain className="w-5 h-5" />
        <h1
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Interview Simulator
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center justify-center divide-x divide-gray2/20">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-center px-4 py-2 transition-colors duration-200 hover:bg-gray2/10 rounded-md"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {status === "authenticated" && (
          <li>
            <Link
              href="/api/auth/signout"
              className="flex items-center justify-center px-4 py-2 transition-colors duration-200 hover:bg-gray2/10 rounded-md text-red-500"
            >
              Logout
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray2/10"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray2/50 backdrop-blur-sm shadow-md rounded-b-xl mt-1 py-2 z-50">
          <ul className="flex flex-col items-center">
            {links.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className="flex items-center justify-center px-4 py-3 transition-colors duration-200 hover:bg-borde/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {status === "authenticated" && (
              <li className="w-full">
                <Link
                  href="/api/auth/signout"
                  className="flex items-center justify-center px-4 py-3 transition-colors duration-200 hover:bg-borde/20 text-red-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
