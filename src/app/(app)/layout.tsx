import { SidebarInset, SidebarProvider } from '@/shared/shadcn/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar/ui';
import { HeaderBreadcrumbs } from '@/widgets/header-breadcrumbs/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderBreadcrumbs />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
