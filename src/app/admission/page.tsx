"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Clock, 
  Award, 
  Heart, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from "@/firebase";
import { collection, query, doc } from "firebase/firestore";

export default function AdmissionPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firestore = useFirestore();

  const coursesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'courses'));
  }, [firestore]);
  const { data: courses } = useCollection(coursesQuery);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setLoading(true);

    const colRef = collection(firestore, 'admissionInquiries');
    const newDocId = doc(colRef).id;

    addDocumentNonBlocking(colRef, {
      id: newDocId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      selectedCourseId: formData.courseId,
      message: formData.message,
      submissionDate: new Date().toISOString()
    });

    setLoading(false);
    setSubmitted(true);
    toast({
      title: "Application Received!",
      description: "We will review your application and contact you soon.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-xl w-full text-center space-y-10 p-16 bg-white rounded-[3rem] shadow-2xl border border-white/20">
            <div className="relative inline-flex p-8 bg-indigo-50 rounded-full">
               <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-indigo-400 animate-pulse" />
              <CheckCircle2 className="h-20 w-20 text-indigo-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-slate-900">Application Success!</h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Your application for admission has been successfully received. A counselor will reach out to you within 24-48 business hours.
              </p>
            </div>
            <Button asChild className="w-full h-16 rounded-2xl text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20">
              <a href="/">Return to Home Page</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          
          <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 leading-tight">
              Start Your Application
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Take the first step toward your future. Fill out the form below to begin your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-headline font-bold text-slate-900">Why Apply to Ideal Study Point?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: BookOpen, title: "World-Class Curriculum", desc: "Programs designed by industry experts" },
                    { icon: Clock, title: "Flexible Schedule", desc: "Learn at your pace" },
                    { icon: Award, title: "Recognized Degrees", desc: "Accredited certifications" },
                    { icon: Heart, title: "Career Support", desc: "Placement assistance" }
                  ].map((feature, i) => (
                    <Card key={i} className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 bg-white transition-all hover:-translate-y-1 duration-300">
                      <CardContent className="p-0 space-y-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                          <feature.icon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 text-sm">{feature.title}</h3>
                          <p className="text-[10px] text-slate-400 font-medium">{feature.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border-none shadow-none rounded-3xl bg-indigo-50/50 p-10 border border-indigo-100">
                <CardContent className="p-0 space-y-5">
                  <h3 className="text-xl font-bold text-slate-900">Admission Process</h3>
                  <ol className="space-y-4 text-slate-500 font-medium text-sm list-decimal list-inside leading-relaxed">
                    <li>Submit your application form</li>
                    <li>Review by our admissions team</li>
                    <li>Receive your admission decision via email</li>
                    <li>Complete enrollment and begin your journey</li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardContent className="p-10 md:p-14">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold text-slate-900">Full Name *</Label>
                    <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-slate-900">Email Address *</Label>
                    <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold text-slate-900">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-sm font-bold text-slate-900">Select Course</Label>
                    <Select required onValueChange={val => setFormData({...formData, courseId: val})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all">
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {courses?.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-bold text-slate-900">Additional Message</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about yourself..." 
                      className="min-h-[140px] rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-600/20 transition-all p-4" 
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold gap-3 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                      <>
                        <Send className="h-5 w-5" /> Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
