"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Admission", href: "/admission" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.03)] py-3"
          : "bg-white py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-headline font-bold text-slate-900 tracking-tight">
            EduVista
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50/50 p-1 rounded-full border border-slate-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold px-6 py-2.5 rounded-full transition-all",
                pathname === link.href 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "text-slate-500 hover:text-indigo-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 px-6 h-11 border-none shadow-lg shadow-indigo-500/10 transition-all hover:translate-y-[-2px]">
            <Link href="/admin/login">
              <LogIn className="h-4 w-4" />
              Admin Panel
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[80px] bg-white z-40 md:hidden transition-transform duration-300 transform border-t",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl font-bold",
                pathname === link.href ? "text-indigo-600" : "text-slate-400"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="mt-4 bg-indigo-600 h-14 text-lg rounded-2xl">
            <Link href="/admin/login" onClick={() => setIsOpen(false)}>
              Admin Panel
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
