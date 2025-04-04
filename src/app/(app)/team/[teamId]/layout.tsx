import { redirect } from 'next/navigation';

import { validateTeamId } from '@/shared/api/validate-team-id';
import { TeamProvider } from '@/shared/providers/team-context';
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
  const { valid, teamId: validatedTeamId } = await validateTeamId(teamId);
  if (!valid || !validatedTeamId) redirect('/team/personal/dashboard');
  return (
    <SidebarProvider>
      <TeamProvider teamId={validatedTeamId}>
        <AppSidebar teamId={validatedTeamId} />
        <SidebarInset>
          <HeaderBreadcrumbs teamId={validatedTeamId} />
          <div>{children}</div>
        </SidebarInset>
      </TeamProvider>
    </SidebarProvider>
  );
}
