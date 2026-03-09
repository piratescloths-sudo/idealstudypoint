"use client";

import { useState } from "react";
import { GraduationCap, Send, CheckCircle2, FileText, Calendar, ShieldCheck } from "lucide-react";
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
    // Simulate API call
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-8 p-12 bg-white rounded-[2.5rem] shadow-xl border border-primary/10">
            <div className="inline-flex p-6 bg-secondary/10 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-secondary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Thank You!</h2>
            <p className="text-muted-foreground text-lg">
              Your application for admission has been successfully submitted. Our team will reach out to you within 24-48 business hours.
            </p>
            <Button asChild className="w-full h-12 rounded-xl text-lg">
              <a href="/">Back to Home</a>
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
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Content */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm">
                  <GraduationCap className="h-4 w-4" />
                  <span>Admissions Open for 2024-25</span>
                </div>
                <h1 className="text-5xl font-headline font-bold leading-tight">Start Your Academic Journey With Us</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of students who are building their future at EduFlow Academy. Our admission process is simple, transparent, and designed to find the best fit for your goals.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">1. Simple Application</h3>
                    <p className="text-muted-foreground">Fill out our online form with your basic details and course of interest.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2. Quick Interview</h3>
                    <p className="text-muted-foreground">Shortlisted candidates will be invited for a brief virtual or physical interaction.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">3. Secure Admission</h3>
                    <p className="text-muted-foreground">Receive your offer letter and secure your spot with an initial registration fee.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 md:p-12 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required placeholder="John Doe" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required placeholder="+1 (234) 567-890" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Selected Course</Label>
                      <Select required>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="business">Business Management</SelectItem>
                          <SelectItem value="design">Graphic Design</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Statement of Purpose / Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us why you want to join this course..."
                      className="min-h-[120px] rounded-xl"
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold gap-3" disabled={loading}>
                    {loading ? "Processing..." : (
                      <>
                        Submit Application <Send className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy.
                  </p>
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