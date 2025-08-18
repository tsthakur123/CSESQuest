"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

interface NavbarProps {
  username?: string; // optional
}

export default function Navbar({ username }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }); // redirect to login page
    router.push("/login"); // redirect to login page
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transform transition"
          >
            CSESQuest
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/random-problem"
              className="text-gray-800 font-medium hover:text-indigo-600 transition duration-300"
            >
              Random Problem
            </Link>
            <Link
              href="/progress"
              className="text-gray-800 font-medium hover:text-indigo-600 transition duration-300"
            >
              Progress
            </Link>

            {username ? (
              <>
                <span className="font-semibold text-indigo-600">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full border border-indigo-500 text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 font-semibold hover:scale-105 transform transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none hover:text-indigo-600 transition"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg py-4 space-y-3 px-6">
          <Link
            href="/random-problem"
            className="block text-gray-800 font-medium hover:text-indigo-600 transition duration-300"
          >
            Random Problem
          </Link>
          <Link
            href="/progress"
            className="block text-gray-800 font-medium hover:text-indigo-600 transition duration-300"
          >
            Progress
          </Link>
          {username ? (
            <>
              <span className="block font-semibold text-indigo-600">
                {username}
              </span>
              <Link
                href="/logout"
                className="block px-4 py-2 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 rounded-full border border-indigo-500 text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 font-semibold hover:scale-105 transform transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
