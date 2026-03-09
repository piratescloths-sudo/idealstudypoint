"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking, useAuth, useUser } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import Link from "next/link";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firestore = useFirestore();
  const auth = useAuth();
  const { user } = useUser();

  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);
  const { data: settings } = useDoc(settingsRef);

  // Ensure user is signed in anonymously to submit messages securely
  useEffect(() => {
    if (!user && auth) {
      signInAnonymously(auth).catch(console.error);
    }
  }, [user, auth]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) {
      toast({ variant: "destructive", title: "Connection Error", description: "Please wait for connection to stabilize." });
      return;
    }
    setLoading(true);

    const colRef = collection(firestore, 'contactMessages');
    const newDocId = doc(colRef).id;
    const messageRef = doc(firestore, 'contactMessages', newDocId);

    setDocumentNonBlocking(messageRef, {
      id: newDocId,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      submissionDate: new Date().toISOString()
    }, { merge: true });

    // Simulate a slight delay for better UX
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will reach out shortly.",
      });
    }, 800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-xl w-full text-center space-y-10 p-16 bg-white rounded-[3rem] shadow-2xl border border-white/20">
            <div className="relative inline-flex p-8 bg-emerald-50 rounded-full">
               <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-emerald-400 animate-pulse" />
              <CheckCircle2 className="h-20 w-20 text-emerald-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-slate-900">Message Delivered!</h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Thank you for reaching out. Your message has been sent to our admissions team. We usually respond within 24 hours.
              </p>
            </div>
            <Button asChild className="w-full h-16 rounded-2xl text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20">
              <Link href="/">Return to Home Page</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const officeHoursLines = (settings?.officeHours || "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed").split('\n');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center mb-20 space-y-6 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-widest mx-auto">
              <MessageSquare className="h-4 w-4" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tight leading-tight">
              {settings?.contactHeadline || "Connect With Us"}
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              {settings?.contactDescription || "Have questions about our campus or programs? We're here to help you navigate your academic future."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-7xl mx-auto">
            <div className="lg:col-span-1 space-y-8">
              {/* Map Section */}
              {settings?.googleMapEmbedUrl && (
                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[2rem] bg-white overflow-hidden group transition-all hover:-translate-y-1">
                  <div className="aspect-square w-full">
                    <iframe
                      src={settings.googleMapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                  </div>
                </Card>
              )}

              {[
                { icon: Mail, title: "Email Us", detail: settings?.mainEmail || "info@idealstudypoint.edu", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Phone, title: "Call Us", detail: settings?.mainPhone || "+1 (234) 567-890", color: "text-emerald-600", bg: "bg-emerald-50" },
                { icon: MapPin, title: "Visit Us", detail: settings?.address || "123 Education Ave, Knowledge City, ED 56789", color: "text-amber-600", bg: "bg-amber-50" }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[2rem] bg-white group transition-all hover:-translate-y-1">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className={`${item.bg} h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-none shadow-none rounded-[2rem] bg-slate-900 p-10 text-white overflow-hidden relative">
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                  <div className="space-y-2 text-slate-300 font-medium text-sm">
                    {officeHoursLines.map((line, idx) => (
                      <p key={idx} className="flex justify-between gap-4">
                        <span>{line.split(':')[0]}:</span> 
                        <span className="text-right">{line.split(':').slice(1).join(':')}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-white/5 rounded-full" />
              </Card>
            </div>

            <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden">
              <CardContent className="p-10 md:p-16">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</Label>
                      <Input id="firstName" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="Jane" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</Label>
                      <Input id="lastName" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Doe" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="jane@example.com" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</Label>
                      <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-slate-400">Subject</Label>
                    <Input id="subject" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Inquiry about Master in CS" className="h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Message</Label>
                    <Textarea id="message" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we help you?" className="min-h-[180px] rounded-[2rem] bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all p-6" />
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto h-16 px-16 rounded-2xl font-bold text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all gap-3" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                      <>
                        Send Message <Send className="h-5 w-5" />
                      </>
                    )}
                  </Button>
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
