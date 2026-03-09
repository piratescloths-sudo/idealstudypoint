"use client";

import Image from "next/image";
import { Calendar as CalendarIcon, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

export default function EventsPage() {
  const firestore = useFirestore();

  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'));
  }, [firestore]);
  
  const { data: events, isLoading } = useCollection(eventsQuery);

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
            {isLoading && (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
              </div>
            )}

            {!isLoading && events && events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => {
                  const dateObj = event.date ? new Date(event.date) : new Date();
                  const day = dateObj.getDate().toString().padStart(2, '0');
                  const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

                  return (
                    <Card key={event.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white">
                      <div className="relative h-52 w-full">
                        <Image
                          src={event.imageUrl || PlaceHolderImages[4].imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-md">Upcoming</span>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-lg flex flex-col items-center justify-center min-w-[55px]">
                          <span className="text-xl font-black text-indigo-600 leading-none">{day}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{month}</span>
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
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button asChild className="w-full h-10 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition-all gap-2 group mt-2">
                          <Link href="/contact">Register Now <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : !isLoading && (
               <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-50">
                <CalendarIcon className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">No upcoming events</h3>
                <p className="text-slate-500 mb-8">Check back soon for new workshops and seminars.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
