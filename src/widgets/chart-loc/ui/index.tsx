'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/shadcn/ui/chart';

import { useGetLocAddedRemovedQuery } from '../hooks/useGetLocAddedRemovedQuery';

const chartConfig = {
  locAdded: {
    label: 'Added',
    color: '#2563eb',
  },
  locRemoved: {
    label: 'Removed',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export const ChartLOC = () => {
  const { data } = useGetLocAddedRemovedQuery();

  if (!data) {
    return null;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[400px]">
      <BarChart accessibilityLayer data={data} reverseStackOrder>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="datetime" tickLine={false} tickMargin={10} axisLine={false} />
        <Bar
          dataKey="locAdded"
          fill="var(--color-locAdded)"
          radius={[4, 4, 0, 0]}
          stackId="a"
        />
        <Bar dataKey="locRemoved" fill="var(--color-locRemoved)" stackId="a" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      </BarChart>
    </ChartContainer>
  );
};
