import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  MessageCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "12,450", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Courses", value: "48", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Admissions", value: "156", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Unread Messages", value: "24", icon: MessageCircle, color: "text-rose-600", bg: "bg-rose-50" },
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
                <div className="flex items-center text-emerald-500 text-xs font-bold">
                  +12% <ArrowUpRight className="h-3 w-3" />
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
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">Applied for Computer Science</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">Pending</span>
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
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex gap-4">
                  <div className="h-2 w-2 mt-2 bg-primary rounded-full shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New course &quot;Digital Marketing&quot; published</p>
                    <p className="text-xs text-muted-foreground">Today at 10:45 AM</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}