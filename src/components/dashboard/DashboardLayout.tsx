// import React from "react";
// import Header from "./Header";
// import SpendingTrendsChart from "./SpendingTrendsChart";
// import ExpenditureForecast from "./ExpenditureForecast";
// import ChatbotInterface from "./ChatbotInterface";
// import UserInputForm from "./UserInputForm";
// import WhatIfAnalysis from "./WhatIfAnalysis";
// import AdvancedInsights from "./AdvancedInsights";
// import AIRecommendations from "./AIRecommendations";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Brain,
//   Sparkles,
//   Zap,
//   BarChart4,
//   TrendingUp,
//   Lightbulb,
// } from "lucide-react";

// const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="container mx-auto py-6 px-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold">Financial Dashboard</h1>
//             <p className="text-muted-foreground mt-1">
//               AI-powered expenditure forecasting and financial insights
//             </p>
//           </div>

//           <Card className="w-full md:w-auto bg-primary/5 border-primary/20">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="bg-primary/10 p-2 rounded-full">
//                   <Lightbulb className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">AI Insight</p>
//                   <p className="text-xs text-muted-foreground">
//                     You could save $320/month by optimizing your subscriptions
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <SpendingTrendsChart />
//           <ExpenditureForecast />
//         </div>

//         <div
//           className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
//           id="chatbot-interface"
//         >
//           <ChatbotInterface />
//           <UserInputForm />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="p-6 flex flex-col items-center justify-center">
//             <Sparkles className="h-12 w-12 text-primary mb-4" />
//             <h3 className="text-xl font-bold mb-2">What-If Analysis</h3>
//             <p className="text-center text-muted-foreground max-w-md mb-4">
//               Explore different financial scenarios and see how they impact your
//               future expenditures.
//             </p>
//             <Button
//               variant="outline"
//               className="mt-2"
//               onClick={() => (window.location.href = "#what-if-analysis")}
//             >
//               Try Scenarios
//             </Button>
//           </Card>

//           <Card className="p-6 flex flex-col items-center justify-center">
//             <BarChart4 className="h-12 w-12 text-primary mb-4" />
//             <h3 className="text-xl font-bold mb-2">Advanced Insights</h3>
//             <p className="text-center text-muted-foreground max-w-md mb-4">
//               Get detailed analysis of your spending patterns and trends.
//             </p>
//             <Button
//               variant="outline"
//               className="mt-2"
//               onClick={() => (window.location.href = "#advanced-insights")}
//             >
//               View Insights
//             </Button>
//           </Card>

//           <Card className="p-6 flex flex-col items-center justify-center">
//             <Zap className="h-12 w-12 text-primary mb-4" />
//             <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
//             <p className="text-center text-muted-foreground max-w-md mb-4">
//               Personalized suggestions to optimize your finances.
//             </p>
//             <Button
//               variant="outline"
//               className="mt-2"
//               onClick={() => (window.location.href = "#ai-recommendations")}
//             >
//               Get Recommendations
//             </Button>
//           </Card>
//         </div>

//         <div className="mt-12 space-y-12">
//           <section id="what-if-analysis" className="scroll-mt-20">
//             <WhatIfAnalysis />
//           </section>

//           <section id="advanced-insights" className="scroll-mt-20">
//             <AdvancedInsights />
//           </section>

//           <section id="ai-recommendations" className="scroll-mt-20">
//             <AIRecommendations />
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

import React from "react";
import { User } from '@supabase/supabase-js';
import Header from "./Header";
import SpendingTrendsChart from "./SpendingTrendsChart";
import ExpenditureForecast from "./ExpenditureForecast";
import ChatbotInterface from "./ChatbotInterface";
import UserInputForm from "./UserInputForm";
import WhatIfAnalysis from "./WhatIfAnalysis";
import AdvancedInsights from "./AdvancedInsights";
import AIRecommendations from "./AIRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  Zap,
  BarChart4,
  TrendingUp,
  Lightbulb,
  Plus,
  MessageSquare,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { Conversation } from "../../types/supabase";

interface DashboardLayoutProps {
  user: User;
  signOut: () => Promise<void>;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  setCurrentConversation: (conversation: Conversation) => void;
  newConversation: (title: string) => Promise<Conversation | null>;
}

const DashboardLayout = ({
  user,
  signOut,
  conversations,
  currentConversation,
  setCurrentConversation,
  newConversation
}: DashboardLayoutProps) => {
  const handleNewChat = async () => {
    await newConversation("New Conversation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} signOut={signOut} />
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

        <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6" id="chatbot-interface">
          {/* Conversations Sidebar */}
          <Card className="lg:col-span-1 h-[500px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center">
                <span>Conversations</span>
                <Button variant="outline" size="sm" onClick={handleNewChat}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </CardTitle>
            </CardHeader>
            <div className="overflow-y-auto flex-1 px-4 pb-4">
              {conversations.length === 0 ? (
                <p className="text-sm text-center text-muted-foreground p-4">
                  No conversations yet. Start a new chat!
                </p>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setCurrentConversation(conv)}
                      className={`p-3 rounded-md cursor-pointer flex gap-3 items-start ${
                        currentConversation?.id === conv.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted"
                      }`}
                    >
                      <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{conv.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(conv.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Chatbot Interface */}
          <Card className="lg:col-span-2 h-[500px]">
            {currentConversation ? (
              <ChatbotInterface
                title={currentConversation.title}
                conversationId={currentConversation.id}
                userId={user.id}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">Select a Conversation</h3>
                <p className="text-center text-muted-foreground max-w-md mb-4">
                  Choose an existing conversation from the sidebar or start a new one.
                </p>
                <Button onClick={handleNewChat}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Conversation
                </Button>
              </div>
            )}
          </Card>
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