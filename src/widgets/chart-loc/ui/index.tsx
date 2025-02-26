'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/shadcn/ui/card';
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
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>LOC Chart</CardTitle>
        <CardDescription>Lines of code added and removed per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
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
      </CardContent>
    </Card>
  );
};
