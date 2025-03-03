import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // Ensure Firebase auth is imported
import { collection, getDocs } from "firebase/firestore";
import Table from "../components/Table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Get the current user
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        // Get the ID token and decode claims
        const token = await user.getIdTokenResult();
        if (!token.claims.admin) throw new Error("Unauthorized access");

        // Fetch users if admin
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = ["User Name", "Email", "Role", "Status", "Actions"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {loading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Table
          columns={columns}
          data={users.map((user) => ({
            name: user.name || "N/A",
            email: user.email || "N/A",
            role: user.role || "N/A",
            status: user.status || "N/A",
            actions: (
              <div className="space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
            ),
          }))}
        />
      )}
    </div>
  );
};

export default Users;
