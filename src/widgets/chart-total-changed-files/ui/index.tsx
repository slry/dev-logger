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

import { useGetFileOperationsQuery } from '../hooks/useGetFileOperationsQuery';

const chartConfig = {
  CREATE: {
    label: 'Files Created',
    color: '#2563eb',
  },
  DELETE: {
    label: 'Files Deleted',
    color: '#60a5fa',
  },
  EDIT: {
    label: 'Files Edited',
    color: '#93c5fd',
  },
  filesChanged: {
    label: 'Files Changed',
  },
} satisfies ChartConfig;

export const ChartTotalChangedFiles = () => {
  const { data } = useGetFileOperationsQuery();

  if (!data) {
    return null;
  }

  const pieData = Object.entries(Object.groupBy(data, ({ operation }) => operation)).map(
    ([operation, files]) => ({
      operation,
      filesChanged: files.length,
      fill: `var(--color-${operation})`,
    }),
  );

  const totalFilesChanged = pieData.reduce(
    (acc, { filesChanged }) => acc + filesChanged,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Changed Files</CardTitle>
        <CardDescription>Total changed files during whole project period</CardDescription>
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
              dataKey="filesChanged"
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
                          {totalFilesChanged.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Files Changed
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
