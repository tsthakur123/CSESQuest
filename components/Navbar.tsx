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
    <nav className="fixed w-full z-50 bg-[#161b22]/95 backdrop-blur-md border-b border-[#30363d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#58a6ff] hover:text-[#4c9eff] transition-colors"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            CSESQuest
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/random-problem"
              className="text-[#8b949e] hover:text-[#f0f6fc] transition-colors font-medium"
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              Random Problem
            </Link>
            <Link
              href="/progress"
              className="text-[#8b949e] hover:text-[#f0f6fc] transition-colors font-medium"
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              Progress
            </Link>

            {username ? (
              <>
                <span className="font-semibold text-[#3fb950]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-[#f78166] border-[#f78166] hover:bg-[#f78166] hover:text-[#f0f6fc]"
                  style={{ fontFamily: 'Oxanium, sans-serif' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn-secondary"
                  style={{ fontFamily: 'Oxanium, sans-serif' }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary"
                  style={{ fontFamily: 'Oxanium, sans-serif' }}
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
              className="text-[#8b949e] focus:outline-none hover:text-[#f0f6fc] transition-colors p-2"
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
        <div className="md:hidden bg-[#161b22]/95 backdrop-blur-md border-b border-[#30363d] py-4 space-y-3 px-6">
          <Link
            href="/random-problem"
            className="block text-[#8b949e] hover:text-[#f0f6fc] transition-colors font-medium"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            Random Problem
          </Link>
          <Link
            href="/progress"
            className="block text-[#8b949e] hover:text-[#f0f6fc] transition-colors font-medium"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            Progress
          </Link>
          {username ? (
            <>
              <span className="block font-semibold text-[#3fb950]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="block btn-secondary text-[#f78166] border-[#f78166] hover:bg-[#f78166] hover:text-[#f0f6fc]"
                style={{ fontFamily: 'Oxanium, sans-serif' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block btn-secondary"
                style={{ fontFamily: 'Oxanium, sans-serif' }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block btn-primary"
                style={{ fontFamily: 'Oxanium, sans-serif' }}
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
