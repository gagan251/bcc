'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, MailCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useFirestore, useAuth } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { SiteLogo } from '@/components/site-logo';

export default function SignupPage() {
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isCaptchaChecked) {
      toast({
        variant: 'destructive',
        title: 'Captcha Required',
        description: 'Please verify you are not a robot.',
      });
      return;
    }
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = `${firstName} ${lastName}`;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName });
      await sendEmailVerification(user);

      const userDocRef = doc(firestore, 'users', user.uid);
      const userData = {
        id: user.uid,
        firstName,
        lastName,
        displayName,
        email: user.email,
        role: 'student',
      };
      
      setDocumentNonBlocking(userDocRef, userData, { merge: true });

      await signOut(auth);
      setEmailSent(true);

    } catch (error: any) {
      console.error(error);
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        description =
          'This email is already in use. Please use a different email or log in.';
      } else if (error.code === 'auth/weak-password') {
        description = 'The password is too weak. Please use a stronger password.';
      }
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <MailCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to your email address. Please check your inbox and follow the instructions to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <SiteLogo className="h-8 w-8" />
            <span className="text-2xl font-bold">
              Bharat Communication Center
            </span>
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enroll now to start your learning journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="John"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Doe"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="captcha"
                  onCheckedChange={(checked) => setIsCaptchaChecked(!!checked)}
                  disabled={isLoading}
                />
                <label
                  htmlFor="captcha"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am not a robot
                </label>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!isCaptchaChecked || isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className={
                  isLoading
                    ? 'pointer-events-none text-muted-foreground'
                    : 'underline hover:text-primary'
                }
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
