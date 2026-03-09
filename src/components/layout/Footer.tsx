"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

const LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export function Footer() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);

  const { data: settings } = useDoc(settingsRef);

  const socials = [
    { Icon: Facebook, href: settings?.facebookUrl || "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: settings?.instagramUrl || "#" },
    { Icon: Linkedin, href: settings?.linkedinUrl || "#" },
  ];

  return (
    <footer className="bg-[#0B0D17] text-slate-400 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                <Image 
                  src={LOGO_URL} 
                  alt="Ideal Study Point Logo" 
                  fill 
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-headline font-bold text-white tracking-tight">
                {settings?.siteName || "Ideal Study Point"}
              </span>
            </Link>
            <p className="text-slate-400 text-[12px] leading-relaxed font-medium max-w-xs">
              Empowering learners worldwide with innovative programs and expert mentorship.
            </p>
            <div className="flex gap-2">
              {socials.map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target={social.href !== "#" ? "_blank" : undefined}
                  className="h-8 w-8 bg-white/5 flex items-center justify-center rounded-lg hover:bg-indigo-600 text-white transition-all border border-white/10"
                >
                  <social.Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-bold text-white text-sm mb-4 uppercase tracking-widest text-[10px]">Links</h4>
            <ul className="space-y-2 text-[12px] text-slate-400 font-medium">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Courses</Link></li>
              <li><Link href="/admission" className="hover:text-indigo-400 transition-colors">Admission</Link></li>
              <li><Link href="/events" className="hover:text-indigo-400 transition-colors">Events</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-headline font-bold text-white text-sm mb-4 uppercase tracking-widest text-[10px]">Programs</h4>
            <ul className="space-y-2 text-[12px] text-slate-400 font-medium">
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Computer Science</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Digital Marketing</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Engineering</Link></li>
              <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">Arts & Design</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-headline font-bold text-white text-sm mb-4 uppercase tracking-widest text-[10px]">Contact</h4>
            <ul className="space-y-3 text-[12px] text-slate-400 font-medium">
              <li className="flex gap-2">
                <MapPin className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span className="leading-tight">
                  {settings?.address || "123 Education Lane, Bhubaneswar, India"}
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>{settings?.mainPhone || "+91 123-456-7890"}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>{settings?.mainEmail || "info@idealstudypoint.edu"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center text-[10px] font-medium tracking-wide">
          <p>© {new Date().getFullYear()} {settings?.siteName || "Ideal Study Point"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
