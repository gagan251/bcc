'use client';

import { useState, useRef } from 'react';
import { useUser, useAuth, errorEmitter } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAvatarFallback = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !auth.currentUser) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit, we will resize anyway
        toast({
            variant: 'destructive',
            title: 'File Too Large',
            description: 'Please select an image smaller than 5MB.',
        });
        return;
    }

    setIsUploading(true);

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                if (!e.target?.result) {
                    return reject(new Error("Failed to read file."));
                }
                const img = document.createElement('img');
                img.src = e.target.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 512;
                    const MAX_HEIGHT = 512;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        return reject(new Error('Could not get canvas context'));
                    }
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL(file.type, 0.9)); // 0.9 quality for JPG
                }
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    }

    try {
        const resizedDataUrl = await resizeImage(file);
        
        if(auth.currentUser) {
            await updateProfile(auth.currentUser, { photoURL: resizedDataUrl });
            errorEmitter.emit('profile-updated');
            toast({
              title: 'Profile Picture Updated',
              description: 'Your new profile picture has been saved.',
            });
        }
    } catch (error: any) {
        console.error('Error updating profile picture:', error);
        let description = 'There was an error updating your profile picture.';
        if(error.code === 'auth/invalid-photo-url') {
            description = "The uploaded image is invalid or too large. Please try a different one.";
        }
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description,
        });
    } finally {
        setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Manage your account settings and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? 'User'} />
            <AvatarFallback className="text-4xl">
              {getAvatarFallback(user?.email)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button onClick={handleUploadClick} disabled={isUploading}>
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {isUploading ? 'Uploading...' : 'Upload New Picture'}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 5MB.</p>
          </div>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" value={user?.displayName ?? ''} disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={user?.email ?? ''} disabled />
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
