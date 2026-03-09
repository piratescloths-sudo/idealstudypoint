"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
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
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Have questions about our programs or admissions? Our team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-lg rounded-[2rem] bg-white p-8">
                <CardContent className="p-0 space-y-8">
                  <div className="flex gap-6">
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Us</h4>
                      <p className="text-muted-foreground">info@eduflow.edu</p>
                      <p className="text-muted-foreground">admissions@eduflow.edu</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <p className="text-muted-foreground">+1 (234) 567-890</p>
                      <p className="text-muted-foreground">+1 (234) 567-891</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Visit Us</h4>
                      <p className="text-muted-foreground">123 Education Ave, Knowledge City, ED 56789</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Business Hours</h4>
                      <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sat: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Preview */}
              <Card className="border-none shadow-lg rounded-[2rem] overflow-hidden bg-white h-80">
                <div className="w-full h-full bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <p className="text-muted-foreground font-medium">Google Map View Placeholder</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 border-none shadow-xl rounded-[2.5rem] bg-white p-8 md:p-12">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-8">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-headline font-bold">Send us a Message</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">First Name</Label>
                      <Input id="firstName" required className="h-14 rounded-2xl bg-muted/50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Last Name</Label>
                      <Input id="lastName" required className="h-14 rounded-2xl bg-muted/50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Email Address</Label>
                      <Input id="email" type="email" required className="h-14 rounded-2xl bg-muted/50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Phone Number</Label>
                      <Input id="phone" className="h-14 rounded-2xl bg-muted/50 border-none focus:bg-white focus:ring-2 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Subject</Label>
                    <Input id="subject" required className="h-14 rounded-2xl bg-muted/50 border-none focus:bg-white focus:ring-2 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">How can we help?</Label>
                    <Textarea id="message" required className="min-h-[180px] rounded-2xl bg-muted/50 border-none focus:bg-white focus:ring-2 transition-all p-4" />
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto h-14 px-12 rounded-2xl font-bold text-lg gap-3" disabled={loading}>
                    {loading ? "Sending..." : (
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