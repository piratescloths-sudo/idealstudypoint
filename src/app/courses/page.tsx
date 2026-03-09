"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const categories = ["All", "Technology", "Business", "Arts", "Science", "Design"];

const mockCourses = [
  {
    id: "1",
    title: "Full Stack Web Development",
    instructor: "David Miller",
    duration: "12 Weeks",
    students: "1,200+",
    category: "Technology",
    description: "Learn to build modern web applications from scratch using the latest MERN stack technologies.",
    image: PlaceHolderImages.find(img => img.id === "course-cs")?.imageUrl,
  },
  {
    id: "2",
    title: "Strategic Business Management",
    instructor: "Sophia Reed",
    duration: "8 Weeks",
    students: "850+",
    category: "Business",
    description: "Master the art of leadership, decision making and strategic planning for modern organizations.",
    image: PlaceHolderImages.find(img => img.id === "course-business")?.imageUrl,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    instructor: "Mark Wilson",
    duration: "10 Weeks",
    students: "2,100+",
    category: "Design",
    description: "Create stunning user interfaces and intuitive user experiences using Figma and Adobe tools.",
    image: PlaceHolderImages.find(img => img.id === "course-art")?.imageUrl,
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
    <div className="min-h-screen flex flex-col bg-[#EEF4F6]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-xs uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Academic Programs</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">Discover Your Passion</h1>
            <p className="text-lg text-slate-500 font-medium">
              Our comprehensive range of courses is designed to provide you with the practical skills needed in today's job market.
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="border-none shadow-2xl shadow-indigo-500/5 rounded-[2.5rem] p-6 mb-16 bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search for courses..."
                  className="pl-12 h-14 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 transition-all text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant="ghost"
                    className={cn(
                      "rounded-xl px-6 h-11 font-bold transition-all",
                      category === cat 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                    )}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[2.5rem] bg-white">
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={course.image || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-2xl font-headline font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 font-medium line-clamp-2">
                      {course.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 text-sm font-bold text-slate-400">
                      <div className="flex items-center gap-2 uppercase tracking-wide">
                        <Clock className="h-4 w-4 text-primary" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2 uppercase tracking-wide">
                        <Users className="h-4 w-4 text-primary" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                      <div className="h-11 w-11 bg-slate-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center font-bold text-primary">
                        {course.instructor[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase">Instructor</span>
                        <span className="text-sm font-bold text-slate-700">{course.instructor}</span>
                      </div>
                      <Button asChild className="ml-auto rounded-xl bg-slate-900 hover:bg-primary font-bold shadow-lg shadow-slate-900/10">
                        <Link href="/admission">Enroll Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm">
              <div className="inline-flex p-8 bg-slate-50 rounded-full mb-8">
                <BookOpen className="h-16 w-16 text-slate-300" />
              </div>
              <h3 className="text-3xl font-headline font-bold text-slate-900 mb-4">No courses found</h3>
              <p className="text-slate-500 text-lg mb-8">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                variant="outline" 
                className="rounded-2xl h-12 px-8 font-bold text-primary border-primary hover:bg-primary hover:text-white"
                onClick={() => { setSearch(""); setCategory("All"); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
