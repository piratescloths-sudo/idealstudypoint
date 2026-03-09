import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-headline font-bold text-primary">EduFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering the next generation of leaders through quality education,
              innovation, and comprehensive skill development.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-muted rounded-full hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/admission" className="hover:text-primary transition-colors">Admission Process</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-headline font-semibold mb-6">Our Courses</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Computer Science</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Data Science</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Business Management</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Graphic Design</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Education Ave, Knowledge City, ED 56789</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@eduflow.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EduFlow Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}