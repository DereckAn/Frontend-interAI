"use client";

import { LogoutButton } from "@/src/components/authentication/LogoutButton";
import { Brain, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

// Enlaces para usuarios no autenticados
const unauthenticatedLinks = [
  {
    href: "/#pricing",
    label: "Pricing",
    isScrollLink: true,
  },
  {
    href: "/#how-it-works",
    label: "How It Works",
    isScrollLink: true,
  },
  {
    href: "/#features",
    label: "Features",
    isScrollLink: true,
  },
  {
    href: "/authentication",
    label: "Login",
    isScrollLink: false,
  },
];

// Enlaces para usuarios autenticados
const authenticatedLinks = [
  {
    href: "/historial",
    label: "History",
    isScrollLink: false,
  },
   {
    href: "/fill_information",
    label: "Fill Information",
    isScrollLink: false,
  },
  {
    href: "/interviews",
    label: "Interviews",
    isScrollLink: false,
  },
  {
    href: "/settings",
    label: "Settings",
    isScrollLink: false,
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

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
      <ul className="hidden md:flex items-center justify-center space-x-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.isScrollLink ? (
              <a
                href={link.href}
                className="flex items-center justify-center px-4 py-2 transition-colors duration-200 hover:bg-gray2/10 rounded-md"
                onClick={(e) => scrollToSection(e, link.href.substring(1))}
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="flex items-center justify-center px-4 py-2 transition-colors duration-200 hover:bg-gray2/10 rounded-md"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
        {status === "authenticated" && (
          <li>
            <LogoutButton />
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
                {link.isScrollLink ? (
                  <a
                    href={link.href}
                    className="flex items-center justify-center px-4 py-3 transition-colors duration-200 hover:bg-borde/20"
                    onClick={(e) => {
                      scrollToSection(e, link.href.substring(1));
                      setIsMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center justify-center px-4 py-3 transition-colors duration-200 hover:bg-borde/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            {status === "authenticated" && (
              <li className="w-full">
                <div className="flex items-center justify-center px-4 py-3">
                  <LogoutButton />
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
