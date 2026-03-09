"use client";

import { MailOpen, Mail, Trash2, Reply, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, deleteDocumentNonBlocking, useUser } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";

export default function AdminMessagesPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  
  const messagesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'contactMessages'), orderBy('submissionDate', 'desc'));
  }, [firestore, user]);
  
  const { data: messages, isLoading } = useCollection(messagesQuery);

  const handleDelete = (id: string) => {
    if (!firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'contactMessages', id));
    toast({ title: "Deleted", description: "Message removed." });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Contact Messages</h1>
        <p className="text-muted-foreground">Manage and respond to inquiries from potential students.</p>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10"><Loader2 className="mx-auto animate-spin" /></TableCell>
              </TableRow>
            )}
            {!isLoading && (!messages || messages.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No contact messages found.</TableCell>
              </TableRow>
            )}
            {messages?.map((msg) => (
              <TableRow key={msg.id} className="hover:bg-muted/50">
                <TableCell>
                  <Mail className="h-4 w-4 text-primary" />
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{msg.name}</div>
                  <div className="text-xs text-muted-foreground">{msg.email}</div>
                </TableCell>
                <TableCell className="font-medium max-w-xs truncate">{msg.message}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(msg.submissionDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(msg.id)}>
                    <Trash2 className="h-4 w-4" />
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
