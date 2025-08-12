import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://gutenberg-server-production.up.railway.app/api/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("خطأ في جلب المستخدمين:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;

    try {
      await axios.delete(
        `https://gutenberg-server-production.up.railway.app/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
    } catch (err) {
      console.error("خطأ في حذف المستخدم:", err);
      alert("حدث خطأ أثناء الحذف.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  if (loading) return <p>جاري تحميل المستخدمين...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">قائمة المستخدمين</h2>
      {users.length === 0 ? (
        <p>لا يوجد مستخدمين حاليًا.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.userId}
              className="border p-3 rounded flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => deleteUser(user.userId)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
