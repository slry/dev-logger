'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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

import { useGetTimeSpentPerDayQuery } from '../hooks/useGetTimeSpentPerDayQuery';
import { parseMsToTime } from '../lib/parseTime';

const chartConfig = {
  timeSpent: {
    label: 'Time Spent',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export const ChartTimeSpentPerDay = () => {
  const { data } = useGetTimeSpentPerDayQuery();

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Spent Per Day</CardTitle>
        <CardDescription>Time spent in IDE per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
            <Area dataKey="timeSpent" fill="var(--color-timeSpent)" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(
                    value,
                    _name,
                    _item,
                    _index,
                    _payload,
                    BaseFormatterComponent,
                  ) => {
                    return (
                      <BaseFormatterComponent>
                        {parseMsToTime(value as number)}
                      </BaseFormatterComponent>
                    );
                  }}
                  indicator="line"
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
