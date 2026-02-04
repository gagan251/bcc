import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.94 11c-.04-.69-.1-1.38-.1-2.06 0-1.23.23-2.4.63-3.49-.4-.89-.9-1.74-1.49-2.51l-2.02 1.63c.2.62.35 1.28.44 1.96h-4.39v3.47h6.64c-.23 1.07-.69 2.03-1.38 2.8l-2.02 1.63c1.23-1.14 2.1-2.73 2.4-4.43z"/>
        <path d="M3.06 13A8.99 8.99 0 0 0 12 21.9a8.97 8.97 0 0 0 6.94-3.23l-2.02-1.63A5.4 5.4 0 0 1 12 18.5a5.4 5.4 0 0 1-5.04-3.56H3.06z"/>
        <path d="M12 5.5a5.4 5.4 0 0 1 3.79 1.43l2.25-2.25A9 9 0 0 0 3.06 7l3.9 3.04A5.4 5.4 0 0 1 12 5.5z"/>
    </svg>
  );

export function LoginCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Student Login</CardTitle>
        <CardDescription>Access your dashboard</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild className="border border-transparent hover:bg-transparent hover:text-primary hover:border-primary">
            <Link href="/login">Student Login</Link>
        </Button>
        <Button variant="outline" asChild>
            <Link href="/login">
                <GoogleIcon className="mr-2 h-4 w-4" /> Google Login
            </Link>
        </Button>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
        </div>
        <Button variant="secondary" asChild>
            <Link href="/admin/login">Admin Login</Link>
        </Button>
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:bg-transparent" variant="outline" asChild>
            <Link href="/signup">Enroll Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
