import { Sidebar } from './sidebar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="rounded-2xl border border-border/20 bg-background/50 p-4 shadow-lg backdrop-blur-lg">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
          <Sidebar />
          <main className="flex min-w-0 flex-col gap-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
