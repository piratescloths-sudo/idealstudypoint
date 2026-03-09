"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
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
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Upcoming Events</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay connected with our vibrant community. From guest lectures to cultural fests, there&apos;s always something happening at EduFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mockEvents.map((event) => (
              <Card key={event.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-[2rem] bg-white">
                <div className="relative h-64 w-full">
                  <Image
                    src={event.image || ""}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 flex flex-col items-center justify-center h-16 w-16 bg-white rounded-2xl shadow-xl">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{event.date.split(' ')[0]}</span>
                    <span className="text-xl font-headline font-extrabold text-primary">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {event.type}
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3">
                    {event.description}
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                    Register Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-16 flex justify-center gap-2">
            {[1, 2, 3].map(n => (
              <Button key={n} variant={n === 1 ? "default" : "outline"} className="w-10 h-10 p-0 rounded-lg">
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