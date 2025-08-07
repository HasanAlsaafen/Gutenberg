import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaExclamationTriangle,
  FaDownload,
  FaEdit,
} from "react-icons/fa";

const ReviewOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample orders data
  const [orders] = useState([
    {
      id: "ORD-001",
      customerName: "John Smith",
      email: "john.smith@email.com",
      service: "Custom Software Development",
      status: "pending",
      amount: "$15,000",
      date: "2025-08-05",
      priority: "high",
      description: "E-commerce platform with payment integration",
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      email: "sarah.j@company.com",
      service: "AI Integration",
      status: "in-review",
      amount: "$8,500",
      date: "2025-08-04",
      priority: "medium",
      description: "Machine learning model for data analysis",
    },
    {
      id: "ORD-003",
      customerName: "Tech Innovations Ltd",
      email: "contact@techinnovations.com",
      service: "System Consultation",
      status: "approved",
      amount: "$3,200",
      date: "2025-08-03",
      priority: "low",
      description: "Infrastructure assessment and recommendations",
    },
    {
      id: "ORD-004",
      customerName: "Digital Solutions Co",
      email: "info@digitalsolutions.com",
      service: "Ready-Made Tools",
      status: "rejected",
      amount: "$2,100",
      date: "2025-08-02",
      priority: "medium",
      description: "CRM system implementation",
    },
    {
      id: "ORD-005",
      customerName: "StartupXYZ",
      email: "hello@startupxyz.com",
      service: "Custom Software Development",
      status: "pending",
      amount: "$12,000",
      date: "2025-08-01",
      priority: "high",
      description: "Mobile application development for iOS and Android",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="w-3 h-3" />;
      case "in-review":
        return <FaEye className="w-3 h-3" />;
      case "approved":
        return <FaCheck className="w-3 h-3" />;
      case "rejected":
        return <FaTimes className="w-3 h-3" />;
      default:
        return <FaClock className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    // Here you would implement the actual order action logic
  };

  return (
    <main className="space-y-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Review Orders</h1>
        <p className="text-purple-100">
          Manage and review customer orders and service requests
        </p>
      </header>

      {/* Filters and Search */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <fieldset className="relative flex-1 max-w-md">
            <legend className="sr-only">Search Orders</legend>
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, customers, or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              aria-label="Search orders"
            />
          </fieldset>

          <nav className="flex items-center gap-4">
            <fieldset className="flex items-center gap-2">
              <legend className="sr-only">Filter Options</legend>
              <FaFilter className="text-gray-400" />
              <label htmlFor="status-filter" className="sr-only">
                Filter by status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </fieldset>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              aria-label="Export orders data"
            >
              <FaDownload className="w-4 h-4" />
              Export
            </button>
          </nav>
        </form>
      </section>

      {/* Orders Table */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <article className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Orders table">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Order Details
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Customer
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Service
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Amount
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <address className="not-italic">
                      <strong className="text-sm font-medium text-gray-900">
                        {order.id}
                      </strong>
                      <time
                        className="block text-sm text-gray-500"
                        dateTime={order.date}
                      >
                        {order.date}
                      </time>
                      <aside
                        className={`flex items-center gap-1 text-xs ${getPriorityColor(
                          order.priority
                        )}`}
                      >
                        <FaExclamationTriangle className="w-3 h-3" />
                        {order.priority} priority
                      </aside>
                    </address>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <address className="not-italic">
                      <strong className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </strong>
                      <a
                        href={`mailto:${order.email}`}
                        className="block text-sm text-gray-500 hover:text-purple-600"
                      >
                        {order.email}
                      </a>
                    </address>
                  </td>
                  <td className="px-6 py-4">
                    <article>
                      <h3 className="text-sm font-medium text-gray-900">
                        {order.service}
                      </h3>
                      <p className="text-sm text-gray-500 max-w-xs truncate">
                        {order.description}
                      </p>
                    </article>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        order.status
                      )}`}
                      role="status"
                      aria-label={`Order status: ${order.status.replace(
                        "-",
                        " "
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <data
                      value={order.amount.replace("$", "").replace(",", "")}
                    >
                      {order.amount}
                    </data>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <nav
                      className="flex items-center gap-2"
                      role="group"
                      aria-label="Order actions"
                    >
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="View Details"
                        aria-label={`View details for order ${order.id}`}
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOrderAction(order.id, "edit")}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit Order"
                        aria-label={`Edit order ${order.id}`}
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleOrderAction(order.id, "approve")
                            }
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Approve Order"
                            aria-label={`Approve order ${order.id}`}
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleOrderAction(order.id, "reject")
                            }
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Reject Order"
                            aria-label={`Reject order ${order.id}`}
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </nav>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        {filteredOrders.length === 0 && (
          <article className="text-center py-12">
            <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </article>
        )}
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <aside
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <article className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <section className="p-6">
              <header className="flex justify-between items-start mb-6">
                <h2
                  id="modal-title"
                  className="text-xl font-bold text-gray-900"
                >
                  Order Details - {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </header>

              <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Customer Information
                  </h3>
                  <address className="space-y-2 not-italic">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a
                        href={`mailto:${selectedOrder.email}`}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        {selectedOrder.email}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      <time dateTime={selectedOrder.date}>
                        {selectedOrder.date}
                      </time>
                    </p>
                  </address>
                </section>

                <section>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Order Information
                  </h3>
                  <dl className="space-y-2">
                    <dt className="inline font-medium">Service:</dt>
                    <dd className="inline ml-1">{selectedOrder.service}</dd>

                    <dt className="block font-medium">Amount:</dt>
                    <dd>
                      <data
                        value={selectedOrder.amount
                          .replace("$", "")
                          .replace(",", "")}
                      >
                        {selectedOrder.amount}
                      </data>
                    </dd>

                    <dt className="inline font-medium">Priority:</dt>
                    <dd
                      className={`inline ml-1 ${getPriorityColor(
                        selectedOrder.priority
                      )}`}
                    >
                      {selectedOrder.priority}
                    </dd>

                    <dt className="block font-medium">Status:</dt>
                    <dd>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${getStatusColor(
                          selectedOrder.status
                        )}`}
                        role="status"
                        aria-label={`Order status: ${selectedOrder.status.replace(
                          "-",
                          " "
                        )}`}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status.replace("-", " ")}
                      </span>
                    </dd>
                  </dl>
                </section>
              </main>

              <section className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedOrder.description}
                </p>
              </section>

              <footer className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedOrder.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleOrderAction(selectedOrder.id, "approve");
                        setSelectedOrder(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve Order
                    </button>
                    <button
                      onClick={() => {
                        handleOrderAction(selectedOrder.id, "reject");
                        setSelectedOrder(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject Order
                    </button>
                  </>
                )}
              </footer>
            </section>
          </article>
        </aside>
      )}
    </main>
  );
};

export default ReviewOrders;
