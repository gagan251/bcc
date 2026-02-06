
'use client';

import { AdminShell } from '@/components/admin/admin-shell';
import { ShieldCheck, Video, Library, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { OverviewStats } from '@/components/admin/overview-stats';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  return (
    <AdminShell
      pageTitle="Admin Dashboard"
      pageDescription="Manage live classes, library content, and view site statistics."
      headerIcon={<ShieldCheck className="h-8 w-8 text-primary" />}
    >
      <div className="space-y-8">
        <OverviewStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="flex flex-col hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Video className="h-6 w-6 text-accent" />
                Manage Live Classes
              </CardTitle>
              <CardDescription>
                Create, schedule, and manage all live class sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <p className="text-sm text-muted-foreground">Keep your students engaged with live, interactive sessions. View upcoming, live, and completed classes.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full md:w-auto">
                <Link href="/admin/live-classes">Go to Live Classes <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Library className="h-6 w-6 text-accent" />
                Manage Library
              </CardTitle>
              <CardDescription>
                Upload and organize study materials for your students.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">Provide valuable resources like PDFs, notes, and practice sheets to supplement your courses.</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full md:w-auto">
                    <Link href="/admin/library">Go to Library <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
