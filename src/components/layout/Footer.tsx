import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-headline font-bold text-white">IDEAL STUDY POINT</span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed font-medium">
              Empowering the next generation of leaders through quality education,
              innovation, and comprehensive skill development.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 bg-slate-800 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 bg-slate-800 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 bg-slate-800 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 bg-slate-800 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-bold text-white text-lg mb-8 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">All Courses</Link></li>
              <li><Link href="/admission" className="hover:text-indigo-400 transition-colors">Admission Process</Link></li>
              <li><Link href="/events" className="hover:text-indigo-400 transition-colors">Upcoming Events</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-headline font-bold text-white text-lg mb-8 tracking-wide">Top Programs</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Computer Science</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Data Science</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Business Management</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Graphic Design</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline font-bold text-white text-lg mb-8 tracking-wide">Contact Us</h4>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex gap-4">
                <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                </div>
                <span>123 Knowledge Ave, Ed-City, CA 90210</span>
              </li>
              <li className="flex gap-4">
                <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-indigo-400" />
                </div>
                <span>+1 (555) 000-8888</span>
              </li>
              <li className="flex gap-4">
                <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <span>hello@idealstudypoint.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-semibold tracking-widest uppercase">
          <p>© {new Date().getFullYear()} IDEAL STUDY POINT Academy. All rights reserved.</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-indigo-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-400">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
