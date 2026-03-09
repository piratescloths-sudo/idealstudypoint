import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Globe, Users, Quote, Star, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-bg");
  const aboutImg = PlaceHolderImages.find(img => img.id === "about-img");
  
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

  const featuredEvents = [
    {
      title: "Career Fair 2026",
      date: "June 10th, 2026",
      time: "9:00 AM",
      location: "Student Union Hall",
      description: "Connect with top employers, explore internship opportunities, and attend resume workshops.",
      day: "10",
      month: "JUN",
      img: PlaceHolderImages.find(img => img.id === "event-workshop")?.imageUrl,
    },
    {
      title: "Tech Innovation Summit",
      date: "May 20th, 2026",
      time: "9:00 AM",
      location: "Innovation Center",
      description: "Annual technology conference featuring industry leaders, workshops, and networking opportunities.",
      day: "20",
      month: "MAY",
      img: PlaceHolderImages.find(img => img.id === "course-cs")?.imageUrl,
    },
    {
      title: "Arts & Culture Festival",
      date: "May 5th, 2026",
      time: "2:00 PM",
      location: "Creative Arts Building",
      description: "Celebrate creativity with exhibitions, performances, and interactive art installations.",
      day: "05",
      month: "MAY",
      img: PlaceHolderImages.find(img => img.id === "course-art")?.imageUrl,
    },
  ];

  const testimonials = [
    {
      text: "The faculty here are incredible. They bring real-world experience into the classroom, making every lecture engaging and practical.",
      name: "Michael Chang",
      role: "Business Administration Student",
      initial: "M",
      rating: 5
    },
    {
      text: "I went from knowing nothing about marketing to running campaigns for major brands. The curriculum is perfectly structured.",
      name: "Priya Sharma",
      role: "Digital Marketing Graduate",
      initial: "P",
      rating: 4
    },
    {
      text: "Ideal Study Point transformed my career. The hands-on projects and mentorship gave me the confidence to land my dream job.",
      name: "Jessica Thompson",
      role: "Computer Science Graduate",
      initial: "J",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt="Ideal Study Point Campus"
              fill
              className="object-cover brightness-[0.25]"
              priority
              data-ai-hint="university campus"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f29]/95 via-[#1a1f29]/90 to-[#1a1f29]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center pt-16">
            <div className="max-w-5xl space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-500/10 backdrop-blur-md rounded-full border border-indigo-500/20 text-indigo-300 font-semibold text-[11px] mx-auto shadow-2xl uppercase tracking-[0.2em]">
                <span>🎓</span>
                <span>Welcome to Ideal Study Point Academy</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[1.1] tracking-tighter">
                Shape Your <br /> Future with Excellence
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium">
                Empowering learners with innovative programs, expert faculty, and a supportive community. Join thousands of students achieving their dreams today.
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
                    src={aboutImg?.imageUrl || ""}
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
                  Why Choose <br /> Ideal Study Point?
                </h2>
                
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  For over two decades, Ideal Study Point Academy has been at the forefront of education, blending traditional teaching methods with modern technology to shape the leaders of tomorrow.
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
              {featuredCourses.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={course.img || ""}
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
                      <span className="text-xl font-black text-indigo-600 tracking-tighter">{course.price}</span>
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
              {featuredEvents.map((event, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.img || ""}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6">
                      <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-[0.15em] px-4 py-2 rounded-full shadow-lg">Upcoming</span>
                    </div>
                    <div className="absolute bottom-6 left-6 bg-white rounded-xl p-3 shadow-xl flex flex-col items-center justify-center min-w-[50px]">
                      <span className="text-xl font-black text-indigo-600 leading-none">{event.day}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{event.month}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-headline font-bold text-indigo-600 leading-tight">{event.title}</h3>
                    <div className="space-y-2 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              {testimonials.map((t, idx) => (
                <Card key={idx} className="border-none shadow-xl rounded-[2.5rem] bg-white p-6 flex flex-col justify-between h-full transition-transform hover:-translate-y-2 duration-300">
                  <div className="space-y-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50/50">
                      <Quote className="h-5 w-5 text-indigo-200" />
                    </div>
                    <p className="text-base text-slate-600 font-medium leading-relaxed italic">&quot;{t.text}&quot;</p>
                  </div>
                  
                  <div className="pt-6 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base">
                        {t.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{t.role}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-3 w-3", i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                      ))}
                    </div>
                  </div>
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
