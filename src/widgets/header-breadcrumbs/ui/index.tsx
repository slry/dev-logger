'use client';

import { Separator } from '@radix-ui/react-separator';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/shadcn/ui/breadcrumb';
import { SidebarTrigger } from '@/shared/shadcn/ui/sidebar';

import { pathToBreadcrumb } from '../model';

export const HeaderBreadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = pathToBreadcrumb(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((b, i) => (
              <Fragment key={i}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>{b.label}</BreadcrumbLink>
                </BreadcrumbItem>
                {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
