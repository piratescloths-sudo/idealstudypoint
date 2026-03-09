"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Using real Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
      toast({ title: "Welcome back!", description: "Successfully logged into dashboard." });
    } catch (err: any) {
      console.error("Login error:", err);
      toast({ 
        variant: "destructive", 
        title: "Authentication Failed", 
        description: "Invalid credentials or account not found. Please ensure your admin account is set up in Firebase Console." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4F6] flex flex-col">
      <div className="p-6">
        <Button asChild variant="ghost" className="rounded-full gap-2">
          <Link href="/"><ArrowLeft className="h-4 w-4" /> Back to Website</Link>
        </Button>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6 space-y-4">
            <div className="relative h-20 w-20 mx-auto overflow-hidden rounded-[1.5rem] shadow-xl">
              <Image 
                src={LOGO_URL} 
                alt="Ideal Study Point Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-headline font-bold">Admin Portal</CardTitle>
              <CardDescription>Enter your credentials to manage Ideal Study Point content</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-10 bg-white">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 rounded-2xl bg-muted/30 border-none focus:bg-white focus:ring-2 transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 rounded-2xl bg-muted/30 border-none focus:bg-white focus:ring-2 transition-all"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold gap-3" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Dashboard"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Administrative access required for Ideal Study Point management.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
