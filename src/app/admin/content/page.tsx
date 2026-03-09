"use client";

import { Save, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

export default function AdminContentPage() {
  const handleSave = () => {
    toast({ title: "Settings Updated", description: "Homepage content has been saved successfully." });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Homepage Content</h1>
          <p className="text-muted-foreground">Modify the text and images displayed on the main page.</p>
        </div>
        <Button className="h-12 px-8 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20" onClick={handleSave}>
          <Save className="h-5 w-5" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="bg-white p-1 h-14 rounded-2xl shadow-sm mb-8">
          <TabsTrigger value="hero" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white">Hero Section</TabsTrigger>
          <TabsTrigger value="about" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white">About Us</TabsTrigger>
          <TabsTrigger value="testimonials" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader><CardTitle>Hero Section Content</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hero Heading</Label>
                <Input defaultValue="Unlock Your Potential with Ideal Study Point" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Hero Sub-heading</Label>
                <Textarea defaultValue="Join our world-class academic community. We offer cutting-edge courses designed by industry experts." className="rounded-xl min-h-[100px]" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primary Button Text</Label>
                  <Input defaultValue="Enroll Now" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Button Text</Label>
                  <Input defaultValue="Browse Courses" className="h-12 rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader><CardTitle>About Section Details</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>About Title</Label>
                <Input defaultValue="Why Choose Ideal Study Point Academy?" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>About Description</Label>
                <Textarea defaultValue="With over two decades of excellence, Ideal Study Point is committed to providing students with the best learning experience." className="rounded-xl min-h-[150px]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[1, 2].map((i) => (
                <Card key={i} className="border-none shadow-sm rounded-3xl">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Testimonial {i}</CardTitle>
                    <Button variant="ghost" size="icon"><RefreshCcw className="h-4 w-4" /></Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Student Name</Label>
                      <Input defaultValue={i === 1 ? "Alex Thompson" : "Maria Garcia"} />
                    </div>
                    <div className="space-y-2">
                      <Label>Role/Designation</Label>
                      <Input defaultValue={i === 1 ? "Software Graduate" : "MBA Student"} />
                    </div>
                    <div className="space-y-2">
                      <Label>Feedback</Label>
                      <Textarea defaultValue="The curriculum at Ideal Study Point is truly state-of-the-art..." />
                    </div>
                  </CardContent>
                </Card>
             ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
