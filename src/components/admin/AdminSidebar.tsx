"use client";

import Link from "next/link";
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
  GraduationCap
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-white border-r min-h-screen flex flex-col shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="p-2 bg-primary rounded-xl">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-headline font-bold text-primary">EduFlow</span>
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
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t">
        <Link 
          href="/admin/login"
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-destructive hover:bg-destructive/5 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}