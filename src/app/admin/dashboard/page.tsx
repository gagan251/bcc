import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Home, MessageSquare, ShieldCheck, Users } from 'lucide-react';
import { ReviewsList } from '@/components/admin/reviews-list';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                Admin Dashboard
            </h1>
            <Button asChild variant="outline">
                <Link href="/"><Home className="mr-2 h-4 w-4" /> Go to Homepage</Link>
            </Button>
        </div>
        <p className="mt-2 text-muted-foreground">
            Manage user reviews, courses, and site content.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <MessageSquare className="h-6 w-6" />
                        User Reviews & Testimonials
                    </CardTitle>
                    <CardDescription>
                        Here are the latest submissions from your users.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ReviewsList />
                </CardContent>
            </Card>
        </div>
        <aside className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Management Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" /> Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" /> Manage Courses
                    </Button>
                    <p className="text-xs text-center text-muted-foreground pt-2">More tools coming soon.</p>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
