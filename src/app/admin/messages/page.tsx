"use client";

import { MailOpen, Mail, Trash2, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

export default function AdminMessagesPage() {
  const messages = [
    { id: 1, sender: "Alice Brown", email: "alice@test.com", subject: "Inquiry about Scholarship", date: "2 hours ago", isRead: false },
    { id: 2, sender: "Robert Wilson", email: "robert@test.com", subject: "Campus Tour Request", date: "5 hours ago", isRead: true },
    { id: 3, sender: "Elena Petrova", email: "elena@test.com", subject: "Course Fee structure", date: "Yesterday", isRead: true },
  ];

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
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id} className={msg.isRead ? "opacity-75" : "bg-primary/5"}>
                <TableCell>
                  {msg.isRead ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{msg.sender}</div>
                  <div className="text-xs text-muted-foreground">{msg.email}</div>
                </TableCell>
                <TableCell className="font-medium">{msg.subject}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{msg.date}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => toast({ title: "Deleted", description: "Message moved to trash." })}>
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