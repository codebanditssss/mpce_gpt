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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart4,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  PiggyBank,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Lightbulb,
  DollarSign,
} from "lucide-react";

interface AdvancedInsightsProps {
  data?: any;
}

const AdvancedInsights = ({ data }: AdvancedInsightsProps) => {
  const [activeTab, setActiveTab] = useState("budget");

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-primary" />
          <CardTitle>Advanced Financial Insights</CardTitle>
        </div>
        <CardDescription>
          AI-powered analysis and recommendations based on your financial
          profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
            <TabsTrigger value="savings">Savings Opportunities</TabsTrigger>
            <TabsTrigger value="investment">Investment Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Budget Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-primary/20">
                      <div
                        className="absolute inset-0 rounded-full border-8 border-primary"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        }}
                      ></div>
                      <span className="text-3xl font-bold">78</span>
                    </div>
                    <Badge className="mt-4" variant="outline">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      Good
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Your budget is well-structured but has room for
                      improvement
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Spending Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Housing (40%)</span>
                      <span className="text-sm text-muted-foreground">
                        $1,200
                      </span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Food (15%)</span>
                      <span className="text-sm text-muted-foreground">
                        $450
                      </span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Transportation (10%)</span>
                      <span className="text-sm text-muted-foreground">
                        $300
                      </span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Entertainment (8%)</span>
                      <span className="text-sm text-muted-foreground">
                        $240
                      </span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">
                    AI Budget Recommendations
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Entertainment spending is 20% higher than recommended
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Consider reducing dining out expenses by $80/month
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Housing costs are within optimal range
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your housing expenses are 32% of income (recommended:
                      30-35%)
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <TrendingDown className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Subscription services are higher than peers
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You could save $45/month by optimizing streaming services
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <PiggyBank className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Potential Monthly Savings</h3>
                    <p className="text-2xl font-bold mt-1">$320</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on optimizing current expenses
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Time to Reach Savings Goal</h3>
                    <p className="text-2xl font-bold mt-1">14 months</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      At current savings rate of $500/month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <CreditCard className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Debt Reduction Potential</h3>
                    <p className="text-2xl font-bold mt-1">$4,800/year</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      By reallocating optimized expenses
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Top Savings Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Subscription Services</p>
                        <p className="text-sm text-muted-foreground">
                          Cancel unused streaming services
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">$45/mo</p>
                      <p className="text-xs text-muted-foreground">
                        Easy to implement
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Dining Out</p>
                        <p className="text-sm text-muted-foreground">
                          Reduce restaurant meals by 30%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">$120/mo</p>
                      <p className="text-xs text-muted-foreground">
                        Moderate effort
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Utilities</p>
                        <p className="text-sm text-muted-foreground">
                          Energy-saving adjustments
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">$35/mo</p>
                      <p className="text-xs text-muted-foreground">
                        Easy to implement
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Transportation</p>
                        <p className="text-sm text-muted-foreground">
                          Carpooling or public transit
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">$80/mo</p>
                      <p className="text-xs text-muted-foreground">
                        Requires planning
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Investment Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Tolerance</span>
                      <Badge>Moderate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Investment Horizon</span>
                      <span className="text-sm font-medium">10-15 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Monthly Investment Capacity
                      </span>
                      <span className="text-sm font-medium">$300-$500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current Investments</span>
                      <span className="text-sm font-medium">$12,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Recommended Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Index Funds (50%)</span>
                      <span className="text-sm text-muted-foreground">
                        $150-$250/mo
                      </span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Bonds (20%)</span>
                      <span className="text-sm text-muted-foreground">
                        $60-$100/mo
                      </span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Individual Stocks (20%)</span>
                      <span className="text-sm text-muted-foreground">
                        $60-$100/mo
                      </span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Cash/Emergency (10%)</span>
                      <span className="text-sm text-muted-foreground">
                        $30-$50/mo
                      </span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">
                    AI Investment Recommendations
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-start">
                  <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Start a Roth IRA</p>
                    <p className="text-xs text-muted-foreground">
                      Tax advantages make this ideal for your income bracket
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Increase 401(k) contributions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You're not maximizing employer match (currently at 4% vs.
                      6% available)
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Consider low-cost index funds
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Based on your risk profile, a total market index fund
                      would align with your goals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button className="gap-2">
                <PiggyBank className="h-4 w-4" />
                Get Detailed Investment Plan
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedInsights;
