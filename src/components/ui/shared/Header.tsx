'use client';

import { Brain, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    href: "/historial",
    label: "History",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-5 left-5 right-5 z-50 bg-pinko shadow-sm px-4 py-2 sm:px-6 lg:px-8 rounded-xl mx-auto flex justify-between items-center lg:max-h-[48px]">
      <div className="flex items-center justify-start gap-3">
        <Brain className="w-5 h-5 text-borde" />
        <h1
          className="text-xl font-bold text-borde"
          style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Interview Simulator
        </h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center justify-center divide-x divide-borde/20">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-center px-4 py-2 text-borde transition-colors duration-200 hover:bg-borde/20 rounded-md hover:text-borde/80"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-borde p-2 rounded-md hover:bg-borde/20"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-pinko shadow-md rounded-b-xl mt-1 py-2 z-50">
          <ul className="flex flex-col items-center">
            {links.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className="flex items-center justify-center px-4 py-3 text-borde transition-colors duration-200 hover:bg-borde/20 hover:text-borde/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
