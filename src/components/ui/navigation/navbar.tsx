"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { Menu, X, Search, Bell } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navigationItems = [
    { name: "Inicio", href: "/" },
    { name: "Especialidades", href: "/specialties" },
    { name: "Buscar Doctores", href: "/search" },
    { name: "Cómo Funciona", href: "/how-it-works" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              <span className="text-2xl">🩺</span>
              <span>Docentro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right side - Search, Notifications, User Menu */}
          <div className="flex items-center space-x-4">
            {/* Quick Search (desktop only) */}
            <div className="hidden lg:flex">
              <Link
                href="/search"
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm">Buscar</span>
              </Link>
            </div>

            {/* Notifications (only for logged in users) */}
            {session && (
              <button className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  <span className="sr-only">Nuevas notificaciones</span>
                </span>
              </button>
            )}

            {/* User Menu */}
            <UserMenu />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium rounded-md"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Search */}
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium rounded-md"
            >
              <Search className="w-5 h-5" />
              <span>Buscar Doctores</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
