"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  UserCheck, 
  MessageSquare, 
  Settings, 
  Home, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Manage Courses", icon: BookOpen, href: "/admin/courses" },
  { name: "Manage Events", icon: Calendar, href: "/admin/events" },
  { name: "Admissions", icon: UserCheck, href: "/admin/admissions" },
  { name: "Messages", icon: MessageSquare, href: "/admin/messages" },
  { name: "Homepage Content", icon: Home, href: "/admin/content" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

const LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-white border-r min-h-screen flex flex-col shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-xl">
          <Image 
            src={LOGO_URL} 
            alt="Ideal Study Point Logo" 
            fill 
            className="object-cover"
          />
        </div>
        <span className="text-xl font-headline font-bold text-indigo-600">Ideal Study Point</span>
      </div>

      <nav className="flex-grow px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t">
        <Link 
          href="/admin/login"
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}
