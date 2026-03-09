"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Wand2, Loader2, Calendar as CalendarIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateEventSummary } from "@/ai/flows/generate-event-summary";
import { toast } from "@/hooks/use-toast";

export default function AdminEventsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    summary: ""
  });

  const handleAiGenerate = async () => {
    if (!formData.title || !formData.description) {
      toast({ variant: "destructive", title: "Missing Data", description: "Please fill Title and Description first." });
      return;
    }
    setGenerating(true);
    try {
      const result = await generateEventSummary({
        title: formData.title,
        date: formData.date || "TBA",
        location: formData.location || "Online",
        description: formData.description
      });
      setFormData({ ...formData, summary: result.summary });
      toast({ title: "AI Magic Complete", description: "Event summary generated successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not generate summary." });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Manage Events</h1>
          <p className="text-muted-foreground">Announce and manage campus events and seminars.</p>
        </div>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="h-12 px-6 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20">
              <Plus className="h-5 w-5" /> Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">New Event Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Tech Summit 2024" />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Location</Label>
                <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Main Auditorium" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Full Description</Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Explain what the event is about in detail..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center">
                  <Label>Marketing Summary (Short)</Label>
                  <Button type="button" variant="ghost" size="sm" className="text-primary gap-1" onClick={handleAiGenerate} disabled={generating}>
                    {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
                    AI Summarize
                  </Button>
                </div>
                <Textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="min-h-[80px]" placeholder="A concise, engaging summary..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button className="gap-2 px-8" onClick={() => { toast({ title: "Event Added", description: "Successfully created event." }); setIsAdding(false); }}>
                <Save className="h-4 w-4" /> Save Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, title: "Global Tech Summit", date: "2024-10-15", loc: "Main Auditorium" },
              { id: 2, title: "Leadership Seminar", date: "2024-10-22", loc: "Hall B" },
            ].map((ev) => (
              <TableRow key={ev.id}>
                <TableCell className="font-semibold">{ev.title}</TableCell>
                <TableCell className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-primary" /> {ev.date}</TableCell>
                <TableCell>{ev.loc}</TableCell>
                <TableCell className="text-right space-x-2">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
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