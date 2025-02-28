import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, ArrowRight, Calculator, RefreshCw } from "lucide-react";

interface WhatIfAnalysisProps {
  onCalculate?: (scenario: any) => void;
}

const WhatIfAnalysis = ({ onCalculate = () => {} }: WhatIfAnalysisProps) => {
  const [activeTab, setActiveTab] = useState("income");
  const [incomeChange, setIncomeChange] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("dining");
  const [expenseReduction, setExpenseReduction] = useState(10);
  const [inflationRate, setInflationRate] = useState(3);
  const [timeHorizon, setTimeHorizon] = useState("6");

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>What-If Analysis</CardTitle>
        </div>
        <CardDescription>
          Explore different financial scenarios and see how they impact your
          future expenditures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="income">Income Changes</TabsTrigger>
            <TabsTrigger value="expenses">Expense Reduction</TabsTrigger>
            <TabsTrigger value="economic">Economic Factors</TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="income-change">Income Change Percentage</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="income-change"
                    min={-50}
                    max={50}
                    step={1}
                    value={[incomeChange]}
                    onValueChange={(value) => setIncomeChange(value[0])}
                    className="flex-1"
                  />
                  <div className="w-16 flex items-center gap-1">
                    <Input
                      type="number"
                      value={incomeChange}
                      onChange={(e) => setIncomeChange(Number(e.target.value))}
                      className="w-12"
                    />
                    <span>%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {incomeChange > 0
                    ? `Increase your income by ${incomeChange}%`
                    : incomeChange < 0
                      ? `Decrease your income by ${Math.abs(incomeChange)}%`
                      : "No change to your income"}
                </p>
              </div>

              <div>
                <Label htmlFor="time-horizon">Time Horizon</Label>
                <Select
                  id="time-horizon"
                  value={timeHorizon}
                  onValueChange={setTimeHorizon}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">1 Year</SelectItem>
                    <SelectItem value="24">2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Projected Impact</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">
                          Current Monthly Expenses:
                        </span>
                        <span className="font-medium">$2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">New Monthly Expenses:</span>
                        <span className="font-medium">
                          $
                          {(2500 * (1 + (incomeChange * 0.2) / 100)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Savings Potential:</span>
                        <span className="font-medium text-green-600">
                          $
                          {(incomeChange > 0 ? incomeChange * 25 : 0).toFixed(
                            2,
                          )}
                          /month
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="expense-category">Expense Category</Label>
                <Select
                  id="expense-category"
                  value={expenseCategory}
                  onValueChange={setExpenseCategory}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dining">Dining Out</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="subscriptions">Subscriptions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expense-reduction">Reduction Percentage</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="expense-reduction"
                    min={0}
                    max={100}
                    step={5}
                    value={[expenseReduction]}
                    onValueChange={(value) => setExpenseReduction(value[0])}
                    className="flex-1"
                  />
                  <div className="w-16 flex items-center gap-1">
                    <Input
                      type="number"
                      value={expenseReduction}
                      onChange={(e) =>
                        setExpenseReduction(Number(e.target.value))
                      }
                      className="w-12"
                    />
                    <span>%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Reduce your{" "}
                  {expenseCategory.replace(/([A-Z])/g, " $1").toLowerCase()}{" "}
                  expenses by {expenseReduction}%
                </p>
              </div>

              <div className="pt-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Projected Savings</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">
                          Current {expenseCategory} Spending:
                        </span>
                        <span className="font-medium">
                          $
                          {expenseCategory === "dining"
                            ? "450"
                            : expenseCategory === "entertainment"
                              ? "320"
                              : expenseCategory === "shopping"
                                ? "380"
                                : expenseCategory === "transportation"
                                  ? "300"
                                  : expenseCategory === "utilities"
                                    ? "250"
                                    : "120"}
                          /month
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">
                          After {expenseReduction}% Reduction:
                        </span>
                        <span className="font-medium">
                          $
                          {(
                            Number(
                              expenseCategory === "dining"
                                ? "450"
                                : expenseCategory === "entertainment"
                                  ? "320"
                                  : expenseCategory === "shopping"
                                    ? "380"
                                    : expenseCategory === "transportation"
                                      ? "300"
                                      : expenseCategory === "utilities"
                                        ? "250"
                                        : "120",
                            ) *
                            (1 - expenseReduction / 100)
                          ).toFixed(2)}
                          /month
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Savings:</span>
                        <span className="font-medium text-green-600">
                          $
                          {(
                            Number(
                              expenseCategory === "dining"
                                ? "450"
                                : expenseCategory === "entertainment"
                                  ? "320"
                                  : expenseCategory === "shopping"
                                    ? "380"
                                    : expenseCategory === "transportation"
                                      ? "300"
                                      : expenseCategory === "utilities"
                                        ? "250"
                                        : "120",
                            ) *
                            (expenseReduction / 100)
                          ).toFixed(2)}
                          /month
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Savings:</span>
                        <span className="font-medium text-green-600">
                          $
                          {(
                            Number(
                              expenseCategory === "dining"
                                ? "450"
                                : expenseCategory === "entertainment"
                                  ? "320"
                                  : expenseCategory === "shopping"
                                    ? "380"
                                    : expenseCategory === "transportation"
                                      ? "300"
                                      : expenseCategory === "utilities"
                                        ? "250"
                                        : "120",
                            ) *
                            (expenseReduction / 100) *
                            12
                          ).toFixed(2)}
                          /year
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="economic" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="inflation-rate">Inflation Rate</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="inflation-rate"
                    min={0}
                    max={15}
                    step={0.5}
                    value={[inflationRate]}
                    onValueChange={(value) => setInflationRate(value[0])}
                    className="flex-1"
                  />
                  <div className="w-16 flex items-center gap-1">
                    <Input
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-12"
                    />
                    <span>%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Simulate an inflation rate of {inflationRate}%
                </p>
              </div>

              <div>
                <Label htmlFor="econ-time-horizon">Time Horizon</Label>
                <Select
                  id="econ-time-horizon"
                  value={timeHorizon}
                  onValueChange={setTimeHorizon}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">1 Year</SelectItem>
                    <SelectItem value="24">2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Inflation Impact</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">
                          Current Monthly Expenses:
                        </span>
                        <span className="font-medium">$2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">
                          After {timeHorizon}{" "}
                          {Number(timeHorizon) > 1
                            ? Number(timeHorizon) >= 12
                              ? "Year" + (Number(timeHorizon) > 12 ? "s" : "")
                              : "Months"
                            : "Month"}
                          :
                        </span>
                        <span className="font-medium">
                          $
                          {(
                            2500 *
                            Math.pow(
                              1 + inflationRate / 100,
                              Number(timeHorizon) / 12,
                            )
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Additional Cost:</span>
                        <span className="font-medium text-red-600">
                          $
                          {(
                            2500 *
                              Math.pow(
                                1 + inflationRate / 100,
                                Number(timeHorizon) / 12,
                              ) -
                            2500
                          ).toFixed(2)}
                          /{Number(timeHorizon) >= 12 ? "year" : "month"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            className="gap-2"
            onClick={() =>
              onCalculate({
                type: activeTab,
                value:
                  activeTab === "income"
                    ? incomeChange
                    : activeTab === "expenses"
                      ? expenseReduction
                      : inflationRate,
              })
            }
          >
            <Calculator className="h-4 w-4" />
            Calculate Impact
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfAnalysis;
