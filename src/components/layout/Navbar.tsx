
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Admission", href: "/admission" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

const FALLBACK_LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const firestore = useFirestore();

  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);

  const { data: settings } = useDoc(settingsRef);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoUrl = settings?.logoUrl || FALLBACK_LOGO_URL;

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-4"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center">
        {/* Logo Section - Left balanced */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg transition-transform group-hover:scale-110">
              <Image 
                src={logoUrl} 
                alt="Ideal Study Point Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <span className={cn(
              "text-2xl font-headline font-bold tracking-tight transition-colors",
              !scrolled && pathname === "/" ? "text-white" : "text-slate-900"
            )}>
              {settings?.siteName || "Ideal Study Point"}
            </span>
          </Link>
        </div>

        {/* Desktop Menu Section - Centered */}
        <div className={cn(
          "hidden md:flex items-center gap-2 p-1 rounded-full border transition-all",
          scrolled 
            ? "bg-white/50 border-slate-100" 
            : "bg-white/10 backdrop-blur-md border-white/20"
        )}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold px-6 py-2.5 rounded-full transition-all",
                pathname === link.href 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : cn(
                      "hover:text-indigo-600",
                      !scrolled && pathname === "/" ? "text-slate-200 hover:text-white" : "text-slate-600"
                    )
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Trigger Section - Right balanced */}
        <div className="flex-1 flex justify-end">
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              !scrolled && pathname === "/" ? "text-white" : "text-slate-600"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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
        </div>
      </div>
    </nav>
  );
}
