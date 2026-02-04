'use client';

import { useState, useRef } from 'react';
import { useUser } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { getAuth } from 'firebase/auth';

export default function ProfilePage() {
  const { user } = useUser();
  const auth = getAuth();
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

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
            variant: 'destructive',
            title: 'File Too Large',
            description: 'Please select an image smaller than 2MB.',
        });
        return;
    }


    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        if(auth.currentUser) {
            await updateProfile(auth.currentUser, { photoURL: dataUrl });
            toast({
              title: 'Profile Picture Updated',
              description: 'Your new profile picture has been saved.',
            });
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'There was an error updating your profile picture.',
        });
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = (error) => {
        console.error('Error reading file:', error);
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
        });
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
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 2MB.</p>
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
