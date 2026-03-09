"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Wand2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCourseDescription } from "@/ai/flows/generate-course-description";
import { toast } from "@/hooks/use-toast";

export default function AdminCoursesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    duration: "",
    targetAudience: "",
    learningObjectives: "",
    description: ""
  });

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
      setFormData({ ...formData, description: result.description });
      toast({ title: "AI Magic Complete", description: "Course description generated successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not generate description." });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Manage Courses</h1>
          <p className="text-muted-foreground">Create, edit and manage educational programs.</p>
        </div>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="h-12 px-6 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20">
              <Plus className="h-5 w-5" /> Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">Add Course Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Master React in 30 Days" />
              </div>
              <div className="space-y-2">
                <Label>Instructor Name</Label>
                <Input value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} placeholder="e.g. Dr. Sarah" />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 8 Weeks" />
              </div>
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Input value={formData.targetAudience} onChange={e => setFormData({...formData, targetAudience: e.target.value})} placeholder="e.g. Beginners" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Learning Objectives (one per line)</Label>
                <Textarea value={formData.learningObjectives} onChange={e => setFormData({...formData, learningObjectives: e.target.value})} placeholder="Learn React Hooks&#10;Master Redux&#10;Tailwind UI Design" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center">
                  <Label>Description</Label>
                  <Button type="button" variant="ghost" size="sm" className="text-primary gap-1" onClick={handleAiGenerate} disabled={generating}>
                    {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
                    AI Generate
                  </Button>
                </div>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="min-h-[120px]" placeholder="Generated or custom description..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button className="gap-2 px-8" onClick={() => { toast({ title: "Success", description: "Course added." }); setIsAdding(false); }}>
                <Save className="h-4 w-4" /> Save Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search courses..." className="pl-10 h-10 rounded-xl" />
          </div>
          <div className="flex gap-2">
             {/* Filter buttons could go here */}
          </div>
        </div>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Course Info</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, title: "Full Stack Development", inst: "David Miller", dur: "12 Weeks" },
              { id: 2, title: "UI/UX Design Masterclass", inst: "Mark Wilson", dur: "8 Weeks" },
              { id: 3, title: "Data Science Fundamentals", inst: "Sarah Chen", dur: "10 Weeks" },
            ].map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-semibold">{course.title}</TableCell>
                <TableCell>{course.inst}</TableCell>
                <TableCell>{course.dur}</TableCell>
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