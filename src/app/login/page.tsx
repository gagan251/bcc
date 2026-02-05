'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
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
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { SiteLogo } from '@/components/site-logo';

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      
      // The dashboard layout will handle redirection based on verification status.
      if (user.emailVerified) {
        toast({
          title: `Welcome back, ${user.displayName || 'Student'}!`,
          description: 'You are now logged in.',
        });
      }
      router.push('/dashboard');

    } catch (error: any) {
      console.error(error);
      let description = 'An error occurred during login. Please try again.';
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential'
      ) {
        description = 'Invalid email or password.';
      }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="text-2xl">Student Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={passwordShown ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-muted-foreground"
                        aria-label="Toggle password visibility"
                    >
                        {passwordShown ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className={
                  isLoading
                    ? 'pointer-events-none'
                    : 'font-medium text-primary underline-offset-4 hover:underline'
                }
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
