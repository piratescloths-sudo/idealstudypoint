
"use client";

import { useState } from "react";
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
  LogOut,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Manage Courses", icon: BookOpen, href: "/admin/courses" },
  { name: "Manage Events", icon: Calendar, href: "/admin/events" },
  { name: "Testimonials", icon: Quote, href: "/admin/testimonials" },
  { name: "Admissions", icon: UserCheck, href: "/admin/admissions" },
  { name: "Messages", icon: MessageSquare, href: "/admin/messages" },
  { name: "Homepage Content", icon: Home, href: "/admin/content" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

const FALLBACK_LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const firestore = useFirestore();

  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);

  const { data: settings } = useDoc(settingsRef);

  const logoUrl = settings?.logoUrl || FALLBACK_LOGO_URL;

  return (
    <div className={cn(
      "bg-white border-r min-h-screen flex flex-col shrink-0 transition-all duration-300 relative",
      isCollapsed ? "w-20" : "w-72"
    )}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-10 h-8 w-8 rounded-full bg-white border shadow-md z-50 hover:bg-slate-50"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className={cn(
        "p-6 flex items-center gap-3 overflow-hidden",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-sm">
          <Image 
            src={logoUrl} 
            alt="Ideal Study Point Logo" 
            fill 
            className="object-cover"
          />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-headline font-bold text-indigo-600 truncate">
            {settings?.siteName || "Ideal Study Point"}
          </span>
        )}
      </div>

      <nav className="flex-grow px-3 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-2xl text-sm font-semibold transition-all group overflow-hidden",
                isCollapsed ? "justify-center p-3.5" : "gap-3 px-4 py-3.5",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              )}
              title={isCollapsed ? item.name : ""}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0", 
                isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
              )} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t">
        <Link 
          href="/admin/login"
          className={cn(
            "flex items-center rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all overflow-hidden",
            isCollapsed ? "justify-center p-3.5" : "gap-3 px-4 py-3.5"
          )}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
