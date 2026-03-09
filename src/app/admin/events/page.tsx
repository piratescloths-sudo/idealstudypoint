"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Wand2, Loader2, Calendar as CalendarIcon, Save, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateEventSummary } from "@/ai/flows/generate-event-summary";
import { toast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, doc } from "firebase/firestore";

export default function AdminEventsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    summary: "",
    imageUrl: ""
  });

  const firestore = useFirestore();
  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'));
  }, [firestore]);
  const { data: events, isLoading } = useCollection(eventsQuery);

  const resetForm = () => {
    setFormData({ title: "", date: "", location: "", description: "", summary: "", imageUrl: "" });
    setEditingEventId(null);
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (event: any) => {
    setFormData({
      title: event.title || "",
      date: event.date ? event.date.split('T')[0] : "",
      location: event.location || "",
      description: event.description || "",
      summary: event.summary || "",
      imageUrl: event.imageUrl || ""
    });
    setEditingEventId(event.id);
    setIsDialogOpen(true);
  };

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

  const handleSave = () => {
    if (!firestore) return;
    
    const isNew = !editingEventId;
    const eventId = editingEventId || doc(collection(firestore, 'events')).id;
    const eventRef = doc(firestore, 'events', eventId);

    const payload = {
      id: eventId,
      title: formData.title,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      summary: formData.summary,
      imageUrl: formData.imageUrl || "https://picsum.photos/seed/" + eventId + "/800/600",
      updatedAt: new Date().toISOString(),
    };

    if (isNew) {
      (payload as any).createdAt = new Date().toISOString();
    }

    setDocumentNonBlocking(eventRef, payload, { merge: true });

    setIsDialogOpen(false);
    resetForm();
    toast({ title: "Event Saved", description: `Successfully ${isNew ? 'created' : 'updated'} event.` });
  };

  const handleDelete = (eventId: string) => {
    if (!firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'events', eventId));
    toast({ title: "Deleted", description: "Event removed." });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-slate-900">Manage Events</h1>
          <p className="text-muted-foreground">Announce and manage campus events and seminars.</p>
        </div>
        <Button onClick={handleOpenAddDialog} className="h-12 px-6 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20">
          <Plus className="h-5 w-5" /> Add New Event
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold">Event Title</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10"><Loader2 className="mx-auto animate-spin" /></TableCell>
              </TableRow>
            )}
            {!isLoading && (!events || events.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No events found.</TableCell>
              </TableRow>
            )}
            {events?.map((ev) => (
              <TableRow key={ev.id} className="hover:bg-slate-50/50">
                <TableCell className="font-semibold text-slate-900">{ev.title}</TableCell>
                <TableCell className="text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3.5 w-3.5 text-indigo-500" />
                    {new Date(ev.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">{ev.location || "Online"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50" onClick={() => handleOpenEditDialog(ev)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={() => handleDelete(ev.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none">
          <div className="bg-white p-8 md:p-10 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline font-bold text-slate-900">
                {editingEventId ? 'Edit Event Details' : 'New Event Details'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Title</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Tech Summit 2024" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Date</Label>
                <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</Label>
                <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Main Auditorium" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Image URL</Label>
                <Input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://example.com/event-image.jpg" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Description</Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Explain what the event is about in detail..." className="bg-slate-50 border-none rounded-xl p-4 min-h-[120px]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Marketing Summary (Short)</Label>
                  <Button type="button" variant="ghost" size="sm" className="text-primary gap-1 font-bold" onClick={handleAiGenerate} disabled={generating}>
                    {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
                    AI Summarize
                  </Button>
                </div>
                <Textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="min-h-[80px] bg-slate-50 border-none rounded-xl p-4" placeholder="A concise, engaging summary..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-8 h-12 font-bold">Cancel</Button>
              <Button className="h-12 px-10 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20" onClick={handleSave}>
                <Save className="h-5 w-5" /> {editingEventId ? 'Update' : 'Save'} Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
