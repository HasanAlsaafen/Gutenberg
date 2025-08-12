import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://gutenberg-server-production.up.railway.app/api/Services"
      );
      setServices(response.data);
    } catch (error) {
      console.error("فشل في جلب الخدمات", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      try {
        await axios.delete(
          `https://gutenberg-server-production.up.railway.app/api/Services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServices(services.filter((s) => s.id !== id));
      } catch (error) {
        console.error("فشل في الحذف", error);
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, [services]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">قائمة الخدمات</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.serviceId} className="border rounded p-4 shadow">
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
            <button
              onClick={() => handleDelete(service.serviceId)}
              className="mt-3 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
