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

import { useGetLocPerFileQuery } from '../hooks/useGetLocPerFileQuery';

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

export const ChartFileLOC = () => {
  const { data } = useGetLocPerFileQuery();

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>LOC Per File Chart</CardTitle>
        <CardDescription>Lines of code added and removed per file</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={data} reverseStackOrder>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="filename" tickLine={false} tickMargin={10} axisLine={false} />
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
