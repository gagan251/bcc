'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, useStorage, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { AdminShell } from '@/components/admin/admin-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Library, File as FileIcon, Trash2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

const libraryFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  category: z.enum(["Typing", "Stenography", "General"]),
  file: z.any()
    .refine((files) => files?.length == 1, "File is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((files) => ALLOWED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .doc, .docx, .jpg, .png files are accepted."),
});

type LibraryFile = { id: string, title: string, fileName: string, fileType: string, uploadedAt: any, fileUrl: string, category: string };

function LibraryUploadForm({ onUploadComplete }: { onUploadComplete: () => void }) {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const form = useForm<z.infer<typeof libraryFormSchema>>({
    resolver: zodResolver(libraryFormSchema),
    defaultValues: { title: "", description: "", category: "General" },
  });
  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof libraryFormSchema>) {
    if (!firestore || !storage) return;
    setIsLoading(true);
    setUploadProgress(0);

    const file = values.file[0];
    const filePath = `library/${Date.now()}_${file.name}`;
    const fileStorageRef = storageRef(storage, filePath);

    const uploadTask = uploadBytesResumable(fileStorageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsLoading(false);
        setUploadProgress(null);
        toast({ variant: "destructive", title: "Upload Error", description: "Could not upload the file." });
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        await addDoc(collection(firestore, 'library'), {
          title: values.title,
          description: values.description,
          category: values.category,
          fileUrl: downloadURL,
          fileName: file.name,
          fileType: file.type,
          uploadedAt: serverTimestamp(),
        });

        toast({ title: "File Uploaded", description: `"${values.title}" is now in the library.` });
        form.reset();
        onUploadComplete();
        setIsLoading(false);
        setUploadProgress(null);
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><PlusCircle /> Upload New File</CardTitle>
        <CardDescription>Add a new resource to the student library.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>File Title</FormLabel><FormControl><Input placeholder="e.g., Steno Practice Sheet 1" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description (Optional)</FormLabel><FormControl><Textarea placeholder="A short summary of the file's content" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Typing">Typing</SelectItem>
                        <SelectItem value="Stenography">Stenography</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="file" render={({ field }) => (
                <FormItem><FormLabel>File</FormLabel><FormControl><Input type="file" {...fileRef} /></FormControl><FormMessage /></FormItem>
            )} />
            {uploadProgress !== null && <Progress value={uploadProgress} className="w-full" />}
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? `Uploading... ${uploadProgress?.toFixed(0)}%` : 'Upload File'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function LibraryFilesList() {
    const firestore = useFirestore();
    const query = useMemoFirebase(() => firestore ? collection(firestore, 'library') : null, [firestore]);
    const { data: files, isLoading } = useCollection<LibraryFile>(query);
    const { toast } = useToast();

    if (isLoading) {
        return <div className="space-y-4 mt-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-16" />)}
        </div>;
    }

    return (
        <Card className="mt-8">
            <CardHeader><CardTitle>Uploaded Files</CardTitle></CardHeader>
            <CardContent>
                {files && files.length > 0 ? (
                    <div className="space-y-3">
                        {files.sort((a,b) => b.uploadedAt.seconds - a.uploadedAt.seconds).map(f => (
                            <div key={f.id} className="p-3 border rounded-lg flex justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <FileIcon className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">{f.title}</p>
                                        <p className="text-xs text-muted-foreground">{f.fileName} • {f.uploadedAt ? format(f.uploadedAt.toDate(), 'PPP') : 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                     <Button variant="outline" size="sm" asChild><Link href={f.fileUrl} target="_blank"><Download className="h-4 w-4 mr-2"/>Download</Link></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => toast({title: "Coming Soon"})}><Trash2 className="h-4 w-4"/></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-8">No files have been uploaded yet.</p>
                )}
            </CardContent>
        </Card>
    );
}


export default function AdminLibraryPage() {
  const [key, setKey] = useState(0); // Used to force-refresh the list
  return (
    <AdminShell
      pageTitle="Library Management"
      pageDescription="Upload and manage study materials like PDFs, documents, and images."
      headerIcon={<Library className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 gap-8">
          <LibraryUploadForm onUploadComplete={() => setKey(k => k + 1)} />
          <LibraryFilesList key={key} />
      </div>
    </AdminShell>
  );
}
