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
    { label: "Courses", value: "120+", icon: BookOpen, color: "text-blue-600" },
    { label: "Students", value: "15K+", icon: Users, color: "text-blue-500" },
    { label: "Success Rate", value: "98%", icon: Award, color: "text-blue-600" },
    { label: "Countries", value: "50+", icon: Globe, color: "text-blue-400" },
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
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 overflow-hidden">
          {/* Background with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt="EduVista Campus"
              fill
              className="object-cover brightness-[0.4]"
              priority
              data-ai-hint="university campus"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#232936] via-[#232936]/80 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-medium text-sm">
                <span>🎓</span>
                <span>Welcome to EduVista Academy</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-tight">
                Shape Your Future <br /> with World-Class <br /> Education
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                Empowering learners with innovative programs, expert faculty, and a supportive community. Start your journey to success today.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-[#4F6EF7] hover:bg-[#3D5AD0] text-white">
                  <Link href="/admission">Enroll Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20 rounded-xl">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Stats Bar */}
          <div className="container mx-auto px-4 mt-20 relative z-20">
            <div className="bg-white rounded-[2rem] shadow-2xl grid grid-cols-2 md:grid-cols-4 p-8 md:p-10 gap-4 border border-slate-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center px-4 space-y-1 border-r last:border-0 border-slate-100">
                  <div className={cn("mb-2", stat.color)}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl md:text-4xl font-headline font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900">Explore Our Popular Programs</h2>
                <p className="text-lg text-slate-500 max-w-xl font-medium">Pick from a variety of professional courses taught by industry veterans.</p>
              </div>
              <Button asChild variant="ghost" className="text-[#4F6EF7] font-bold">
                <Link href="/courses">View All Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={course.img || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#4F6EF7] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Trending</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-headline font-bold text-slate-900 group-hover:text-[#4F6EF7] transition-colors line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-xl font-bold text-[#4F6EF7]">{course.price}</span>
                      <Button asChild size="sm" className="rounded-lg font-bold bg-slate-900 hover:bg-[#4F6EF7]">
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
