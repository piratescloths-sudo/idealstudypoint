"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useUser } from "@/firebase";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Redirect to login if not authenticated and not already on the login page
    if (!isUserLoading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, isUserLoading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show a loading state while checking authentication
  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#EEF4F6] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="font-headline font-semibold text-slate-500 tracking-wide">Authenticating...</p>
      </div>
    );
  }

  // If not logged in, don't render the layout children (redirect will handle it)
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#EEF4F6]">
      <AdminSidebar />
      <main className="flex-grow p-8 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
