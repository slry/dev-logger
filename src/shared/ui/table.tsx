import { forwardRef } from 'react';

import { cn } from '../shadcn/utils';

interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  wrapperClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ wrapperClassName, className, ...props }, ref) => {
    return (
      <div className={cn('rounded-lg border', wrapperClassName)}>
        <table
          ref={ref}
          className={cn(
            'max-w-[800px] table-fixed border-collapse border-spacing-4',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Table.displayName = 'Table';

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<'thead'>
>(({ className, ...props }, ref) => {
  return <thead ref={ref} className={cn('', className)} {...props} />;
});
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<'tbody'>
>(({ className, ...props }, ref) => {
  return <tbody ref={ref} className={cn('', className)} {...props} />;
});
TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithoutRef<'tr'>
>(({ className, ...props }, ref) => {
  return <tr ref={ref} className={cn('w-full border-b', className)} {...props} />;
});
TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<'th'>
>(({ className, ...props }, ref) => {
  return <th ref={ref} className={cn('p-4 text-start', className)} {...props} />;
});
TableHead.displayName = 'TableHead';

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<'td'>
>(({ className, ...props }, ref) => {
  return <td ref={ref} className={cn('p-4', className)} {...props} />;
});
TableCell.displayName = 'TableCell';
