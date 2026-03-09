import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B0D17] text-slate-400 py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-headline font-bold text-white">Ideal Study Point</span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed font-medium">
              Empowering learners worldwide with innovative programs and expert mentorship since 2001.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-11 w-11 bg-white/5 flex items-center justify-center rounded-xl hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-11 w-11 bg-white/5 flex items-center justify-center rounded-xl hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-11 w-11 bg-white/5 flex items-center justify-center rounded-xl hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-11 w-11 bg-white/5 flex items-center justify-center rounded-xl hover:bg-indigo-600 text-white transition-all border border-white/10">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-bold text-white text-xl mb-10 tracking-wide">Quick Links</h4>
            <ul className="space-y-5 text-slate-400 font-medium">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Courses</Link></li>
              <li><Link href="/admission" className="hover:text-indigo-400 transition-colors">Admission</Link></li>
              <li><Link href="/events" className="hover:text-indigo-400 transition-colors">Events</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-headline font-bold text-white text-xl mb-10 tracking-wide">Programs</h4>
            <ul className="space-y-5 text-slate-400 font-medium">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Computer Science</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Business Administration</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Digital Marketing</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Engineering</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Arts & Design</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-headline font-bold text-white text-xl mb-10 tracking-wide">Contact Info</h4>
            <ul className="space-y-8 text-slate-400 font-medium">
              <li className="flex gap-4">
                <div className="shrink-0 pt-1">
                  <MapPin className="h-5 w-5 text-indigo-500" />
                </div>
                <span className="leading-relaxed">123 Education Lane, Knowledge City, KN 10001</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>info@idealstudypoint.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-24 pt-10 text-center text-sm font-medium tracking-wide">
          <p>© {new Date().getFullYear()} Ideal Study Point. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
