import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WhatIfAnalysis from "./WhatIfAnalysis";
import AdvancedInsights from "./AdvancedInsights";
import AIRecommendations from "./AIRecommendations";

const FeatureSection = () => {
  return (
    <div className="space-y-12 py-8">
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
  );
};

export default FeatureSection;
