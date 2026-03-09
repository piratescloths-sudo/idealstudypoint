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
      text: "EduVista transformed my career. The hands-on projects and mentorship gave me the confidence to land my dream job.",
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
        {/* Hero Section - Height increased to 90vh */}
        <section className="relative h-[90vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
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
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="max-w-4xl space-y-10">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-500/10 backdrop-blur-md rounded-full border border-indigo-500/20 text-indigo-300 font-semibold text-[11px] mx-auto shadow-2xl uppercase tracking-[0.2em]">
                <span>🎓</span>
                <span>Welcome to EduVista Academy</span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-headline font-bold text-white leading-[1.05] tracking-tight">
                Shape Your Future <br /> with World-Class <br /> Education
              </h1>
              
              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                Empowering learners with innovative programs, expert faculty, and a supportive community. Join thousands of students achieving their dreams today.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 pt-8">
                <Button asChild size="lg" className="h-20 px-14 text-xl font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-600/40 transition-all border-none">
                  <Link href="/admission" className="flex items-center gap-3">Enroll Now <ArrowRight className="h-6 w-6" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-20 px-14 text-xl font-bold bg-white/5 text-white border-white/10 backdrop-blur-md hover:bg-white/10 rounded-2xl transition-all">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Stats Bar - Bridging Hero and About */}
        <div className="relative z-20 -mt-24 container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] grid grid-cols-2 md:grid-cols-4 py-16 px-12 md:px-24 gap-12 border border-white/50">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4 space-y-3 border-r last:border-0 border-slate-100">
                <div className={cn("mb-1", stat.color)}>
                  <stat.icon className="h-8 w-8 opacity-90" />
                </div>
                <div className="text-3xl md:text-5xl font-headline font-bold text-slate-900 tracking-tighter">{stat.value}</div>
                <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About Us Section - Spacing increased to py-64 */}
        <section className="py-64 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="relative">
                <div className="relative h-[650px] w-full rounded-[5rem] overflow-hidden shadow-2xl">
                  <Image
                    src={aboutImg?.imageUrl || ""}
                    alt="Why Choose Us"
                    fill
                    className="object-cover"
                    data-ai-hint="students library"
                  />
                </div>
                <div className="absolute -bottom-16 -right-16 bg-indigo-600 text-white p-14 rounded-[4rem] shadow-2xl shadow-indigo-600/30 flex flex-col items-center justify-center text-center min-w-[280px]">
                  <span className="text-7xl font-headline font-bold">25+</span>
                  <span className="text-[12px] font-black uppercase tracking-[0.25em] mt-3">Years of Excellence</span>
                </div>
              </div>

              <div className="space-y-12">
                <div className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[14px] uppercase tracking-[0.25em]">
                  <span>About Us</span>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-headline font-bold text-slate-900 tracking-tight leading-[1.05]">
                  Why Choose <br /> EduVista Academy?
                </h2>
                
                <p className="text-2xl text-slate-500 font-medium leading-relaxed">
                  For over two decades, EduVista Academy has been at the forefront of education, blending traditional teaching methods with modern technology to shape the leaders of tomorrow.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
                  {["Expert Faculty", "Modern Campus", "Flexible Learning", "Career Support"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="h-4 w-4 rounded-full bg-indigo-600 shadow-xl shadow-indigo-600/20" />
                      <span className="font-bold text-slate-700 text-xl">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section - Spacing increased to py-64 */}
        <section className="py-64 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-28 gap-12">
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-[0.25em]">
                  <BookOpen className="h-5 w-5" />
                  <span>Academic Excellence</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-headline font-bold text-slate-900 tracking-tight">Our Programs</h2>
                <p className="text-xl text-slate-500 max-w-3xl font-medium leading-relaxed">Explore our most popular courses designed to elevate your professional career.</p>
              </div>
              <Button asChild variant="ghost" className="text-indigo-600 font-bold text-lg hover:bg-indigo-50 px-12 h-16 rounded-2xl gap-4 transition-all">
                <Link href="/courses" className="flex items-center gap-2">View All Courses <ArrowRight className="h-6 w-6" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {featuredCourses.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-[4rem] bg-white">
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={course.img || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-8 left-8">
                      <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full shadow-lg">Trending</span>
                    </div>
                  </div>
                  <CardContent className="p-12 space-y-8">
                    <h3 className="text-3xl font-headline font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-4 text-slate-500 font-bold text-[14px] bg-slate-50 w-fit px-6 py-3 rounded-2xl">
                      <Users className="h-5 w-5 text-indigo-600" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center pt-10 border-t border-slate-50">
                      <span className="text-4xl font-black text-indigo-600 tracking-tighter">{course.price}</span>
                      <Button asChild className="rounded-2xl h-14 px-10 text-base font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-all shadow-lg">
                        <Link href="/admission">Enroll Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section - Spacing increased to py-64 */}
        <section className="py-64 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
            <div className="text-center mb-32 space-y-8 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[14px] uppercase tracking-wider mx-auto">
                <span>Events</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-headline font-bold text-slate-900 leading-[1.1] tracking-tight">Upcoming Events</h2>
              <p className="text-2xl text-slate-500 font-medium">Stay connected with our vibrant campus life and community activities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {featuredEvents.map((event, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-[4rem] bg-white">
                  <div className="relative h-80 w-full">
                    <Image
                      src={event.img || ""}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-10 right-10">
                      <span className="bg-secondary text-white text-[12px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-lg">Upcoming</span>
                    </div>
                    <div className="absolute bottom-10 left-10 bg-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center justify-center min-w-[110px]">
                      <span className="text-4xl font-black text-indigo-600 leading-none">{event.day}</span>
                      <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-3">{event.month}</span>
                    </div>
                  </div>
                  <CardContent className="p-12 space-y-8">
                    <h3 className="text-3xl font-headline font-bold text-indigo-600 leading-tight">{event.title}</h3>
                    <div className="space-y-6 pt-8 border-t border-slate-50 text-[16px] font-bold text-slate-400">
                      <div className="flex items-center gap-5">
                        <Calendar className="h-6 w-6 text-indigo-400" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-5">
                        <MapPin className="h-6 w-6 text-indigo-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-24 flex justify-center">
              <Button asChild variant="outline" className="h-16 px-16 rounded-2xl font-bold border-slate-200 hover:bg-slate-50 gap-4 transition-all text-xl">
                <Link href="/events" className="flex items-center gap-2">View All Events <ArrowRight className="h-6 w-6" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Spacing increased to py-64 */}
        <section className="py-64 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-32 space-y-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[14px] uppercase tracking-[0.25em] mx-auto">
                <span>Testimonials</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-headline font-bold text-slate-900 tracking-tight leading-[1.1]">What Our <br /> Students Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
              {testimonials.map((t, idx) => (
                <Card key={idx} className="border-none shadow-2xl rounded-[4.5rem] bg-white p-14 flex flex-col justify-between h-full transition-transform hover:-translate-y-4 duration-300">
                  <div className="space-y-12">
                    <div className="h-16 w-16 flex items-center justify-center rounded-[2rem] bg-indigo-50/50">
                      <Quote className="h-10 w-10 text-indigo-200" />
                    </div>
                    <p className="text-2xl text-slate-600 font-medium leading-relaxed italic">&quot;{t.text}&quot;</p>
                  </div>
                  
                  <div className="pt-20 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-[2rem] bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-3xl">
                        {t.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-xl">{t.name}</span>
                        <span className="text-[12px] text-slate-400 font-black uppercase tracking-widest mt-1">{t.role}</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-6 w-6", i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
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
