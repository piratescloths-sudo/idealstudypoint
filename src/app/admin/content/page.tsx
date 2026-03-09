"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";

export default function AdminContentPage() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);

  const { data: settings, isLoading } = useDoc(settingsRef);
  const [formData, setFormData] = useState({
    heroHeadline: "",
    heroDescription: "",
    heroImages: [] as string[],
    aboutTitle: "",
    aboutContent: "",
    aboutImage: "",
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (settings) {
      setFormData({
        heroHeadline: settings.heroHeadline || "",
        heroDescription: settings.heroDescription || "",
        heroImages: settings.heroImages || [],
        aboutTitle: settings.aboutTitle || "",
        aboutContent: settings.aboutContent || "",
        aboutImage: settings.aboutImage || "",
      });
    }
  }, [settings]);

  const handleSave = () => {
    if (!firestore || !settingsRef) return;
    
    // Explicitly include the ID to satisfy security rule requirements
    setDocumentNonBlocking(settingsRef, {
      ...formData,
      id: "main",
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    toast({ title: "Settings Updated", description: "Homepage content has been saved successfully." });
  };

  const addHeroImage = () => {
    if (!newImageUrl) return;
    setFormData({ ...formData, heroImages: [...formData.heroImages, newImageUrl] });
    setNewImageUrl("");
  };

  const removeHeroImage = (index: number) => {
    const updatedImages = formData.heroImages.filter((_, i) => i !== index);
    setFormData({ ...formData, heroImages: updatedImages });
  };

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-slate-900">Homepage Content</h1>
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
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader><CardTitle>Hero Section Content</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hero Heading</Label>
                <Input 
                  value={formData.heroHeadline} 
                  onChange={e => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="h-12 rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label>Hero Sub-heading</Label>
                <Textarea 
                  value={formData.heroDescription} 
                  onChange={e => setFormData({ ...formData, heroDescription: e.target.value })}
                  className="rounded-xl min-h-[100px]" 
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Hero Background Images (Slider)</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter image URL..." 
                    value={newImageUrl} 
                    onChange={e => setNewImageUrl(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                  <Button type="button" onClick={addHeroImage} className="rounded-xl px-6">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.heroImages.map((url, idx) => (
                    <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border">
                      <img src={url} alt={`Hero ${idx}`} className="object-cover w-full h-full" />
                      <button 
                        onClick={() => removeHeroImage(idx)}
                        className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {formData.heroImages.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">No custom images added. Default placeholder will be used.</p>
                )}
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
                <Input 
                  value={formData.aboutTitle} 
                  onChange={e => setFormData({ ...formData, aboutTitle: e.target.value })}
                  className="h-12 rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label>About Description</Label>
                <Textarea 
                  value={formData.aboutContent} 
                  onChange={e => setFormData({ ...formData, aboutContent: e.target.value })}
                  className="rounded-xl min-h-[150px]" 
                />
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> About Section Image</Label>
                <Input 
                  placeholder="Enter image URL..." 
                  value={formData.aboutImage} 
                  onChange={e => setFormData({ ...formData, aboutImage: e.target.value })}
                  className="h-12 rounded-xl"
                />
                {formData.aboutImage && (
                  <div className="mt-4 relative aspect-video rounded-xl overflow-hidden border max-w-md">
                    <img src={formData.aboutImage} alt="About Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
