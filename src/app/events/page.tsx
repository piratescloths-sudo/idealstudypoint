"use client";

import Image from "next/image";
import { Calendar as CalendarIcon, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const mockEvents = [
  {
    id: "1",
    title: "Career Fair 2026",
    date: "June 10th, 2026",
    time: "9:00 AM",
    location: "Student Union Hall",
    description: "Connect with top employers, explore internship opportunities, and attend resume workshops to kickstart your career.",
    day: "10",
    month: "JUN",
    image: PlaceHolderImages.find(img => img.id === "event-workshop")?.imageUrl,
    type: "Workshop"
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    date: "May 20th, 2026",
    time: "9:00 AM",
    location: "Innovation Center",
    description: "Annual technology conference featuring industry leaders, workshops, and networking opportunities for tech enthusiasts.",
    day: "20",
    month: "MAY",
    image: PlaceHolderImages.find(img => img.id === "course-cs")?.imageUrl,
    type: "Conference"
  },
  {
    id: "3",
    title: "Arts & Culture Festival",
    date: "May 5th, 2026",
    time: "2:00 PM",
    location: "Creative Arts Building",
    description: "Celebrate creativity with exhibitions, performances, and interactive art installations from local and international artists.",
    day: "05",
    month: "MAY",
    image: PlaceHolderImages.find(img => img.id === "course-art")?.imageUrl,
    type: "Exhibition"
  },
  {
    id: "4",
    title: "Leadership in Modern Times",
    date: "June 15th, 2026",
    time: "11:00 AM",
    location: "Main Hall B",
    description: "Developing leadership qualities for the next generation of business leaders and community organizers.",
    day: "15",
    month: "JUN",
    image: PlaceHolderImages.find(img => img.id === "event-seminar")?.imageUrl,
    type: "Seminar"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-24">
          
          {/* Centered Heading Section */}
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-[11px] uppercase tracking-wider mx-auto">
              <span>Events</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tight leading-tight">Upcoming Events</h1>
            <p className="text-xl text-slate-500 font-medium">
              Stay connected with our vibrant community.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockEvents.map((event) => (
                <Card key={event.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white">
                  <div className="relative h-52 w-full">
                    <Image
                      src={event.image || ""}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-md">Upcoming</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-lg flex flex-col items-center justify-center min-w-[55px]">
                      <span className="text-xl font-black text-indigo-600 leading-none">{event.day}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{event.month}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-lg font-headline font-bold text-indigo-600 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 pt-3 border-t border-slate-50 text-[11px] font-bold text-slate-400">
                      <div className="flex items-center gap-2.5">
                        <CalendarIcon className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    <Button className="w-full h-10 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition-all gap-2 group mt-2">
                      Register Now <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <Button 
                    key={n} 
                    variant={n === 1 ? "default" : "outline"} 
                    className={cn(
                      "w-10 h-10 p-0 rounded-xl font-bold transition-all",
                      n === 1 
                        ? "bg-indigo-600 text-white shadow-md border-none" 
                        : "bg-white border-slate-200 text-slate-400 hover:text-indigo-600"
                    )}
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
