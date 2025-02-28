import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DownloadIcon,
  InfoIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ExpenditureForecastProps {
  title?: string;
  description?: string;
  forecastData?: ForecastData;
  categories?: string[];
  onExport?: () => void;
}

interface ForecastData {
  months: string[];
  predicted: number[];
  actual: number[];
  categoryBreakdown: {
    [key: string]: number[];
  };
}

const defaultCategories = [
  "Housing",
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
];

const defaultForecastData: ForecastData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  predicted: [2500, 2450, 2600, 2700, 2800, 2750],
  actual: [2550, 2500, 2650, 2750, 0, 0], // Last two months have no actual data yet
  categoryBreakdown: {
    Housing: [1200, 1200, 1200, 1250, 1250, 1250],
    Food: [400, 380, 420, 450, 470, 460],
    Transportation: [300, 290, 310, 320, 330, 320],
    Entertainment: [200, 180, 250, 230, 300, 270],
    Utilities: [400, 400, 420, 450, 450, 450],
  },
};

const ExpenditureForecast: React.FC<ExpenditureForecastProps> = ({
  title = "Expenditure Forecast",
  description = "6-month expenditure forecast with predicted vs. actual comparison",
  forecastData = defaultForecastData,
  categories = defaultCategories,
  onExport = () => console.log("Exporting data..."),
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedView, setSelectedView] = useState<string>("chart");

  // Mock chart rendering - in a real implementation, this would use Chart.js
  const renderChart = () => {
    return (
      <div className="w-full h-64 bg-slate-50 rounded-md p-4 relative">
        {/* This is a placeholder for the Chart.js implementation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Chart visualization would be rendered here using Chart.js
            </p>
            <div className="mt-4 flex gap-2 justify-center">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Predicted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Actual</span>
              </div>
            </div>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6">
          {forecastData.months.map((month, index) => (
            <div key={index} className="text-xs text-muted-foreground">
              {month}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 text-sm font-medium">Month</th>
              <th className="text-right py-2 px-4 text-sm font-medium">
                Predicted
              </th>
              <th className="text-right py-2 px-4 text-sm font-medium">
                Actual
              </th>
              <th className="text-right py-2 px-4 text-sm font-medium">
                Variance
              </th>
            </tr>
          </thead>
          <tbody>
            {forecastData.months.map((month, index) => {
              const predicted = forecastData.predicted[index];
              const actual = forecastData.actual[index] || 0;
              const variance = actual ? actual - predicted : 0;
              const variancePercent = actual
                ? ((variance / predicted) * 100).toFixed(1)
                : "-";

              return (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="py-2 px-4 text-sm">{month}</td>
                  <td className="text-right py-2 px-4 text-sm">
                    ${predicted.toLocaleString()}
                  </td>
                  <td className="text-right py-2 px-4 text-sm">
                    {actual ? `$${actual.toLocaleString()}` : "-"}
                  </td>
                  <td className="text-right py-2 px-4 text-sm">
                    {actual ? (
                      <div className="flex items-center justify-end gap-1">
                        <span
                          className={
                            variance < 0 ? "text-green-500" : "text-red-500"
                          }
                        >
                          {variance < 0 ? "-" : "+"}
                          {Math.abs(variance).toLocaleString()}
                        </span>
                        <span
                          className={
                            variance < 0 ? "text-green-500" : "text-red-500"
                          }
                        >
                          {variance < 0 ? (
                            <TrendingDownIcon size={14} />
                          ) : (
                            <TrendingUpIcon size={14} />
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({variancePercent}%)
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCategoryBreakdown = () => {
    // If a specific category is selected, show only that category's data
    if (selectedCategory !== "All") {
      const categoryData = forecastData.categoryBreakdown[selectedCategory];

      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">{selectedCategory} Breakdown</h3>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-medium">
                    Month
                  </th>
                  <th className="text-right py-2 px-4 text-sm font-medium">
                    Amount
                  </th>
                  <th className="text-right py-2 px-4 text-sm font-medium">
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecastData.months.map((month, index) => {
                  const amount = categoryData[index];
                  const totalForMonth = forecastData.predicted[index];
                  const percentage = ((amount / totalForMonth) * 100).toFixed(
                    1,
                  );

                  return (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="py-2 px-4 text-sm">{month}</td>
                      <td className="text-right py-2 px-4 text-sm">
                        ${amount.toLocaleString()}
                      </td>
                      <td className="text-right py-2 px-4 text-sm">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Otherwise show a summary of all categories
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Category Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const categoryData = forecastData.categoryBreakdown[category];
            const totalAmount = categoryData.reduce(
              (sum, amount) => sum + amount,
              0,
            );
            const totalBudget = forecastData.predicted.reduce(
              (sum, amount) => sum + amount,
              0,
            );
            const percentage = ((totalAmount / totalBudget) * 100).toFixed(1);

            return (
              <div key={category} className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category}</span>
                  <span className="text-sm text-muted-foreground">
                    {percentage}%
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold">
                  ${totalAmount.toLocaleString()}
                </div>
                <div className="mt-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    const totalPredicted = forecastData.predicted.reduce(
      (sum, amount) => sum + amount,
      0,
    );
    const totalActual = forecastData.actual
      .filter(Boolean)
      .reduce((sum, amount) => sum + amount, 0);
    const monthsWithActual = forecastData.actual.filter(Boolean).length;

    // Calculate average monthly expenditure
    const avgMonthly = totalPredicted / forecastData.months.length;

    // Find highest and lowest months
    let highestMonth = { month: "", amount: 0 };
    let lowestMonth = { month: "", amount: Number.MAX_VALUE };

    forecastData.predicted.forEach((amount, index) => {
      if (amount > highestMonth.amount) {
        highestMonth = { month: forecastData.months[index], amount };
      }
      if (amount < lowestMonth.amount) {
        lowestMonth = { month: forecastData.months[index], amount };
      }
    });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">
                Total Forecast (6 months)
              </div>
              <div className="text-2xl font-bold mt-2 flex items-center">
                <DollarSignIcon className="mr-1 h-5 w-5 text-muted-foreground" />
                {totalPredicted.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">
                Average Monthly
              </div>
              <div className="text-2xl font-bold mt-2 flex items-center">
                <DollarSignIcon className="mr-1 h-5 w-5 text-muted-foreground" />
                {avgMonthly.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Highest Month</div>
              <div className="text-2xl font-bold mt-2 flex items-center">
                <DollarSignIcon className="mr-1 h-5 w-5 text-muted-foreground" />
                {highestMonth.amount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {highestMonth.month}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Lowest Month</div>
              <div className="text-2xl font-bold mt-2 flex items-center">
                <DollarSignIcon className="mr-1 h-5 w-5 text-muted-foreground" />
                {lowestMonth.amount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {lowestMonth.month}
              </div>
            </CardContent>
          </Card>
        </div>

        {monthsWithActual > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium mb-2">
                Actual vs Predicted (Year to Date)
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Actual Spending
                  </div>
                  <div className="text-xl font-bold mt-1">
                    ${totalActual.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Predicted</div>
                  <div className="text-xl font-bold mt-1">
                    $
                    {forecastData.predicted
                      .slice(0, monthsWithActual)
                      .reduce((sum, amount) => sum + amount, 0)
                      .toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Variance</div>
                  <div className="text-xl font-bold mt-1 flex items-center">
                    {(() => {
                      const predictedYTD = forecastData.predicted
                        .slice(0, monthsWithActual)
                        .reduce((sum, amount) => sum + amount, 0);
                      const variance = totalActual - predictedYTD;
                      const isUnder = variance < 0;

                      return (
                        <>
                          <span
                            className={
                              isUnder ? "text-green-500" : "text-red-500"
                            }
                          >
                            {isUnder ? "-" : "+"}
                            {Math.abs(variance).toLocaleString()}
                          </span>
                          <span
                            className={
                              isUnder ? "text-green-500" : "text-red-500"
                            }
                            style={{ marginLeft: "4px" }}
                          >
                            {isUnder ? (
                              <TrendingDownIcon size={16} />
                            ) : (
                              <TrendingUpIcon size={16} />
                            )}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onExport}>
                  <DownloadIcon className="h-4 w-4" />
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
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  This forecast is based on your historical spending patterns
                  and demographic data
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4">
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedView === "chart" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView("chart")}
                >
                  Chart
                </Button>
                <Button
                  variant={selectedView === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView("table")}
                >
                  Table
                </Button>
              </div>
            </div>

            {selectedView === "chart" ? renderChart() : renderTable()}
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <div className="flex justify-between items-center mt-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {renderCategoryBreakdown()}
          </TabsContent>

          <TabsContent value="summary">{renderSummary()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenditureForecast;
