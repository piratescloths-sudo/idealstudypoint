"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, Clock, User } from "lucide-react";
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
    category: "Business",
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
      
      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-24">
          
          {/* Centered Heading Section */}
          <div className="text-center mb-16 space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center px-5 py-2 bg-indigo-100 rounded-full text-indigo-600 font-bold text-[11px] tracking-wider">
              <span>Our Programs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 leading-tight">
              Featured Courses
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Explore our most popular programs designed to elevate your career
            </p>
          </div>

          {/* Grid with reduced card sizes */}
          <div className="max-w-7xl mx-auto">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={course.image || ""}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-indigo-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-full shadow-md">
                          {course.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                          {course.price}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-headline font-bold text-slate-900 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center gap-5 text-[12px] font-bold text-slate-400 pt-1">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-slate-300" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-slate-300" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <Button asChild className="w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white shadow-md transition-all">
                        <Link href="/admission">Enroll Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-50">
                <BookOpen className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500 mb-8">Try broadening your search criteria.</p>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
