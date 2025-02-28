import React from "react";
import Header from "./Header";
import SpendingTrendsChart from "./SpendingTrendsChart";
import ExpenditureForecast from "./ExpenditureForecast";
import ChatbotInterface from "./ChatbotInterface";
import UserInputForm from "./UserInputForm";
import WhatIfAnalysis from "./WhatIfAnalysis";
import AdvancedInsights from "./AdvancedInsights";
import AIRecommendations from "./AIRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  Zap,
  BarChart4,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Financial Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered expenditure forecasting and financial insights
            </p>
          </div>

          <Card className="w-full md:w-auto bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI Insight</p>
                  <p className="text-xs text-muted-foreground">
                    You could save $320/month by optimizing your subscriptions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpendingTrendsChart />
          <ExpenditureForecast />
        </div>

        <div
          className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
          id="chatbot-interface"
        >
          <ChatbotInterface />
          <UserInputForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center justify-center">
            <Sparkles className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">What-If Analysis</h3>
            <p className="text-center text-muted-foreground max-w-md mb-4">
              Explore different financial scenarios and see how they impact your
              future expenditures.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => (window.location.href = "#what-if-analysis")}
            >
              Try Scenarios
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center justify-center">
            <BarChart4 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Advanced Insights</h3>
            <p className="text-center text-muted-foreground max-w-md mb-4">
              Get detailed analysis of your spending patterns and trends.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => (window.location.href = "#advanced-insights")}
            >
              View Insights
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center justify-center">
            <Zap className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
            <p className="text-center text-muted-foreground max-w-md mb-4">
              Personalized suggestions to optimize your finances.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => (window.location.href = "#ai-recommendations")}
            >
              Get Recommendations
            </Button>
          </Card>
        </div>

        <div className="mt-12 space-y-12">
          <section id="what-if-analysis" className="scroll-mt-20">
            <WhatIfAnalysis />
          </section>

          <section id="advanced-insights" className="scroll-mt-20">
            <AdvancedInsights />
          </section>

          <section id="ai-recommendations" className="scroll-mt-20">
            <AIRecommendations />
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
