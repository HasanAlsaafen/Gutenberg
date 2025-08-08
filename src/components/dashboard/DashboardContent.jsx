import React from "react";
import AddUser from "./AddUser";
import UsersList from "./UsersList";

import CreateServiceForm from "./CreateServiceForm";
import ServiceList from "./ServiceList";
import CreateSolution from "./CreateSolution";
import SolutionList from "./SolutionList";
import Support from "./Support";
import ApplicationOrders from "./ApplicationOrders";
import JobOrders from "./JobOrders";

const DashboardContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "AddUser":
        return <AddUser />;
      case "UserList":
        return <UsersList />;

      case "CreateService":
        return <CreateServiceForm />;
      case "ServiceList":
        return <ServiceList />;
      case "CreateSolution":
        return <CreateSolution />;
      case "SolutionList":
        return <SolutionList />;
      case "ApplicationOrders":
        return <ApplicationOrders />;
      case "JobOrders":
        return <JobOrders />;
      case "support":
        return <Support />;
      default:
        <AddUser />;
    }
  };

  return <section className="p-6 lg:p-8">{renderContent()}</section>;
};

export default DashboardContent;
