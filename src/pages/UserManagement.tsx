// // import React, { useState } from "react";
// // import UserTable from "../components/UserTable";
// // import AddUserButton from "../components/AddUserButton";

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   role: string;
// // }

// // const UserManagement: React.FC = () => {
// //   const [users, setUsers] = useState<User[]>([
// //     { id: 1, name: "Sudhakar Sharma", email: "sudhakar@example.com", role: "Admin" },
// //     { id: 2, name: "John Doe", email: "john@example.com", role: "User" },
// //   ]);

// //   const handleAddUser = () => {
// //     const newUser: User = {
// //       id: users.length + 1,
// //       name: "New User",
// //       email: `user${users.length + 1}@example.com`,
// //       role: "User",
// //     };
// //     setUsers([...users, newUser]);
// //   };

// //   const handleEditUser = (user: User) => {
// //     alert(`Editing user: ${user.name}`);
// //   };

// //   const handleDeleteUser = (id: number) => {
// //     setUsers(users.filter((u) => u.id !== id));
// //   };

// //   return (
// //     <div className="container py-4">
// //       <div className="d-flex justify-content-between align-items-center mb-3">
// //         <h2>User Management</h2>
// //         <AddUserButton onAddUser={handleAddUser} />
// //       </div>
// //       <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
// //     </div>
// //   );
// // };

// // export default UserManagement;




// import React, { useState, useEffect } from "react";
// import UserTable from "../components/UserTable";
// import AddUserButton from "../components/AddUserButton";
// import axios from "axios";
// import { User } from "../types/User";

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// // }

// const UserManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [showForm, setShowForm] = useState(false);

//   // ✅ Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("https://jsonplaceholder.typicode.com/users");
//         setUsers(res.data);
//       } catch (error) {
//         alert("Failed to fetch users!");
//       }
//     };
//     fetchUsers();
//   }, []);

//   // ✅ Handle input for add/edit form
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Add New User
//   const handleAddUser = () => {
//     setEditUser(null);
//     setFormData({ name: "", email: "", phone: "" });
//     setShowForm(true);
//   };

//   // ✅ Handle Edit User
//   const handleEditUser = (user: User) => {
//     setEditUser(user);
//     setFormData({ name: user.name, email: user.email, phone: user.phone });
//     setShowForm(true);
//   };

//   // ✅ Handle Delete User
//   const handleDeleteUser = (id: number) => {
//     setUsers(users.filter((u) => u.id !== id));
//     alert("User deleted successfully!");
//   };

//   // ✅ Handle Submit for Add/Edit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.phone) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       if (editUser) {
//         // Simulate update
//         const updatedUsers = users.map((u) =>
//           u.id === editUser.id ? { ...u, ...formData } : u
//         );
//         setUsers(updatedUsers);
//         alert("User updated successfully!");
//       } else {
//         // Simulate add new
//         const newUser: User = {
//           id: users.length + 1,
//           ...formData,
//         };
//         setUsers([...users, newUser]);
//         alert("User added successfully!");
//       }

//       setShowForm(false);
//       setEditUser(null);
//       setFormData({ name: "", email: "", phone: "" });
//     } catch (error) {
//       console.error(error);
//       alert("Error while saving user.");
//     }
//   };

//   // ✅ Search Filter
//   const filteredUsers = users.filter((u) =>
//     u.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>User Management</h2>
//         <AddUserButton onAddUser={handleAddUser} />
//       </div>

//       {/* 🔍 Search Box */}
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search user by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* 🧾 Add/Edit Form */}
//       {showForm && (
//         <form onSubmit={handleSubmit} className="mb-4">
//           <div className="row g-2">
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-4">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-3">
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-1">
//               <button type="submit" className="btn btn-success w-100">
//                 {editUser ? "Update" : "Add"}
//               </button>
//             </div>
//           </div>
//         </form>
//       )}

//       {/* 🧍 User Table */}
//       <UserTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
//     </div>
//   );
// };

// export default UserManagement;




import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import AddUserButton from "../components/AddUserButton";
import Footer from "../components/Footer";
import axios from "axios";
import { motion } from "framer-motion";
import { User } from "../types/User";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(res.data);
      } catch (error) {
        alert("Failed to fetch users!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = () => {
    setEditUser(null);
    setFormData({ name: "", email: "", phone: "" });
    setShowForm(true);
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone });
    setShowForm(true);
  };

  // Delete user
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    alert("User deleted successfully!");
  };

  // Submit form (add or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields are required!");
      return;
    }

    try {
      if (editUser) {
        const updatedUsers = users.map((u) =>
          u.id === editUser.id ? { ...u, ...formData } : u
        );
        setUsers(updatedUsers);
        alert("User updated successfully!");
      } else {
        const newUser: User = {
          id: users.length + 1,
          ...formData,
        };
        setUsers([...users, newUser]);
        alert("User added successfully!");
      }

      setShowForm(false);
      setEditUser(null);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error(error);
      alert("Error while saving user.");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <motion.div
        className="d-flex justify-content-between align-items-center mb-4 p-3 bg-primary text-white rounded-3 shadow-sm"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <h2 className="mb-0">User Management Dashboard</h2>
        <AddUserButton onAddUser={handleAddUser} />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="🔍 Search user by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="card p-4 mb-4 shadow-sm border-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="row g-2">
            <div className="col-md-4">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-success w-100">
                {editUser ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </motion.form>
      )}

      {/* Table */}
      <motion.div
        className="card p-3 shadow-sm border-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <UserTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      </motion.div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default UserManagement;
