"use client";

import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  MessageCircle,
  Clock,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";

export default function AdminDashboard() {
  const firestore = useFirestore();

  const coursesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'courses')) : null, [firestore]);
  const inquiriesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'admissionInquiries'), orderBy('submissionDate', 'desc'), limit(5)) : null, [firestore]);
  const messagesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'contactMessages')) : null, [firestore]);
  const eventsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'events')) : null, [firestore]);

  const { data: courses } = useCollection(coursesQuery);
  const { data: recentInquiries, isLoading: loadingInquiries } = useCollection(inquiriesQuery);
  const { data: messages } = useCollection(messagesQuery);
  const { data: events } = useCollection(eventsQuery);

  const stats = [
    { label: "Active Courses", value: courses?.length || 0, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Events", value: events?.length || 0, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Admissions", value: recentInquiries?.length || 0, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Messages", value: messages?.length || 0, icon: MessageCircle, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Administrator. Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className={stat.bg + " p-4 rounded-2xl group-hover:scale-110 transition-transform"}>
                  <stat.icon className={stat.color + " h-6 w-6"} />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-headline font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-xl font-bold">Recent Admissions</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {loadingInquiries && <Loader2 className="animate-spin" />}
              {recentInquiries?.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs uppercase">
                      {sub.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">Applied for {sub.selectedCourseId}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">New</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-xl font-bold">Quick Activity</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-2 w-2 mt-2 bg-primary rounded-full shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Monitoring Course Enrollment</p>
                  <p className="text-xs text-muted-foreground">Live data active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
