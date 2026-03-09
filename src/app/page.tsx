
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  Award, 
  Globe, 
  Users, 
  Quote, 
  Star, 
  Calendar, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase, useDoc, setDocumentNonBlocking, useAuth, useUser } from "@/firebase";
import { collection, query, limit, where, doc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { toast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

/**
 * A helper component that triggers an animation when it enters the viewport.
 */
function RevealOnScroll({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-8 transition-none",
        isVisible && "animate-reveal",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user } = useUser();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);

  // Contact form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const settingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);
  const { data: settings } = useDoc(settingsQuery);

  // Ensure user is signed in anonymously
  useEffect(() => {
    if (!user && auth) {
      signInAnonymously(auth).catch(console.error);
    }
  }, [user, auth]);

  // Handle Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const heroImages = (settings?.heroImages?.filter((url: string) => url && url.trim() !== "")?.length > 0)
    ? settings.heroImages.filter((url: string) => url && url.trim() !== "")
    : [PlaceHolderImages.find(img => img.id === "hero-bg")?.imageUrl || ""];

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const aboutImgUrl = (settings?.aboutImage && settings.aboutImage.trim() !== "")
    ? settings.aboutImage
    : PlaceHolderImages.find(img => img.id === "about-img")?.imageUrl || "";

  const coursesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'courses'), where('isFeatured', '==', true), limit(3));
  }, [firestore]);
  const { data: featuredCourses, isLoading: coursesLoading } = useCollection(coursesQuery);

  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'), limit(3));
  }, [firestore]);
  const { data: featuredEvents, isLoading: eventsLoading } = useCollection(eventsQuery);

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'testimonials'), limit(6));
  }, [firestore]);
  const { data: testimonials, isLoading: testimonialsLoading } = useCollection(testimonialsQuery);
  
  const stats = [
    { label: settings?.stat1Label || "Courses", value: settings?.stat1Value || "120+", icon: BookOpen, color: "text-blue-600" },
    { label: settings?.stat2Label || "Students", value: settings?.stat2Value || "15K+", icon: Users, color: "text-blue-600" },
    { label: settings?.stat3Label || "Success Rate", value: settings?.stat3Value || "98%", icon: Award, color: "text-blue-600" },
    { label: settings?.stat4Label || "Countries", value: settings?.stat4Value || "50+", icon: Globe, color: "text-blue-600" },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
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

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will reach out shortly.",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      {/* Splash Screen Preloader */}
      {isPreloading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700">
          <div className="relative h-32 w-32 animate-pulse mb-4">
            <Image src={LOGO_URL} alt="Loading..." fill className="object-contain" priority />
          </div>
          <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      <Navbar />
      
      <main className={cn("flex-grow transition-opacity duration-1000", isPreloading ? "opacity-0" : "opacity-100")}>
        {/* Hero Section - 95vh Height */}
        <section className="relative h-[95vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImages.map((imgUrl, index) => (
              <div 
                key={index} 
                className={cn(
                  "absolute inset-0 transition-opacity duration-2000 ease-in-out",
                  index === currentImageIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
                )}
                style={{ transitionProperty: 'opacity, transform', transitionDuration: '2.5s' }}
              >
                <Image
                  src={imgUrl}
                  alt={`Ideal Study Point Campus ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint="university campus"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-[#000]/40 backdrop-blur-[1px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center pt-16 pb-24">
            <div className="max-w-5xl space-y-8">
              <div className="animate-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30 text-white font-semibold text-[11px] mx-auto shadow-2xl uppercase tracking-[0.2em]">
                  <Sparkles className="h-3 w-3 text-blue-300" />
                  <span>Excellence Since 2001</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl animate-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
                Shape Your <br /> Future with <span className="text-blue-400">Innovation</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-100 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg animate-reveal opacity-0" style={{ animationDelay: '0.6s' }}>
                {settings?.heroDescription || "Empowering learners with innovative programs, expert faculty, and a supportive community. Join thousands of students achieving their dreams today."}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section - Floating position */}
        <div className="relative z-20 -mt-24 container mx-auto px-4 max-w-6xl">
          <RevealOnScroll delay={0.1}>
            <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] grid grid-cols-2 md:grid-cols-4 py-12 px-8 md:px-16 gap-8 border border-white/50">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center space-y-2 border-r last:border-0 border-slate-100 hover:scale-105 transition-transform">
                  <div className={cn("mb-1", stat.color)}>
                    <stat.icon className="h-6 w-6 opacity-90" />
                  </div>
                  <div className="text-3xl md:text-4xl font-headline font-bold text-slate-900 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* About Section - Compact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <RevealOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                  <div className="relative h-[350px] md:h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
                    <Image
                      src={aboutImgUrl}
                      alt="Why Choose Us"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      data-ai-hint="students library"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-6 bg-blue-600 text-white p-8 rounded-[2rem] shadow-xl shadow-blue-600/30 flex flex-col items-center justify-center text-center min-w-[180px]">
                    <span className="text-4xl font-headline font-bold">25+</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-2 text-blue-100">Years of Excellence</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                    <span>About ISP</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter leading-tight">
                    {settings?.aboutTitle || "Why Choose Ideal Study Point?"}
                  </h2>
                  
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {settings?.aboutContent || "For over two decades, Ideal Study Point has been at the forefront of education, blending traditional teaching methods with modern technology to shape the leaders of tomorrow."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                    {["Expert Faculty", "Modern Campus", "Flexible Learning", "Career Support"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-lg shadow-blue-600/20" />
                        <span className="font-bold text-slate-700 text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-40 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                    <BookOpen className="h-4 w-4" />
                    <span>Academic Excellence</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">Our Programs</h2>
                </div>
                <Button asChild variant="ghost" className="text-blue-600 font-bold text-base hover:bg-blue-50 px-8 h-12 rounded-2xl gap-3 transition-all">
                  <Link href="/courses" className="flex items-center gap-2">View All Programs <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {coursesLoading && <div className="col-span-3 flex justify-center"><Loader2 className="animate-spin" /></div>}
                {featuredCourses?.map((course, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 0.1}>
                    <Card className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white h-full">
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={course.imageUrl || PlaceHolderImages[1].imageUrl}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-lg font-headline font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">{course.title}</h3>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                          <span className="text-xl font-black text-blue-600 tracking-tighter">{course.duration}</span>
                          <Button asChild className="rounded-xl h-9 px-5 text-[10px] font-bold bg-slate-900 hover:bg-blue-600 text-white shadow-md">
                            <Link href="/admission">Enroll Now</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-40 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <RevealOnScroll>
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-widest mx-auto">
                  <Calendar className="h-4 w-4" />
                  <span>Upcoming Events</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">Campus Highlights</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {eventsLoading && <div className="col-span-3 flex justify-center"><Loader2 className="animate-spin" /></div>}
                {featuredEvents?.map((event, idx) => (
                  <RevealOnScroll key={idx} delay={idx * 0.1}>
                    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white border border-slate-50 h-full">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image src={event.imageUrl || PlaceHolderImages[4].imageUrl} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 bg-white rounded-xl p-2 shadow-lg text-center min-w-[50px]">
                          <div className="text-lg font-black text-blue-600 leading-none">{event.date ? new Date(event.date).getDate() : '??'}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">{event.date ? new Date(event.date).toLocaleString('default', { month: 'short' }) : 'TBA'}</div>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-lg font-headline font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{event.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{event.summary || event.description}</p>
                        <Button asChild variant="link" className="p-0 h-auto text-blue-600 font-bold text-xs gap-2 mt-2">
                          <Link href="/events">Learn More <ArrowRight className="h-3 w-3" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-40 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl opacity-50" />
          
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                    <Quote className="h-4 w-4" />
                    <span>Success Stories</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter leading-tight">
                    Hear From Our <br className="hidden md:block" /> <span className="text-blue-600">Alumni</span>
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end text-right">
                    <div className="text-2xl font-black text-slate-900">4.9/5</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Student Rating</div>
                  </div>
                  <div className="h-12 w-px bg-slate-200 hidden md:block mx-4" />
                  <p className="text-slate-500 font-medium max-w-xs text-center md:text-left">
                    Join a community of thousands who transformed their lives at Ideal Study Point.
                  </p>
                </div>
              </div>

              <div>
                <Carousel 
                  opts={{ align: "start", loop: true }} 
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {testimonialsLoading && (
                      <div className="flex justify-center w-full py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                      </div>
                    )}
                    {testimonials?.map((t, idx) => (
                      <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="h-full border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                          <CardContent className="p-10 flex flex-col h-full space-y-8">
                            <div className="flex justify-between items-start">
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={cn("h-4 w-4", i < (t.rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                                ))}
                              </div>
                              <Quote className="h-10 w-10 text-blue-50 opacity-50 group-hover:text-blue-100 transition-colors" />
                            </div>
                            
                            <p className="text-lg text-slate-600 font-medium italic leading-relaxed flex-grow">
                              "{t.content}"
                            </p>

                            <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                              <div className="h-14 w-14 rounded-2xl overflow-hidden relative shadow-lg">
                                <Image 
                                  src={t.imageUrl || PlaceHolderImages[6].imageUrl} 
                                  alt={t.authorName} 
                                  fill 
                                  className="object-cover" 
                                />
                              </div>
                              <div className="space-y-1">
                                <div className="font-headline font-bold text-slate-900 text-lg leading-none">{t.authorName}</div>
                                <div className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{t.authorTitle}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center md:justify-end gap-3 mt-12">
                    <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-2xl border-none bg-white shadow-xl hover:bg-blue-600 hover:text-white transition-all" />
                    <CarouselNext className="static translate-y-0 h-14 w-14 rounded-2xl border-none bg-white shadow-xl hover:bg-blue-600 hover:text-white transition-all" />
                  </div>
                </Carousel>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-40 text-center px-6">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-blue-100 font-medium">
                Join thousands of students who have transformed their careers with Ideal Study Point.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-white text-blue-600 hover:bg-slate-100 text-xl font-bold gap-3 transition-all">
                  <Link href="/admission">Apply Today <ArrowRight className="h-6 w-6" /></Link>
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Contact Section */}
        <section className="pt-40 pb-56 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <RevealOnScroll>
              <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-[11px] uppercase tracking-widest mx-auto">
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact Us</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter leading-tight">
                  {settings?.contactHeadline || "Connect With Us"}
                </h2>
                <p className="text-lg text-slate-500 font-medium">
                  {settings?.contactDescription || "Have questions about our campus or programs? We're here to help you navigate your academic future."}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                <div className="lg:col-span-1 space-y-6">
                  {settings?.googleMapEmbedUrl && (
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[2rem] bg-white overflow-hidden group transition-all hover:-translate-y-1">
                      <div className="aspect-square w-full bg-slate-50">
                        <iframe
                          src={settings.googleMapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                      </div>
                    </Card>
                  )}

                  {[
                    { icon: Mail, title: "Email Us", detail: settings?.mainEmail || "info@idealstudypoint.edu", color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: Phone, title: "Call Us", detail: settings?.mainPhone || "+91 123-456-7890", color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: MapPin, title: "Visit Us", detail: settings?.address || "123 Education Ave, Knowledge City, ED 56789", color: "text-blue-600", bg: "bg-blue-50" }
                  ].map((item, i) => (
                    <Card key={i} className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-3xl bg-white group transition-all hover:-translate-y-1">
                      <CardContent className="p-6 flex items-center gap-5">
                        <div className={`${item.bg} h-12 w-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                          <p className="text-slate-500 font-medium text-xs leading-relaxed">{item.detail}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="lg:col-span-2 border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden border border-slate-50">
                  <CardContent className="p-8 md:p-12">
                    {submitted ? (
                      <div className="text-center space-y-6 py-10">
                        <div className="relative inline-flex p-6 bg-blue-50 rounded-full">
                          <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-blue-400 animate-pulse" />
                          <CheckCircle2 className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-headline font-bold text-slate-900">Message Sent!</h3>
                        <p className="text-slate-500 font-medium">We've received your inquiry and will reach out shortly.</p>
                        <Button variant="outline" className="rounded-xl px-8" onClick={() => setSubmitted(false)}>Send another message</Button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</Label>
                            <Input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="First Name" className="h-12 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</Label>
                            <Input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Last Name" className="h-12 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</Label>
                            <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" className="h-12 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone</Label>
                            <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone" className="h-12 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Subject</Label>
                          <Input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Subject" className="h-12 rounded-xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</Label>
                          <Textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Message" className="min-h-[120px] rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all p-4" />
                        </div>
                        <Button type="submit" size="lg" className="w-full h-14 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all gap-3" disabled={loading}>
                          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                            <>
                              Send Inquiry <Send className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
