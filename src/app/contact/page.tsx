"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you shortly.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF4F6]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-6 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-xs uppercase tracking-wider">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Support \u0026 Inquiries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tight leading-tight">Connect With Our Team</h1>
            <p className="text-xl text-slate-500 font-medium">
              Have questions about our programs or admissions? We're here to help you navigate your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10">
                <CardContent className="p-0 space-y-10">
                  <div className="flex gap-8 group">
                    <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-primary transition-colors">
                      <Mail className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-slate-900 mb-1">Email Us</h4>
                      <p className="text-slate-500 font-medium">info@eduvista.edu</p>
                      <p className="text-slate-500 font-medium">admissions@eduvista.edu</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-primary transition-colors">
                      <Phone className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-slate-900 mb-1">Call Us</h4>
                      <p className="text-slate-500 font-medium">+1 (234) 567-890</p>
                      <p className="text-slate-500 font-medium">+1 (234) 567-891</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-primary transition-colors">
                      <MapPin className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-slate-900 mb-1">Visit Us</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">123 Education Ave, Knowledge City, ED 56789</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group border-t border-slate-50 pt-10">
                    <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner">
                      <Clock className="h-8 w-8 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-slate-900 mb-1">Office Hours</h4>
                      <p className="text-slate-500 font-medium">Mon - Fri: 9:00 - 18:00</p>
                      <p className="text-slate-500 font-medium">Sat: 10:00 - 14:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Preview */}
              <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white h-72 border border-white/50">
                <div className="w-full h-full bg-slate-100 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map1/600/400')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-slate-900">
                        View Interactive Map <ArrowUpRight className="h-5 w-5 text-primary" />
                     </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] bg-white p-1 md:p-2">
              <CardContent className="p-10 md:p-16 bg-white rounded-[2.8rem]">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-12 bg-primary text-white rounded-xl flex items-center justify-center">
                    <Send className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-headline font-bold text-slate-900 leading-tight">Send a Message</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">First Name</Label>
                      <Input id="firstName" required className="h-16 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all text-base" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Last Name</Label>
                      <Input id="lastName" required className="h-16 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all text-base" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Email Address</Label>
                      <Input id="email" type="email" required className="h-16 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all text-base" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Phone Number</Label>
                      <Input id="phone" className="h-16 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all text-base" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Inquiry Subject</Label>
                    <Input id="subject" required className="h-16 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all text-base" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Your Message</Label>
                    <Textarea id="message" required className="min-h-[200px] rounded-[2rem] bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all p-6 text-base" />
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto h-16 px-16 rounded-2xl font-bold text-xl bg-slate-900 hover:bg-primary shadow-xl shadow-slate-900/10 transition-all gap-3" disabled={loading}>
                    {loading ? "Sending..." : (
                      <>
                        Send Message <Send className="h-6 w-6" />
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
