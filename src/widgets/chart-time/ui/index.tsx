'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-timeSpent)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-timeSpent)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis
              dataKey="timeSpent"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => parseMsToTime(value as number)}
            />
            <Area type="monotone" dataKey="timeSpent" fill="url(#fillDesktop)" />
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
