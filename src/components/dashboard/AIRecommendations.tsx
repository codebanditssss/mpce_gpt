import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  PiggyBank,
  CreditCard,
  BarChart4,
} from "lucide-react";

interface AIRecommendationsProps {
  onViewDetails?: (id: string) => void;
}

const AIRecommendations = ({
  onViewDetails = () => {},
}: AIRecommendationsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const recommendations = [
    {
      id: "rec1",
      title: "Optimize Subscription Services",
      description:
        "You're spending $65/month on overlapping streaming services. Consider consolidating to save $45/month.",
      impact: "high",
      category: "savings",
      timeToImplement: "quick",
      potentialSavings: 45,
      status: "new",
    },
    {
      id: "rec2",
      title: "Increase Retirement Contributions",
      description:
        "Increasing your 401(k) contribution by 2% would optimize your tax benefits while still maintaining your budget.",
      impact: "high",
      category: "investment",
      timeToImplement: "medium",
      potentialGrowth: "$45,000 over 20 years",
      status: "new",
    },
    {
      id: "rec3",
      title: "Refinance Existing Loans",
      description:
        "Current interest rates are favorable for refinancing your existing loans, potentially saving you $120/month.",
      impact: "high",
      category: "debt",
      timeToImplement: "complex",
      potentialSavings: 120,
      status: "new",
    },
    {
      id: "rec4",
      title: "Adjust Grocery Budget Strategy",
      description:
        "Based on your spending patterns, meal planning and bulk purchasing could reduce your grocery expenses by 15%.",
      impact: "medium",
      category: "savings",
      timeToImplement: "medium",
      potentialSavings: 75,
      status: "implemented",
    },
    {
      id: "rec5",
      title: "Emergency Fund Allocation",
      description:
        "Your emergency fund is below the recommended 3-month expenses. Consider allocating $200/month to reach this goal.",
      impact: "medium",
      category: "savings",
      timeToImplement: "quick",
      status: "in-progress",
    },
    {
      id: "rec6",
      title: "Tax-Loss Harvesting Opportunity",
      description:
        "There's an opportunity to optimize your investment tax situation through strategic tax-loss harvesting.",
      impact: "medium",
      category: "investment",
      timeToImplement: "complex",
      potentialSavings: 350,
      status: "new",
    },
  ];

  const filteredRecommendations =
    activeCategory === "all"
      ? recommendations
      : recommendations.filter((rec) => rec.category === activeCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getTimeIcon = (time: string) => {
    switch (time) {
      case "quick":
        return <Clock className="h-4 w-4 text-green-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "complex":
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            New
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            In Progress
          </Badge>
        );
      case "implemented":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Implemented
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "savings":
        return <PiggyBank className="h-4 w-4" />;
      case "investment":
        return <TrendingUp className="h-4 w-4" />;
      case "debt":
        return <CreditCard className="h-4 w-4" />;
      case "budget":
        return <BarChart4 className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle>AI Recommendations</CardTitle>
        </div>
        <CardDescription>
          Personalized financial recommendations based on your spending patterns
          and goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
            className="flex-shrink-0"
          >
            All Recommendations
          </Button>
          <Button
            variant={activeCategory === "savings" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("savings")}
            className="flex-shrink-0"
          >
            <PiggyBank className="h-4 w-4 mr-2" />
            Savings
          </Button>
          <Button
            variant={activeCategory === "investment" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("investment")}
            className="flex-shrink-0"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Investments
          </Button>
          <Button
            variant={activeCategory === "debt" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("debt")}
            className="flex-shrink-0"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Debt Management
          </Button>
        </div>

        <div className="space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(recommendation.category)}
                      <h3 className="font-medium">{recommendation.title}</h3>
                    </div>
                    {getStatusBadge(recommendation.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {recommendation.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className={getImpactColor(recommendation.impact)}>
                        {recommendation.impact.charAt(0).toUpperCase() +
                          recommendation.impact.slice(1)}{" "}
                        Impact
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTimeIcon(recommendation.timeToImplement)}
                      <span>
                        {recommendation.timeToImplement
                          .charAt(0)
                          .toUpperCase() +
                          recommendation.timeToImplement.slice(1)}{" "}
                        to implement
                      </span>
                    </div>
                    {recommendation.potentialSavings && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">
                          Save ${recommendation.potentialSavings}/month
                        </span>
                      </div>
                    )}
                    {recommendation.potentialGrowth && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-600">
                          {recommendation.potentialGrowth}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="p-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary gap-1"
                    onClick={() => onViewDetails(recommendation.id)}
                  >
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span>
            Recommendations updated daily based on your financial activity
          </span>
        </div>
        <Button variant="outline" className="gap-1">
          <ArrowRight className="h-4 w-4" />
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIRecommendations;
