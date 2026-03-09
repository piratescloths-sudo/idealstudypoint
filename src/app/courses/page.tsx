
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, Clock, Users, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const categories = ["All", "Computer Science", "Business", "Marketing", "Arts", "Design"];

const mockCourses = [
  {
    id: "1",
    title: "Computer Science Fundamentals",
    instructor: "Dr. Sarah Chen",
    duration: "12 Weeks",
    students: "1,200+",
    category: "Computer Science",
    price: "$499",
    description: "Master the core concepts of computer science including algorithms, data structures, and software architecture basics.",
    image: PlaceHolderImages.find(img => img.id === "course-cs")?.imageUrl,
  },
  {
    id: "2",
    title: "Business Administration",
    instructor: "Prof. James Wilson",
    duration: "16 Weeks",
    students: "850+",
    category: "Business",
    price: "$599",
    description: "Develop essential business skills including management, marketing, and strategic planning for global success.",
    image: PlaceHolderImages.find(img => img.id === "course-business")?.imageUrl,
  },
  {
    id: "3",
    title: "Digital Marketing Mastery",
    instructor: "Emily Rodriguez",
    duration: "8 Weeks",
    students: "2,100+",
    category: "Marketing",
    price: "$349",
    description: "Learn SEO, social media marketing, content strategy, and analytics to grow any business in the digital age.",
    image: PlaceHolderImages.find(img => img.id === "event-workshop")?.imageUrl,
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        {/* Added more side space with larger padding on the container */}
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          
          {/* Centered Hero Content */}
          <div className="text-center mb-16 space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-500/10 rounded-full text-indigo-600 font-bold text-[10px] uppercase tracking-wider">
              <span>Our Programs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 leading-tight">
              Featured Courses
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Explore our most popular programs designed to elevate your career and expand your professional horizons.
            </p>
          </div>

          {/* Search/Filter - Centered and aligned */}
          <div className="flex flex-col md:flex-row gap-6 mb-16 max-w-4xl mx-auto items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search for courses..."
                className="pl-12 h-14 rounded-2xl bg-white border-slate-200 focus:ring-primary/20 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
              {categories.slice(0, 4).map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  className={cn(
                    "rounded-2xl h-14 px-8 font-bold transition-all",
                    category === cat 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                  )}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Aligned Course Grid with max-width for better centering */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden border-none shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] bg-white">
                  <div className="relative h-64 w-full">
                    <Image
                      src={course.image || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-indigo-600/95 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-sm font-black px-5 py-2 rounded-full shadow-xl">
                        {course.price}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-10 space-y-6">
                    <h3 className="text-2xl font-headline font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-5 text-[13px] font-bold text-slate-400 pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-indigo-600" />
                        {course.instructor}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-600" />
                        {course.duration}
                      </div>
                    </div>
                    <Button asChild className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-lg text-white shadow-xl shadow-indigo-600/20 transition-all mt-4">
                      <Link href="/admission">Enroll Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm max-w-6xl mx-auto border border-slate-50">
              <BookOpen className="h-16 w-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-500 mb-8">Try broadening your search criteria or selecting a different category.</p>
              <Button 
                variant="outline" 
                className="rounded-2xl h-14 px-10 font-bold"
                onClick={() => { setSearch(""); setCategory("All"); }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
