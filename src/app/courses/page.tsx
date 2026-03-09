"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, BookOpen, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
  // Add more as needed
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Discover Your Passion</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive range of courses is designed to provide you with the practical skills needed in today's job market.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 bg-white p-6 rounded-3xl shadow-sm">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for courses..."
                className="pl-10 h-12 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className="rounded-full px-6"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all rounded-3xl bg-card">
                  <div className="relative h-56 w-full">
                    <Image
                      src={course.image || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.category}
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="h-10 w-10 bg-muted rounded-full overflow-hidden">
                        <Image src={`https://placehold.co/100x100?text=${course.instructor[0]}`} alt={course.instructor} width={40} height={40} />
                      </div>
                      <span className="text-sm font-semibold">{course.instructor}</span>
                      <Button asChild className="ml-auto rounded-xl">
                        <Link href="/admission">Enroll Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex p-6 bg-muted rounded-full mb-6">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              <Button variant="link" onClick={() => { setSearch(""); setCategory("All"); }}>
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