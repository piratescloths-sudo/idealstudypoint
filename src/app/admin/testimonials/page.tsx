"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Loader2, Save, User, Quote, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, doc } from "firebase/firestore";

export default function AdminTestimonialsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    authorName: "",
    authorTitle: "",
    content: "",
    imageUrl: ""
  });

  const firestore = useFirestore();
  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'testimonials'));
  }, [firestore]);
  const { data: testimonials, isLoading } = useCollection(testimonialsQuery);

  const resetForm = () => {
    setFormData({ authorName: "", authorTitle: "", content: "", imageUrl: "" });
    setEditingId(null);
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (t: any) => {
    setFormData({
      authorName: t.authorName || "",
      authorTitle: t.authorTitle || "",
      content: t.content || "",
      imageUrl: t.imageUrl || ""
    });
    setEditingId(t.id);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!firestore) return;
    
    const isNew = !editingId;
    const testimonialId = editingId || doc(collection(firestore, 'testimonials')).id;
    const tRef = doc(firestore, 'testimonials', testimonialId);
    
    const payload = {
      id: testimonialId,
      authorName: formData.authorName,
      authorTitle: formData.authorTitle,
      content: formData.content,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${testimonialId}/200/200`,
      updatedAt: new Date().toISOString(),
    };

    if (isNew) {
      (payload as any).createdAt = new Date().toISOString();
    }

    setDocumentNonBlocking(tRef, payload, { merge: true });

    setIsDialogOpen(false);
    resetForm();
    toast({ title: "Success", description: `Testimonial ${isNew ? 'added' : 'updated'}.` });
  };

  const handleDelete = (id: string) => {
    if (!firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'testimonials', id));
    toast({ title: "Deleted", description: "Testimonial removed." });
  };

  const filteredTestimonials = testimonials?.filter(t => 
    t.authorName.toLowerCase().includes(search.toLowerCase()) || 
    t.content.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-slate-900">Manage Testimonials</h1>
          <p className="text-muted-foreground">Share student success stories on your homepage.</p>
        </div>
        <Button onClick={handleOpenAddDialog} className="h-12 px-6 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20">
          <Plus className="h-5 w-5" /> Add Testimonial
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search testimonials..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10 rounded-xl" />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold">Author</TableHead>
              <TableHead className="font-bold">Content</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10"><Loader2 className="mx-auto animate-spin" /></TableCell>
              </TableRow>
            )}
            {!isLoading && filteredTestimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">No testimonials found.</TableCell>
              </TableRow>
            )}
            {filteredTestimonials.map((t) => (
              <TableRow key={t.id} className="hover:bg-slate-50/50">
                <TableCell className="min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 text-xs overflow-hidden">
                      {t.imageUrl ? <img src={t.imageUrl} alt={t.authorName} className="object-cover w-full h-full" /> : <User className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{t.authorName}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.authorTitle}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 text-sm max-w-md truncate italic">&quot;{t.content}&quot;</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50" onClick={() => handleOpenEditDialog(t)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={() => handleDelete(t.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl rounded-[2.5rem] p-0 overflow-hidden border-none">
          <div className="bg-white p-8 md:p-10 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline font-bold text-slate-900">
                {editingId ? 'Edit Testimonial' : 'New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Author Name</Label>
                  <Input value={formData.authorName} onChange={e => setFormData({...formData, authorName: e.target.value})} placeholder="e.g. John Doe" className="h-12 rounded-xl bg-slate-50 border-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Author Title/Role</Label>
                  <Input value={formData.authorTitle} onChange={e => setFormData({...formData, authorTitle: e.target.value})} placeholder="e.g. Alumnus 2023" className="h-12 rounded-xl bg-slate-50 border-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Profile Image URL</Label>
                <Input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://example.com/photo.jpg" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Quote className="h-3 w-3" /> Testimonial Content</Label>
                <Textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="min-h-[150px] bg-slate-50 border-none rounded-xl p-4" placeholder="What did the student say?" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-8 h-12 font-bold">Cancel</Button>
              <Button className="h-12 px-10 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20" onClick={handleSave}>
                <Save className="h-5 w-5" /> {editingId ? 'Update' : 'Save'} Testimonial
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
