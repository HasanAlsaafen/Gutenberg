import React from "react";
import AddUser from "./AddUser";
import UsersList from "./UsersList";

import CreateServiceForm from "./CreateServiceForm";
import ServiceList from "./ServiceList";
import CreateSolution from "./CreateSolution";
import SolutionList from "./SolutionList";
import Jobs from "./Jobs";
import Applications from "./ApplicationOrders";
import MeetingRequests from "./MeetingRequests";

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
      case "Jobs":
        return <Jobs />;
      case "Applications":
        return <Applications />;
      case "MeetingRequests":
        return <MeetingRequests />;
      default:
        <AddUser />;
    }
  };

  return <section className="p-6 lg:p-8">{renderContent()}</section>;
};

export default DashboardContent;
