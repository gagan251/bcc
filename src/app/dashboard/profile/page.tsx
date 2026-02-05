'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser, useAuth, errorEmitter, useStorage } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


export default function ProfilePage() {
  const { user } = useUser();
  const auth = useAuth();
  const storage = useStorage();
  const { toast } = useToast();

  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imgSrc && imgSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [imgSrc]);

  const getAvatarFallback = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  function getCroppedBlob(
    image: HTMLImageElement,
    crop: PixelCrop,
    outputWidth = 512,
    outputHeight = 512,
  ): Promise<Blob> {
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      return Promise.reject(new Error('Could not get canvas context'));
    }
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    ctx.imageSmoothingQuality = 'high';
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      outputWidth,
      outputHeight
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  }
  

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'image/jpeg') {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please select a JPG image.',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: 'Please select an image smaller than 5MB.',
        });
        return;
      }

      setCrop(undefined) // Makes crop preview update between images.
      setImgSrc(URL.createObjectURL(file));
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
      const { width, height } = e.currentTarget;
      const crop = centerCrop(
      makeAspectCrop(
          {
          unit: '%',
          width: 90,
          },
          1, // 1:1 aspect ratio
          width,
          height,
      ),
      width,
      height,
      );
      setCrop(crop);
  }

  async function handleUpload() {
    if (!completedCrop || !imgRef.current) {
        toast({ variant: 'destructive', title: 'Crop Error', description: 'Please select and crop an image first.' });
        return;
    }
    if(!auth.currentUser || !storage) {
        toast({ variant: 'destructive', title: 'Error', description: 'User not logged in or storage not available.' });
        return
    };

    setIsUploading(true);
    try {
        const imageBlob = await getCroppedBlob(imgRef.current, completedCrop);
        
        const filePath = `users/${auth.currentUser.uid}/profile.jpg`;
        const fileRef = storageRef(storage, filePath);

        const metadata = { contentType: 'image/jpeg' };
        const uploadResult = await uploadBytes(fileRef, imageBlob, metadata);
        
        const downloadUrl = await getDownloadURL(uploadResult.ref);
        
        await updateProfile(auth.currentUser, { photoURL: downloadUrl });
        
        // This is crucial to make sure the user object in the auth state is updated
        await auth.currentUser.reload();
        // This notifies other components (like header/sidebar) that use `useUser`
        errorEmitter.emit('profile-updated');

        toast({
            title: 'Profile Picture Updated',
            description: 'Your new profile picture has been saved.',
        });
        setIsModalOpen(false);
        setImgSrc('');
    } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: error.message || 'An unexpected error occurred during upload.',
        });
    } finally {
        setIsUploading(false);
    }
  }

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
          
          <Dialog open={isModalOpen} onOpenChange={(isOpen) => {
            setIsModalOpen(isOpen);
            if (!isOpen) {
              setImgSrc('');
            }
          }}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Picture
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Profile Picture</DialogTitle>
                    <DialogDescription>
                        Crop your new profile picture. Only JPG files up to 5MB are allowed.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input type="file" accept="image/jpeg" onChange={onSelectFile} disabled={isUploading}/>
                    {imgSrc && (
                        <div className="flex justify-center bg-muted rounded-md p-2">
                            <ReactCrop
                                crop={crop}
                                onChange={c => setCrop(c)}
                                onComplete={c => setCompletedCrop(c)}
                                aspect={1}
                                circularCrop
                                keepSelection
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                    style={{ maxHeight: '60vh', objectFit: 'contain' }}
                                />
                            </ReactCrop>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isUploading}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleUpload} disabled={isUploading || !imgSrc}>
                        {isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <Upload className="mr-2 h-4 w-4" />
                        )}
                        {isUploading ? 'Uploading...' : 'Save & Upload'}
                    </Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
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
