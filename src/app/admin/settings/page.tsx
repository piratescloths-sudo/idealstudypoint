"use client";

import { Save, Shield, Globe, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const handleSave = () => {
    toast({ title: "System Updated", description: "Global settings have been applied." });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">General Settings</h1>
          <p className="text-muted-foreground">Manage site-wide configuration and contact details.</p>
        </div>
        <Button className="h-12 px-8 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20" onClick={handleSave}>
          <Save className="h-5 w-5" /> Save System Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center gap-3">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Campus Address</Label>
              <Input defaultValue="123 Education Ave, Knowledge City, ED 56789" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Email</Label>
                <Input defaultValue="info@idealstudypoint.edu" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input defaultValue="+1 (234) 567-890" className="rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input placeholder="https://facebook.com/..." className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input placeholder="https://instagram.com/..." className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input placeholder="https://linkedin.com/in/..." className="rounded-xl" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security & Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label>Admin Username</Label>
                <Input defaultValue="admin@idealstudypoint.edu" disabled className="rounded-xl bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Change Admin Password</Label>
                <Input type="password" placeholder="New Password" className="rounded-xl" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline" className="rounded-xl">Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
