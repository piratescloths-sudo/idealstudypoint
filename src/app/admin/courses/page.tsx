"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Wand2, Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCourseDescription } from "@/ai/flows/generate-course-description";
import { toast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, doc } from "firebase/firestore";

export default function AdminCoursesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    duration: "",
    targetAudience: "",
    learningObjectives: "",
    description: "",
    shortDescription: ""
  });

  const firestore = useFirestore();
  const coursesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'courses'));
  }, [firestore]);
  const { data: courses, isLoading } = useCollection(coursesQuery);

  const resetForm = () => {
    setFormData({ title: "", instructor: "", duration: "", targetAudience: "", learningObjectives: "", description: "", shortDescription: "" });
    setEditingCourseId(null);
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (course: any) => {
    setFormData({
      title: course.title || "",
      instructor: course.instructor || "",
      duration: course.duration || "",
      targetAudience: course.targetAudience || "",
      learningObjectives: "", // Usually stored as long string or array, here we keep it simple
      description: course.longDescription || "",
      shortDescription: course.shortDescription || ""
    });
    setEditingCourseId(course.id);
    setIsDialogOpen(true);
  };

  const handleAiGenerate = async () => {
    if (!formData.title || !formData.instructor) {
      toast({ variant: "destructive", title: "Missing Data", description: "Please fill Title and Instructor first." });
      return;
    }
    setGenerating(true);
    try {
      const result = await generateCourseDescription({
        title: formData.title,
        instructor: formData.instructor,
        duration: formData.duration || "Self-paced",
        targetAudience: formData.targetAudience || "Everyone",
        learningObjectives: formData.learningObjectives.split("\n").filter(l => l.trim())
      });
      setFormData({ ...formData, description: result.description, shortDescription: result.description.substring(0, 150) + "..." });
      toast({ title: "AI Magic Complete", description: "Course description generated successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not generate description." });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = () => {
    if (!firestore) return;
    
    const isNew = !editingCourseId;
    const courseId = editingCourseId || doc(collection(firestore, 'courses')).id;
    const courseRef = doc(firestore, 'courses', courseId);
    
    const payload = {
      id: courseId,
      title: formData.title,
      instructor: formData.instructor,
      duration: formData.duration,
      shortDescription: formData.shortDescription || formData.description.substring(0, 100),
      longDescription: formData.description,
      isFeatured: true,
      imageUrl: "https://picsum.photos/seed/" + (editingCourseId || Math.random()) + "/600/400",
      updatedAt: new Date().toISOString(),
    };

    if (isNew) {
      (payload as any).createdAt = new Date().toISOString();
    }

    setDocumentNonBlocking(courseRef, payload, { merge: true });

    setIsDialogOpen(false);
    resetForm();
    toast({ title: "Success", description: `Course ${isNew ? 'added to' : 'updated in'} database.` });
  };

  const handleDelete = (courseId: string) => {
    if (!firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'courses', courseId));
    toast({ title: "Deleted", description: "Course removed." });
  };

  const filteredCourses = courses?.filter(c => c.title.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-slate-900">Manage Courses</h1>
          <p className="text-muted-foreground">Create, edit and manage educational programs.</p>
        </div>
        <Button onClick={handleOpenAddDialog} className="h-12 px-6 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20">
          <Plus className="h-5 w-5" /> Add New Course
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10 rounded-xl" />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold">Course Info</TableHead>
              <TableHead className="font-bold">Instructor</TableHead>
              <TableHead className="font-bold">Duration</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10"><Loader2 className="mx-auto animate-spin" /></TableCell>
              </TableRow>
            )}
            {!isLoading && filteredCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No courses found.</TableCell>
              </TableRow>
            )}
            {filteredCourses.map((course) => (
              <TableRow key={course.id} className="hover:bg-slate-50/50">
                <TableCell className="font-semibold text-slate-900">{course.title}</TableCell>
                <TableCell className="text-slate-600">{course.instructor}</TableCell>
                <TableCell className="text-slate-600 font-medium">{course.duration}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50" onClick={() => handleOpenEditDialog(course)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={() => handleDelete(course.id)}>
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
                {editingCourseId ? 'Edit Course Details' : 'Add New Course'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Course Title</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Master React in 30 Days" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Instructor Name</Label>
                <Input value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} placeholder="e.g. Dr. Sarah" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Duration</Label>
                <Input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 8 Weeks" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Audience</Label>
                <Input value={formData.targetAudience} onChange={e => setFormData({...formData, targetAudience: e.target.value})} placeholder="e.g. Beginners" className="h-12 rounded-xl bg-slate-50 border-none" />
              </div>
              {!editingCourseId && (
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Learning Objectives (one per line)</Label>
                  <Textarea value={formData.learningObjectives} onChange={e => setFormData({...formData, learningObjectives: e.target.value})} placeholder="Learn React Hooks&#10;Master Redux&#10;Tailwind UI Design" className="bg-slate-50 border-none rounded-xl" />
                </div>
              )}
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Description</Label>
                  <Button type="button" variant="ghost" size="sm" className="text-primary gap-1 font-bold" onClick={handleAiGenerate} disabled={generating}>
                    {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
                    AI Generate
                  </Button>
                </div>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="min-h-[120px] bg-slate-50 border-none rounded-xl p-4" placeholder="Generated or custom description..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-8 h-12 font-bold">Cancel</Button>
              <Button className="h-12 px-10 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20" onClick={handleSave}>
                <Save className="h-5 w-5" /> {editingCourseId ? 'Update' : 'Save'} Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
