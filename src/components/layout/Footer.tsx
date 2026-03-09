import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export function Footer() {
  return (
    <footer className="bg-[#0B0D17] text-slate-400 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image 
                  src={LOGO_URL} 
                  alt="Ideal Study Point Logo" 
                  fill 
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-headline font-bold text-white">Ideal Study Point</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Empowering learners worldwide with innovative programs and expert mentorship since 2001.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="h-9 w-9 bg-white/5 flex items-center justify-center rounded-lg hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 bg-white/5 flex items-center justify-center rounded-lg hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 bg-white/5 flex items-center justify-center rounded-lg hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 bg-white/5 flex items-center justify-center rounded-lg hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-bold text-white text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Courses</Link></li>
              <li><Link href="/admission" className="hover:text-indigo-400 transition-colors">Admission</Link></li>
              <li><Link href="/events" className="hover:text-indigo-400 transition-colors">Events</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-headline font-bold text-white text-lg mb-6 tracking-wide">Programs</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Computer Science</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Business Administration</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Digital Marketing</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Engineering</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Arts & Design</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-headline font-bold text-white text-lg mb-6 tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li className="flex gap-3">
                <div className="shrink-0 pt-1">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                </div>
                <span className="leading-relaxed">123 Education Lane, Knowledge City, KN 10001</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>info@idealstudypoint.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-xs font-medium tracking-wide">
          <p>© {new Date().getFullYear()} Ideal Study Point. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}