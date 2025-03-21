'use client';

import { Label, Pie, PieChart } from 'recharts';

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

import { useGetTotalLoc } from '../hooks/useGetTotalLoc';

const chartConfig = {
  locAdded: {
    label: 'Lines Added',
    color: '#2563eb',
  },
  locRemoved: {
    label: 'Lines Deleted',
    color: '#60a5fa',
  },
  locChanged: {
    label: 'Lines Changed',
  },
} satisfies ChartConfig;

export const ChartTotalLOC = () => {
  const { data } = useGetTotalLoc();

  if (!data) {
    return null;
  }

  const pieData = Object.entries(data).map(([operation, loc]) => ({
    operation,
    locChanged: loc,
    fill: `var(--color-${operation})`,
  }));

  const totalLocChanged = pieData.reduce((acc, { locChanged }) => acc + locChanged, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total LOC Changed</CardTitle>
        <CardDescription>
          Total lines of code changed during the whole project period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px] w-full"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={pieData}
              dataKey="locChanged"
              nameKey="operation"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalLocChanged.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          LOC Changed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
