
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  role: string;
}

const AdminUserManagementPage: NextPage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUpdateRole = (id: string, role: string) => {
    // Mock update to API
    fetch("/api/admin/users", {
      method: "PUT",
      body: JSON.stringify({ id, role }),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - User Management</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Manage User Accounts & Roles
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p>Current Role: {user.role}</p>
              <select
                defaultValue={user.role}
                onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                className="w-full p-3 border rounded"
              >
                <option>Student</option>
                <option>Employer</option>
                <option>Admin</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUserManagementPage;
