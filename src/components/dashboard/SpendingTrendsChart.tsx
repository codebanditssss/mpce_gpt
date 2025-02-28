import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, ZoomIn, ZoomOut, Filter } from "lucide-react";

interface SpendingTrendsChartProps {
  title?: string;
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  timeRanges?: string[];
  categories?: string[];
}

const SpendingTrendsChart: React.FC<SpendingTrendsChartProps> = ({
  title = "Spending Trends",
  data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Housing",
        data: [1200, 1250, 1200, 1300, 1250, 1275],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
      },
      {
        label: "Food",
        data: [450, 500, 480, 520, 490, 510],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 1)",
      },
      {
        label: "Transportation",
        data: [300, 320, 290, 310, 330, 300],
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderColor: "rgba(245, 158, 11, 1)",
      },
      {
        label: "Entertainment",
        data: [200, 250, 180, 220, 240, 210],
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        borderColor: "rgba(139, 92, 246, 1)",
      },
    ],
  },
  timeRanges = ["Last 6 Months", "Last Year", "Last 2 Years", "Custom"],
  categories = [
    "All Categories",
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
  ],
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 6 Months");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [chartType, setChartType] = useState("line");

  // This would be replaced with actual chart rendering using Chart.js
  const renderChart = () => {
    return (
      <div className="relative h-[300px] w-full bg-white rounded-md p-4 flex items-center justify-center">
        {/* Placeholder for actual Chart.js implementation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-full h-full flex items-end justify-around px-6 pt-6">
            {data.labels.map((label, index) => {
              // Calculate the max height for visualization
              const maxValue = Math.max(
                ...data.datasets.map((dataset) => Math.max(...dataset.data)),
              );

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex space-x-1">
                    {data.datasets.map((dataset, dataIndex) => {
                      const height = (dataset.data[index] / maxValue) * 200;
                      return (
                        <div
                          key={dataIndex}
                          className="w-4 rounded-t-md"
                          style={{
                            height: `${height}px`,
                            backgroundColor: dataset.borderColor,
                            opacity: chartType === "bar" ? 0.8 : 0,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{label}</div>
                </div>
              );
            })}
          </div>

          {chartType === "line" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg text-gray-400">
                Line Chart Visualization
              </div>
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.5 }}
              >
                {data.datasets.map((dataset, datasetIndex) => {
                  const points = data.labels
                    .map((_, index) => {
                      const maxValue = Math.max(
                        ...data.datasets.map((ds) => Math.max(...ds.data)),
                      );
                      const x = (index / (data.labels.length - 1)) * 100;
                      const y = 100 - (dataset.data[index] / maxValue) * 80;
                      return `${x}% ${y}%`;
                    })
                    .join(" ");

                  return (
                    <polyline
                      key={datasetIndex}
                      points={points}
                      fill="none"
                      stroke={dataset.borderColor}
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-gray-50 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[150px]">
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="default" className="flex-shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <Tabs value={chartType} onValueChange={setChartType} className="w-full">
          <TabsList className="grid w-[200px] grid-cols-2 mb-4">
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
          </TabsList>

          <TabsContent value="line" className="mt-0">
            {renderChart()}
          </TabsContent>

          <TabsContent value="bar" className="mt-0">
            {renderChart()}
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span className="text-xs text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingTrendsChart;
