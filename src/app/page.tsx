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
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt="EduVista Campus"
              fill
              className="object-cover brightness-[0.2]"
              priority
              data-ai-hint="university campus"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#232936]/80 via-[#232936] to-[#232936]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-400/10" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="max-w-4xl space-y-10">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white font-medium text-sm mx-auto shadow-2xl">
                <span>🎓</span>
                <span>Welcome to EduVista Academy</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-headline font-bold text-white leading-[1.1] tracking-tight">
                Shape Your Future <br /> with World-Class <br /> Education
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                Empowering learners with innovative programs, expert faculty, and a supportive community. Start your journey to success today.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <Button asChild size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95">
                  <Link href="/admission" className="flex items-center gap-2">Enroll Now <ArrowRight className="h-6 w-6" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl font-bold bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 rounded-2xl transition-all">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Stats Bar */}
          <div className="container mx-auto px-4 mt-24 relative z-20">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] grid grid-cols-2 md:grid-cols-4 p-10 md:p-14 gap-8 border border-white/50">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center px-4 space-y-2 border-r last:border-0 border-slate-100/50">
                  <div className={cn("mb-3", stat.color)}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl md:text-5xl font-headline font-black text-slate-900 tracking-tighter">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-32 bg-slate-50/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 rounded-full text-indigo-600 font-bold text-xs uppercase tracking-widest">
                  <BookOpen className="h-4 w-4" />
                  <span>Academic Excellence</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight">Explore Our Popular Programs</h2>
                <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">Pick from a variety of professional courses taught by industry veterans.</p>
              </div>
              <Button asChild variant="ghost" className="text-indigo-600 font-bold text-lg hover:bg-indigo-50 px-6 h-12 rounded-xl">
                <Link href="/courses" className="flex items-center gap-2">View All Courses <ArrowRight className="h-5 w-5" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredCourses.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-[3rem] bg-white">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={course.img || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg border border-white/20">Trending</span>
                    </div>
                  </div>
                  <CardContent className="p-10 space-y-6">
                    <h3 className="text-2xl font-headline font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-sm bg-slate-50 w-fit px-4 py-2 rounded-xl">
                      <Users className="h-4 w-4 text-indigo-600" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                      <span className="text-3xl font-black text-indigo-600 tracking-tighter">{course.price}</span>
                      <Button asChild className="rounded-2xl h-12 px-8 font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-all shadow-xl shadow-slate-900/10">
                        <Link href="/admission">Enroll</Link>
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
