import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-bg");
  
  const stats = [
    { label: "Courses", value: "120+", icon: BookOpen, color: "text-indigo-600" },
    { label: "Students", value: "15K+", icon: Users, color: "text-indigo-600" },
    { label: "Success Rate", value: "98%", icon: Award, color: "text-indigo-600" },
    { label: "Countries", value: "50+", icon: Globe, color: "text-indigo-600" },
  ];

  const featuredCourses = [
    {
      title: "Mastering React & Next.js",
      instructor: "Dr. Sarah Johnson",
      price: "$49.99",
      img: PlaceHolderImages.find(img => img.id === "course-cs")?.imageUrl,
    },
    {
      title: "Business Leadership Excellence",
      instructor: "Prof. Michael Chen",
      price: "$39.99",
      img: PlaceHolderImages.find(img => img.id === "course-business")?.imageUrl,
    },
    {
      title: "Creative Digital Illustration",
      instructor: "Emily White",
      price: "$29.99",
      img: PlaceHolderImages.find(img => img.id === "course-art")?.imageUrl,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt="EduVista Campus"
              fill
              className="object-cover brightness-[0.25]"
              priority
              data-ai-hint="university campus"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f29]/95 via-[#1a1f29]/90 to-[#1a1f29]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(26,31,41,0.4)_100%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-indigo-500/10 backdrop-blur-md rounded-full border border-indigo-500/20 text-indigo-300 font-semibold text-[10px] mx-auto shadow-2xl uppercase tracking-[0.2em]">
                <span>🎓</span>
                <span>Welcome to EduVista Academy</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight text-center">
                Shape Your Future <br /> with World-Class <br /> Education
              </h1>
              
              <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-medium text-center">
                Empowering learners with innovative programs, expert faculty, and a supportive community. Start your journey to success today.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-10 text-base font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105 active:scale-95 border-none">
                  <Link href="/admission" className="flex items-center gap-3">Enroll Now <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base font-bold bg-white/5 text-white border-white/10 backdrop-blur-md hover:bg-white/10 rounded-2xl transition-all">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Stats Bar */}
          <div className="container mx-auto px-4 mt-16 relative z-20 max-w-5xl">
            <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] grid grid-cols-2 md:grid-cols-4 py-8 px-10 md:py-10 md:px-14 gap-8 border border-white/50">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center px-4 space-y-1 border-r last:border-0 border-slate-100/80">
                  <div className={cn("mb-2", stat.color)}>
                    <stat.icon className="h-6 w-6 opacity-80" />
                  </div>
                  <div className="text-2xl md:text-3xl font-headline font-bold text-slate-900 tracking-tighter">{stat.value}</div>
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[9px] uppercase tracking-[0.2em]">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Academic Excellence</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight">Explore Our Popular Programs</h2>
                <p className="text-lg text-slate-500 max-w-xl font-medium leading-relaxed">Pick from a variety of professional courses taught by industry veterans and academic experts.</p>
              </div>
              <Button asChild variant="ghost" className="text-indigo-600 font-bold text-base hover:bg-indigo-50 px-6 h-12 rounded-xl gap-2">
                <Link href="/courses" className="flex items-center gap-2">View All Courses <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white border border-slate-50">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={course.img || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg">Trending</span>
                    </div>
                  </div>
                  <CardContent className="p-10 space-y-6">
                    <h3 className="text-xl font-headline font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-xs bg-slate-50 w-fit px-4 py-2 rounded-xl">
                      <Users className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                      <span className="text-3xl font-black text-indigo-600 tracking-tighter">{course.price}</span>
                      <Button asChild className="rounded-[1.25rem] h-12 px-8 font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-all shadow-lg">
                        <Link href="/admission">Enroll Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
