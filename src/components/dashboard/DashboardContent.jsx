import React from "react";
import DashboardOverview from "./DashboardOverview";
import CustomSoftware from "./CustomSoftware";
import ReadyTools from "./ReadyTools";
import AIIntegration from "./AIIntegration";
import SystemConsultation from "./SystemConsultation";
import ClientManagement from "./ClientManagement";
import ReviewOrders from "./ReviewOrders";
import ProjectTimeline from "./ProjectTimeline";
import Analytics from "./Analytics";
import Settings from "./Settings";
import Support from "./Support";

const DashboardContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "custom-software":
        return <CustomSoftware />;
      case "ready-tools":
        return <ReadyTools />;
      case "ai-integration":
        return <AIIntegration />;
      case "consultation":
        return <SystemConsultation />;
      case "clients":
        return <ClientManagement />;
      case "orders":
        return <ReviewOrders />;
      case "timeline":
        return <ProjectTimeline />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "support":
        return <Support />;
      default:
        return <DashboardOverview />;
    }
  };

  return <section className="p-6 lg:p-8">{renderContent()}</section>;
};

export default DashboardContent;
