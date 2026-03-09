"use client";

import { useState, useEffect } from "react";
import { Save, Shield, Globe, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";

export default function AdminSettingsPage() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'websiteSettings', 'main');
  }, [firestore]);

  const { data: settings, isLoading } = useDoc(settingsRef);
  const [formData, setFormData] = useState({
    siteName: "Ideal Study Point",
    mainEmail: "info@idealstudypoint.edu",
    mainPhone: "+1 (234) 567-890",
    address: "123 Education Ave, Knowledge City, ED 56789",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || "Ideal Study Point",
        mainEmail: settings.mainEmail || "info@idealstudypoint.edu",
        mainPhone: settings.mainPhone || "+1 (234) 567-890",
        address: settings.address || "123 Education Ave, Knowledge City, ED 56789",
        facebookUrl: settings.facebookUrl || "",
        instagramUrl: settings.instagramUrl || "",
        linkedinUrl: settings.linkedinUrl || "",
      });
    }
  }, [settings]);

  const handleSave = () => {
    if (!firestore || !settingsRef) return;
    
    setDocumentNonBlocking(settingsRef, {
      ...formData,
      id: "main",
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    toast({ title: "System Updated", description: "Global settings have been applied successfully." });
  };

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-slate-900">General Settings</h1>
          <p className="text-muted-foreground">Manage site-wide configuration and contact details.</p>
        </div>
        <Button className="h-12 px-8 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20" onClick={handleSave}>
          <Save className="h-5 w-5" /> Save System Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-6">
            <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Info className="h-5 w-5 text-indigo-600" />
            </div>
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Institute Name</Label>
              <Input 
                value={formData.siteName} 
                onChange={e => setFormData({...formData, siteName: e.target.value})}
                className="rounded-xl h-12 bg-slate-50 border-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Campus Address</Label>
              <Input 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="rounded-xl h-12 bg-slate-50 border-none" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Primary Email</Label>
                <Input 
                  value={formData.mainEmail} 
                  onChange={e => setFormData({...formData, mainEmail: e.target.value})}
                  className="rounded-xl h-12 bg-slate-50 border-none" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</Label>
                <Input 
                  value={formData.mainPhone} 
                  onChange={e => setFormData({...formData, mainPhone: e.target.value})}
                  className="rounded-xl h-12 bg-slate-50 border-none" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-6">
            <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Globe className="h-5 w-5 text-indigo-600" />
            </div>
            <CardTitle className="text-xl">Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Facebook URL</Label>
              <Input 
                value={formData.facebookUrl}
                onChange={e => setFormData({...formData, facebookUrl: e.target.value})}
                placeholder="https://facebook.com/..." 
                className="rounded-xl h-12 bg-slate-50 border-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Instagram URL</Label>
              <Input 
                value={formData.instagramUrl}
                onChange={e => setFormData({...formData, instagramUrl: e.target.value})}
                placeholder="https://instagram.com/..." 
                className="rounded-xl h-12 bg-slate-50 border-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">LinkedIn URL</Label>
              <Input 
                value={formData.linkedinUrl}
                onChange={e => setFormData({...formData, linkedinUrl: e.target.value})}
                placeholder="https://linkedin.com/in/..." 
                className="rounded-xl h-12 bg-slate-50 border-none" 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl lg:col-span-2 bg-white">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-6">
            <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            <CardTitle className="text-xl">Security & Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Admin Username</Label>
                <Input defaultValue="kanhucharanideal@gmail.com" disabled className="rounded-xl h-12 bg-muted/50 border-none font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Access Level</Label>
                <Input defaultValue="Master Administrator" disabled className="rounded-xl h-12 bg-muted/50 border-none font-medium" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
