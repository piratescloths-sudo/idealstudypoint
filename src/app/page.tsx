"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Globe, Users, Quote, Star, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase, useDoc } from "@/firebase";
import { collection, query, limit, where, doc } from "firebase/firestore";

export default function Home() {
  const firestore = useFirestore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch Website Settings for Hero Background Slider and About Content
  const settingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);
  const { data: settings } = useDoc(settingsQuery);

  const heroImages = settings?.heroImages?.length > 0 
    ? settings.heroImages 
    : [PlaceHolderImages.find(img => img.id === "hero-bg")?.imageUrl || ""];

  // Auto-scrolling interval (2 seconds)
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroImages]);

  // Use dynamic about image from settings or fallback to placeholder
  const aboutImgUrl = settings?.aboutImage || PlaceHolderImages.find(img => img.id === "about-img")?.imageUrl || "";

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
    return query(collection(firestore, 'testimonials'), limit(3));
  }, [firestore]);
  const { data: testimonials, isLoading: testimonialsLoading } = useCollection(testimonialsQuery);
  
  const stats = [
    { label: "Courses", value: "120+", icon: BookOpen, color: "text-indigo-600" },
    { label: "Students", value: "15K+", icon: Users, color: "text-indigo-600" },
    { label: "Success Rate", value: "98%", icon: Award, color: "text-indigo-600" },
    { label: "Countries", value: "50+", icon: Globe, color: "text-indigo-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Auto-scrolling Slider */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImages.map((imgUrl, index) => (
              <div 
                key={index} 
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src={imgUrl}
                  alt={`Ideal Study Point Campus ${index + 1}`}
                  fill
                  className="object-cover brightness-[0.25]"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f29]/95 via-[#1a1f29]/90 to-[#1a1f29]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center pt-16">
            <div className="max-w-5xl space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-500/10 backdrop-blur-md rounded-full border border-indigo-500/20 text-indigo-300 font-semibold text-[11px] mx-auto shadow-2xl uppercase tracking-[0.2em]">
                <span>🎓</span>
                <span>Welcome to Ideal Study Point</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[1.1] tracking-tighter">
                Shape Your <br /> Future with Excellence
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium">
                {settings?.heroDescription || "Empowering learners with innovative programs, expert faculty, and a supportive community. Join thousands of students achieving their dreams today."}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 pt-8 translate-y-24 relative z-30">
                <Button asChild size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/40 transition-all border-none">
                  <Link href="/admission" className="flex items-center gap-3">Enroll Now <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg font-bold bg-white/5 text-white border-white/10 backdrop-blur-md hover:bg-white/10 rounded-2xl transition-all">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Stats Bar */}
        <div className="relative z-20 -mt-20 container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] grid grid-cols-2 md:grid-cols-4 py-12 px-8 md:px-16 gap-8 border border-white/50">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center space-y-2 border-r last:border-0 border-slate-100">
                <div className={cn("mb-1", stat.color)}>
                  <stat.icon className="h-6 w-6 opacity-90" />
                </div>
                <div className="text-3xl md:text-4xl font-headline font-bold text-slate-900 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="relative h-[450px] md:h-[500px] w-full rounded-[3rem] overflow-hidden shadow-xl">
                  <Image
                    src={aboutImgUrl}
                    alt="Why Choose Us"
                    fill
                    className="object-cover"
                    data-ai-hint="students library"
                  />
                </div>
                <div className="absolute -bottom-8 -right-6 bg-indigo-600 text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-600/30 flex flex-col items-center justify-center text-center min-w-[180px]">
                  <span className="text-4xl font-headline font-bold">25+</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-2">Years of Excellence</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                  <span>About Us</span>
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
                      <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-lg shadow-indigo-600/20" />
                      <span className="font-bold text-slate-700 text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                  <BookOpen className="h-4 w-4" />
                  <span>Academic Excellence</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">Our Programs</h2>
                <p className="text-base text-slate-500 max-w-2xl font-medium leading-relaxed">Explore our most popular courses designed to elevate your professional career.</p>
              </div>
              <Button asChild variant="ghost" className="text-indigo-600 font-bold text-base hover:bg-indigo-50 px-8 h-12 rounded-2xl gap-3 transition-all">
                <Link href="/courses" className="flex items-center gap-2">View All Courses <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coursesLoading && <Loader2 className="mx-auto animate-spin" />}
              {featuredCourses?.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={course.imageUrl || PlaceHolderImages[1].imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full shadow-lg">Trending</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-headline font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-[10px] bg-slate-50 w-fit px-3 py-1.5 rounded-xl">
                      <Users className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-xl font-black text-indigo-600 tracking-tighter">{course.duration}</span>
                      <Button asChild className="rounded-xl h-9 px-5 text-[10px] font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-all shadow-md">
                        <Link href="/admission">Enroll Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <div className="text-center mb-16 space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-wider mx-auto">
                <span>Events</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight tracking-tighter">Upcoming Events</h2>
              <p className="text-lg text-slate-500 font-medium">Stay connected with our vibrant campus life and community activities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventsLoading && <Loader2 className="mx-auto animate-spin" />}
              {featuredEvents?.map((event, idx) => {
                 const dateObj = event.date ? new Date(event.date) : new Date();
                 const day = dateObj.getDate().toString().padStart(2, '0');
                 const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                 
                 return (
                  <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.imageUrl || PlaceHolderImages[4].imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 right-6">
                        <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-[0.15em] px-4 py-2 rounded-full shadow-lg">Upcoming</span>
                      </div>
                      <div className="absolute bottom-6 left-6 bg-white rounded-xl p-3 shadow-xl flex flex-col items-center justify-center min-w-[50px]">
                        <span className="text-xl font-black text-indigo-600 leading-none">{day}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{month}</span>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-headline font-bold text-indigo-600 leading-tight">{event.title}</h3>
                      <div className="space-y-2 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-16 flex justify-center">
              <Button asChild variant="outline" className="h-14 px-10 rounded-2xl font-bold border-slate-200 hover:bg-slate-50 gap-4 transition-all text-lg">
                <Link href="/events" className="flex items-center gap-2">View All Events <ArrowRight className="h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-[0.2em] mx-auto">
                <span>Testimonials</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter leading-tight">What Our Students Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonialsLoading && <Loader2 className="mx-auto animate-spin" />}
              {testimonials?.map((t, idx) => (
                <Card key={idx} className="border-none shadow-xl rounded-[2.5rem] bg-white p-6 flex flex-col justify-between h-full transition-transform hover:-translate-y-2 duration-300">
                  <div className="space-y-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50/50">
                      <Quote className="h-5 w-5 text-indigo-200" />
                    </div>
                    <p className="text-base text-slate-600 font-medium leading-relaxed italic">&quot;{t.content}&quot;</p>
                  </div>
                  
                  <div className="pt-6 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base overflow-hidden">
                        {t.imageUrl ? <Image src={t.imageUrl} alt={t.authorName} width={40} height={40} /> : t.authorName[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{t.authorName}</span>
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{t.authorTitle}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-3 w-3 fill-amber-400 text-amber-400")} />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#5D5CFF] py-24 text-center px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 font-medium">
              Join thousands of students who have transformed their careers with Ideal Study Point.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-white text-indigo-600 hover:bg-white/90 text-xl font-bold gap-3 transition-all">
                <Link href="/admission">Apply Now <ArrowRight className="h-6 w-6" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}