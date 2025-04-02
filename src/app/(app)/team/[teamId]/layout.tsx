import { SidebarInset, SidebarProvider } from '@/shared/shadcn/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar/ui';
import { HeaderBreadcrumbs } from '@/widgets/header-breadcrumbs/ui';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  return (
    <SidebarProvider>
      <AppSidebar teamId={teamId} />
      <SidebarInset>
        <HeaderBreadcrumbs />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
