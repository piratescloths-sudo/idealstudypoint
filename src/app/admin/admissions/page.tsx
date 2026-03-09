"use client";

import { Eye, CheckCircle2, XCircle, Clock, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function AdminAdmissionsPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  
  const inquiriesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'admissionInquiries'), orderBy('submissionDate', 'desc'));
  }, [firestore, user]);
  
  const { data: submissions, isLoading } = useCollection(inquiriesQuery);

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
              <TableHead>Course ID</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10"><Loader2 className="mx-auto animate-spin" /></TableCell>
              </TableRow>
            )}
            {!isLoading && (!submissions || submissions.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No admission inquiries found.</TableCell>
              </TableRow>
            )}
            {submissions?.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  <div className="font-semibold">{sub.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <Mail className="h-3 w-3" /> {sub.email} | <Phone className="h-3 w-3" /> {sub.phone}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-primary">{sub.selectedCourseId}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(sub.submissionDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-100" onClick={() => toast({title: "Processed", description: "Inquiry noted."})}>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
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
