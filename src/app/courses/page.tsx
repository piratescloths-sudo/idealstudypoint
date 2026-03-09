
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
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="text-center mb-16 space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-500/10 rounded-full text-indigo-600 font-bold text-xs">
              <span>Our Programs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 leading-tight">
              Featured Courses
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Explore our most popular programs designed to elevate your career
            </p>
          </div>

          {/* Search/Filter (Keeping logic but styling minimally) */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search for courses..."
                className="pl-12 h-12 rounded-xl bg-white border-slate-200 focus:ring-primary/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.slice(0, 4).map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  className={cn(
                    "rounded-xl h-12 px-6 font-bold",
                    category === cat 
                      ? "bg-primary text-white" 
                      : "bg-white text-slate-500 hover:bg-slate-50"
                  )}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 rounded-[2rem] bg-white">
                  <div className="relative h-64 w-full">
                    <Image
                      src={course.image || ""}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black px-4 py-1.5 rounded-full shadow-md">
                        {course.price}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-5">
                    <h3 className="text-xl font-headline font-bold text-slate-900 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-[13px] font-medium text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {course.instructor}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                    </div>
                    <Button asChild className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all">
                      <Link href="/admission">Enroll Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm">
              <BookOpen className="h-16 w-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-500 mb-8">Try broadening your search criteria.</p>
              <Button 
                variant="outline" 
                className="rounded-xl h-12 px-8 font-bold"
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
