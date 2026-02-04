'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={className}
  >
    <path d="M12 5c5.5 0 10 6.5 10 7s-4.5 7-10 7S2 13.5 2 12s4.5-7 10-7Zm0 2C7.8 7 4.2 11.3 4.2 12S7.8 17 12 17s7.8-4.3 7.8-5S16.2 7 12 7Zm0 2.5A2.5 2.5 0 1 1 12 14a2.5 2.5 0 0 1 0-5Z" />
  </svg>
);

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential'
      ) {
        setMessage('Invalid email or password.');
      } else {
        setMessage('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden bg-white text-[#1c2430]">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-160px] left-[-140px] h-[520px] w-[520px] rounded-full bg-orange-500"></div>
        <div className="absolute bottom-[-180px] right-[-180px] h-[560px] w-[560px] rounded-full bg-blue-600"></div>
      </div>
      <main className="grid min-h-screen place-items-center p-6">
        <section
          className="w-full max-w-md rounded-[22px] border-2 border-[rgba(120,140,170,.55)] bg-[linear-gradient(135deg,rgba(255,255,255,.75)_0%,rgba(255,255,255,.48)_55%,rgba(255,255,255,.35)_100%)] py-[34px] px-[20px] shadow-[0_20px_60px_rgba(20,30,50,.18)] backdrop-blur-[10px] md:py-[52px] md:px-[30px]"
          aria-label="Login form"
        >
          <h1 className="mb-[28px] text-center text-[28px] font-semibold tracking-[.2px] md:text-[34px]">
            Login
          </h1>

          <form
            id="loginForm"
            className="grid gap-[18px]"
            autoComplete="on"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                disabled={isLoading}
                className="h-[54px] w-full rounded-[10px] border border-[rgba(120,140,170,.35)] bg-[rgba(255,255,255,.65)] px-4 text-base text-[#1c2430] shadow-[inset_0_1px_0_rgba(255,255,255,.7)] outline-none placeholder:text-[rgba(28,36,48,.45)] focus:border-[rgba(31,120,209,.55)] focus:shadow-[0_0_0_4px_rgba(31,120,209,.12),inset_0_1px_0_rgba(255,255,255,.75)] disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                required
                autoComplete="current-password"
                disabled={isLoading}
                className="h-[54px] w-full rounded-[10px] border border-[rgba(120,140,170,.35)] bg-[rgba(255,255,255,.65)] px-4 pr-12 text-base text-[#1c2430] shadow-[inset_0_1px_0_rgba(255,255,255,.7)] outline-none placeholder:text-[rgba(28,36,48,.45)] focus:border-[rgba(31,120,209,.55)] focus:shadow-[0_0_0_4px_rgba(31,120,209,.12),inset_0_1px_0_rgba(255,255,255,.75)] disabled:opacity-50"
              />
              <button
                type="button"
                className="absolute right-[10px] top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-[10px] border-none bg-transparent text-[rgba(28,36,48,.55)] hover:bg-[rgba(255,255,255,.35)]"
                id="togglePassword"
                aria-label="Show or hide password"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                <EyeIcon
                  className={
                    passwordShown ? 'text-[rgba(31,120,209,.9)]' : 'text-[rgba(28,36,48,.55)]'
                  }
                />
              </button>
            </div>
            
            <div className="text-right -mt-2">
                <Link href="#" className={isLoading ? "pointer-events-none text-sm text-muted-foreground" : "text-sm text-primary hover:underline"}>
                    Forgot Password?
                </Link>
            </div>

            <button
              className="mt-[6px] h-[54px] cursor-pointer rounded-[10px] border-none bg-[linear-gradient(180deg,#2a8df1_0%,#1f78d1_55%,#1566b7_100%)] text-base font-semibold text-white shadow-[0_10px_18px_rgba(31,120,209,.25)] active:translate-y-px disabled:opacity-70"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <p
              className="mt-[2px] min-h-[18px] text-center text-sm text-red-600"
              id="msg"
              role="alert"
              aria-live="polite"
            >
              {message}
            </p>

            <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className={isLoading ? "pointer-events-none font-semibold text-muted-foreground" : "font-semibold text-primary hover:underline"}>
                  Sign up
                </Link>
              </div>
          </form>
        </section>
      </main>
    </div>
  );
}

    