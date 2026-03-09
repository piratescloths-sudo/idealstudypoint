"use client";

import Image from "next/image";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mockEvents = [
  {
    id: "1",
    title: "Global Tech Summit 2024",
    date: "Oct 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium, Campus A",
    description: "Join industry leaders from Google, Meta, and Microsoft as they discuss the future of AI and sustainable technology.",
    image: PlaceHolderImages.find(img => img.id === "event-workshop")?.imageUrl,
    type: "Workshop"
  },
  {
    id: "2",
    title: "Leadership in Modern Times",
    date: "Oct 22, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Hall B",
    description: "An interactive seminar focused on developing soft skills and leadership qualities for aspiring managers.",
    image: PlaceHolderImages.find(img => img.id === "event-seminar")?.imageUrl,
    type: "Seminar"
  },
  {
    id: "3",
    title: "Art & Design Showcase",
    date: "Nov 05, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Exhibition Gallery",
    description: "Witness the incredible talent of our design students as they present their capstone projects and digital art collections.",
    image: PlaceHolderImages.find(img => img.id === "course-art")?.imageUrl,
    type: "Exhibition"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EEF4F6]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/20 rounded-full text-slate-700 font-bold text-xs uppercase tracking-wider">
              <CalendarIcon className="h-3.5 w-3.5 text-primary" />
              <span>Campus Life \u0026 Beyond</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">Upcoming Events</h1>
            <p className="text-lg text-slate-500 font-medium">
              Stay connected with our vibrant community. From guest lectures to cultural fests, there&apos;s always something happening at EduFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {mockEvents.map((event) => (
              <Card key={event.id} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                <div className="relative h-72 w-full">
                  <Image
                    src={event.image || ""}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 flex flex-col items-center justify-center h-20 w-20 bg-white rounded-[1.5rem] shadow-2xl backdrop-blur-sm bg-white/90">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.date.split(' ')[0]}</span>
                    <span className="text-3xl font-headline font-black text-primary -mt-1">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg border border-white/20">
                    {event.type}
                  </div>
                </div>
                <CardContent className="p-10 space-y-6">
                  <h3 className="text-2xl font-headline font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                      <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                      <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-primary text-white font-bold text-lg shadow-xl shadow-slate-900/10 transition-all gap-3 group">
                    Register Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center gap-3">
            {[1, 2, 3].map(n => (
              <Button 
                key={n} 
                variant={n === 1 ? "default" : "outline"} 
                className={cn(
                  "w-12 h-12 p-0 rounded-2xl font-bold transition-all",
                  n === 1 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white border-none text-slate-400 hover:text-primary hover:bg-slate-50"
                )}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
