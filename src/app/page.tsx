import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Users, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-bg");
  
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center pt-16">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt="EduFlow Campus"
              fill
              className="object-cover brightness-[0.4]"
              priority
              data-ai-hint="university campus"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/30 text-secondary font-medium">
                <Star className="h-4 w-4 fill-secondary" />
                <span>Empowering 50,000+ Students Worldwide</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                Unlock Your Potential with <span className="text-secondary">EduFlow</span>
              </h1>
              <p className="text-xl text-zinc-300 max-w-lg leading-relaxed">
                Join our world-class academic community. We offer cutting-edge courses designed by industry experts to help you achieve your career goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg rounded-2xl shadow-xl shadow-primary/20">
                  <Link href="/admission">Enroll Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 rounded-2xl">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl space-y-4">
                <h2 className="text-4xl font-headline font-bold">Explore Our Featured Courses</h2>
                <p className="text-muted-foreground">Pick from a variety of professional courses taught by industry veterans and academic leaders.</p>
              </div>
              <Button asChild variant="ghost" className="text-primary hover:text-primary font-semibold">
                <Link href="/courses" className="flex items-center gap-2">View All Courses <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course, idx) => (
                <Card key={idx} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl">
                  <div className="relative h-56 w-full">
                    <Image
                      src={course.img || ""}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">New</span>
                      <span className="text-lg font-bold text-primary">{course.price}</span>
                    </div>
                    <h3 className="text-xl font-headline font-bold line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> {course.instructor}
                    </p>
                    <Button asChild className="w-full rounded-xl">
                      <Link href="/admission">Enroll Today</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-primary text-white overflow-hidden">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Why Choose EduFlow Academy?</h2>
                <p className="text-lg text-primary-foreground/80 leading-relaxed">
                  With over two decades of excellence, EduFlow is committed to providing students with the best learning experience. We combine traditional values with modern technology to ensure our students are ready for the future.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Accredited Programs",
                    "Expert Faculty",
                    "Modern Infrastructure",
                    "Global Career Support",
                    "Flexible Learning",
                    "Research Excellence"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-secondary" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-2">
                  <div className="text-4xl font-bold text-secondary">98%</div>
                  <div className="text-sm uppercase tracking-wide">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-2">
                  <div className="text-4xl font-bold text-secondary">150+</div>
                  <div className="text-sm uppercase tracking-wide">Partner Universities</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-2">
                  <div className="text-4xl font-bold text-secondary">25+</div>
                  <div className="text-sm uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-2">
                  <div className="text-4xl font-bold text-secondary">12k+</div>
                  <div className="text-sm uppercase tracking-wide">Annual Graduates</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline font-bold mb-16">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Alex Thompson",
                  role: "Software Engineering Graduate",
                  text: "The curriculum at EduFlow is truly state-of-the-art. The hands-on projects helped me land my dream job at a top tech firm within weeks of graduation.",
                  img: PlaceHolderImages.find(img => img.id === "student-1")?.imageUrl
                },
                {
                  name: "Maria Garcia",
                  role: "MBA Student",
                  text: "The diversity and quality of instruction here are unmatched. I've built a global network of peers and mentors that will last a lifetime.",
                  img: PlaceHolderImages.find(img => img.id === "student-2")?.imageUrl
                }
              ].map((t, i) => (
                <Card key={i} className="p-8 rounded-3xl border-none shadow-lg text-left bg-card hover:translate-y-[-5px] transition-transform duration-300">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex gap-1 text-secondary">
                      {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-secondary" />)}
                    </div>
                    <p className="text-lg text-muted-foreground italic">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-4 pt-4">
                      <Image src={t.img || ""} alt={t.name} width={56} height={56} className="rounded-full ring-4 ring-primary/10" />
                      <div>
                        <div className="font-bold text-lg">{t.name}</div>
                        <div className="text-sm text-primary font-medium">{t.role}</div>
                      </div>
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