"use client";

import { useState } from "react";
import { GraduationCap, Send, CheckCircle2, FileText, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function AdmissionPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast({
      title: "Application Received!",
      description: "We will review your application and contact you soon.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#EEF4F6]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-xl w-full text-center space-y-10 p-16 bg-white rounded-[3rem] shadow-2xl border border-white/20">
            <div className="relative inline-flex p-8 bg-secondary/10 rounded-full">
               <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-secondary animate-pulse" />
              <CheckCircle2 className="h-20 w-20 text-secondary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-slate-900">Application Success!</h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Your application for admission has been successfully received. A counselor will reach out to you within 24-48 business hours to discuss the next steps.
              </p>
            </div>
            <Button asChild className="w-full h-16 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
              <a href="/">Return to Home Page</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF4F6]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm border border-primary/10">
                  <GraduationCap className="h-5 w-5" />
                  <span className="uppercase tracking-widest text-[11px]">Admissions Open 2024-25</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-bold text-slate-900 leading-tight tracking-tight">
                  Start Your <br />
                  <span className="text-primary italic">Academic Legacy</span> <br />
                  With Us
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                  Join thousands of students building their future at EduVista Academy. Our admission process is designed to be as seamless as your learning experience.
                </p>
              </div>

              <div className="space-y-12">
                {[
                  { icon: FileText, title: "Simple Application", desc: "Fill out our streamlined online form with your basic academic history." },
                  { icon: Calendar, title: "Personal Interview", desc: "Connect with our faculty for a brief discussion about your goals." },
                  { icon: ShieldCheck, title: "Secure Enrollment", desc: "Receive your offer letter and join our global student network." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="h-16 w-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-500/5 group-hover:scale-110 transition-transform duration-300 border border-slate-50">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">{i + 1}. {item.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Card */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-1 md:p-2">
              <CardContent className="p-10 md:p-14 bg-white rounded-[2.8rem]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-headline font-bold text-slate-900">Application Form</h2>
                    <p className="text-slate-500 font-medium">Please fill in your details accurately to proceed.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</Label>
                      <Input id="name" required placeholder="Enter full name" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</Label>
                      <Input id="phone" type="tel" required placeholder="+1 (234) 567-890" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="course" className="text-xs font-bold uppercase tracking-widest text-slate-400">Selected Program</Label>
                      <Select required>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all">
                          <SelectValue placeholder="Choose your course" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="business">Business Management</SelectItem>
                          <SelectItem value="design">Graphic Design</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-400">Statement of Purpose</Label>
                    <Textarea
                      id="message"
                      placeholder="Share your academic goals and why you chose this program..."
                      className="min-h-[160px] rounded-3xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all p-5"
                    />
                  </div>

                  <Button type="submit" className="w-full h-16 rounded-2xl text-xl font-bold gap-4 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all" disabled={loading}>
                    {loading ? "Processing..." : (
                      <>
                        Submit Application <Send className="h-6 w-6" />
                      </>
                    )}
                  </Button>
                  
                  <div className="pt-4 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                      Protected by secure 256-bit SSL encryption.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
