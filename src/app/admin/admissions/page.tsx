"use client";

import { Eye, CheckCircle2, XCircle, Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

export default function AdminAdmissionsPage() {
  const submissions = [
    { id: 1, name: "John Smith", email: "john@email.com", phone: "+1 234 567", course: "Computer Science", date: "2024-09-20", status: "Pending" },
    { id: 2, name: "Maria Garcia", email: "maria@email.com", phone: "+1 987 654", course: "Business Mgmt", date: "2024-09-19", status: "Reviewing" },
    { id: 3, name: "Kevin Lee", email: "kevin@email.com", phone: "+1 444 333", course: "Graphic Design", date: "2024-09-18", status: "Accepted" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-emerald-100 text-emerald-700";
      case "Pending": return "bg-amber-100 text-amber-700";
      case "Reviewing": return "bg-blue-100 text-blue-700";
      case "Rejected": return "bg-rose-100 text-rose-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Admission Submissions</h1>
        <p className="text-muted-foreground">Review and process student enrollment requests.</p>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Course Applied</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  <div className="font-semibold">{sub.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <Mail className="h-3 w-3" /> {sub.email} | <Phone className="h-3 w-3" /> {sub.phone}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-primary">{sub.course}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{sub.date}</TableCell>
                <TableCell>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(sub.status)}`}>
                    {sub.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                    <Eye className="h-4 w-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-100" onClick={() => toast({title: "Accepted", description: "Status updated to Accepted."})}>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-rose-100" onClick={() => toast({variant: "destructive", title: "Rejected", description: "Submission rejected."})}>
                    <XCircle className="h-4 w-4 text-rose-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}