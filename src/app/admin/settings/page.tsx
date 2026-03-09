
"use client";

import { useState, useEffect } from "react";
import { Save, Shield, Globe, Info, Loader2, MessageSquare, Map as MapIcon, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    logoUrl: "",
    faviconUrl: "",
    mainEmail: "info@idealstudypoint.edu",
    mainPhone: "+1 (234) 567-890",
    address: "123 Education Ave, Knowledge City, ED 56789",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    contactHeadline: "Connect With Us",
    contactDescription: "Have questions about our campus or programs? We're here to help you navigate your academic future.",
    officeHours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed",
    googleMapEmbedUrl: ""
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || "Ideal Study Point",
        logoUrl: settings.logoUrl || "",
        faviconUrl: settings.faviconUrl || "",
        mainEmail: settings.mainEmail || "info@idealstudypoint.edu",
        mainPhone: settings.mainPhone || "+1 (234) 567-890",
        address: settings.address || "123 Education Ave, Knowledge City, ED 56789",
        facebookUrl: settings.facebookUrl || "",
        instagramUrl: settings.instagramUrl || "",
        linkedinUrl: settings.linkedinUrl || "",
        contactHeadline: settings.contactHeadline || "Connect With Us",
        contactDescription: settings.contactDescription || "Have questions about our campus or programs? We're here to help you navigate your academic future.",
        officeHours: settings.officeHours || "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed",
        googleMapEmbedUrl: settings.googleMapEmbedUrl || ""
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
    <div className="space-y-8 pb-20">
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
        {/* Branding & Identity Box */}
        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 border-b pb-6 p-8">
            <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <Info className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Branding & Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Institute Name</Label>
              <Input 
                value={formData.siteName} 
                onChange={e => setFormData({...formData, siteName: e.target.value})}
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all text-base" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Website Logo URL</Label>
              <Input 
                value={formData.logoUrl} 
                onChange={e => setFormData({...formData, logoUrl: e.target.value})}
                placeholder="https://example.com/logo.png"
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all text-base" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Favicon (Tab Icon) URL</Label>
              <Input 
                value={formData.faviconUrl} 
                onChange={e => setFormData({...formData, faviconUrl: e.target.value})}
                placeholder="https://example.com/favicon.ico"
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all text-base" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Campus Address Box */}
        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 border-b pb-6 p-8">
            <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <MapIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Campus Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Physical Address</Label>
              <Input 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all text-base" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Primary Email</Label>
                <Input 
                  value={formData.mainEmail} 
                  onChange={e => setFormData({...formData, mainEmail: e.target.value})}
                  className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all text-base" 
              />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Phone Number</Label>
                <Input 
                  value={formData.mainPhone} 
                  onChange={e => setFormData({...formData, mainPhone: e.target.value})}
                  className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all text-base" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Page Content Box */}
        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 border-b pb-6 p-8">
            <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Contact Page Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact Headline</Label>
              <Input 
                value={formData.contactHeadline} 
                onChange={e => setFormData({...formData, contactHeadline: e.target.value})}
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-amber-600/20 transition-all text-base" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact Description</Label>
              <Textarea 
                value={formData.contactDescription} 
                onChange={e => setFormData({...formData, contactDescription: e.target.value})}
                className="rounded-[2rem] bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-amber-600/20 transition-all min-h-[100px] p-6 text-base" 
              />
            </div>
            <div className="space-y-4 p-6 bg-slate-900 rounded-[2rem] text-white">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <MapIcon className="h-3 w-3" /> Google Map Embed URL
              </Label>
              <Input 
                value={formData.googleMapEmbedUrl} 
                onChange={e => setFormData({...formData, googleMapEmbedUrl: e.target.value})}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="rounded-xl h-12 bg-white/10 border-white/20 text-white placeholder:text-white/30" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links Box */}
        <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 border-b pb-6 p-8">
            <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Facebook URL</Label>
              <Input 
                value={formData.facebookUrl}
                onChange={e => setFormData({...formData, facebookUrl: e.target.value})}
                placeholder="https://facebook.com/..." 
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all text-base" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Instagram URL</Label>
              <Input 
                value={formData.instagramUrl}
                onChange={e => setFormData({...formData, instagramUrl: e.target.value})}
                placeholder="https://instagram.com/..." 
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all text-base" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">LinkedIn URL</Label>
              <Input 
                value={formData.linkedinUrl}
                onChange={e => setFormData({...formData, linkedinUrl: e.target.value})}
                placeholder="https://linkedin.com/in/..." 
                className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all text-base" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
