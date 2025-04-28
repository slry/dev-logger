import { cn } from '@/shared/shadcn/utils';

function Skeleton({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
  );
}

export { Skeleton };
