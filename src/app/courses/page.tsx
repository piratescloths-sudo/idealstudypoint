"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, Clock, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const firestore = useFirestore();

  const coursesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'courses'));
  }, [firestore]);
  
  const { data: courses, isLoading } = useCollection(coursesQuery);

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  }) || [];

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
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input 
                placeholder="Search for courses..." 
                className="pl-12 h-14 rounded-2xl bg-white border-slate-100 shadow-sm focus:ring-2 focus:ring-indigo-600/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Grid with reduced card sizes */}
          <div className="max-w-7xl mx-auto">
            {isLoading && (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
              </div>
            )}
            
            {!isLoading && filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={course.imageUrl || PlaceHolderImages[1].imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-indigo-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-full shadow-md">
                          Program
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-headline font-bold text-slate-900 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed">
                        {course.shortDescription}
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
            ) : !isLoading && (
              <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-50">
                <BookOpen className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500 mb-8">Try broadening your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="rounded-2xl h-14 px-10 font-bold"
                  onClick={() => { setSearch(""); }}
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
