
import { ReviewsList } from '@/components/admin/reviews-list';
import { AdminShell } from '@/components/admin/admin-shell';
import { ShieldCheck, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewStats } from '@/components/admin/overview-stats';

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard-theme">
      <AdminShell
        pageTitle="Admin Dashboard"
        pageDescription="Manage user reviews, courses, and site content."
        headerIcon={<ShieldCheck className="h-8 w-8 text-primary" />}
      >
        <div className="space-y-8">
            <OverviewStats />

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
      </AdminShell>
    </div>
  );
}
