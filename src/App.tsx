// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }

// const App: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [formData, setFormData] = useState<User>({
//     id: 0,
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   //  Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//       setUsers(response.data);
//       setFilteredUsers(response.data);
//       setError("");
//     } catch {
//       setError("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   //  Live search (filter instantly when user types)
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredUsers(users);
//     } else {
//       const filtered = users.filter((u) =>
//         u.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredUsers(filtered);
//     }
//   }, [searchTerm, users]);

//   //  Handle input changes in form
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   //  Create / Update User
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.phone) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       if (editUser) {
//         await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, formData);
//         const updated = users.map((u) => (u.id === editUser.id ? formData : u));
//         setUsers(updated);
//         alert("User updated successfully!");
//       } else {
//         const response = await axios.post("https://jsonplaceholder.typicode.com/users", formData);
//         const newUser = { ...response.data, id: users.length + 1 };
//         setUsers([...users, newUser]);
//         alert("User created successfully!");
//       }

//       setFormData({ id: 0, name: "", email: "", phone: "" });
//       setEditUser(null);
//       setShowForm(false);
//     } catch {
//       alert("Error while saving user.");
//     }
//   };

//   //  Edit User
//   const handleEdit = (user: User) => {
//     setEditUser(user);
//     setFormData(user);
//     setShowForm(true);
//   };

//   //  Delete User
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
//       const updated = users.filter((u) => u.id !== id);
//       setUsers(updated);
//       alert("User deleted successfully!");
//     } catch {
//       alert("Failed to delete user.");
//     }
//   };

//   return (
    

//     <div className="container mt-4">
//       <h2 className="text-center mb-4">👥 User Management Application</h2>

//       {error && <p className="text-danger text-center">{error}</p>}
//       {loading && <p className="text-center text-muted">Loading users...</p>}

//       {!loading && (
//         <>
//           {/*  Live Search Bar */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div className="input-group w-50">
//               <span className="input-group-text">
//                 <FaSearch />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search user by name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <button
//               className="btn btn-primary"
//               onClick={() => {
//                 setShowForm(!showForm);
//                 setEditUser(null);
//                 setFormData({ id: 0, name: "", email: "", phone: "" });
//               }}
//             >
//               <FaPlus className="me-1" /> {showForm ? "Close Form" : "Add User"}
//             </button>
//           </div>

//           {/*  User Form */}
//           {showForm && (
//             <div className="card p-3 mb-4 shadow-sm">
//               <h5 className="mb-3">{editUser ? "Edit User" : "Create New User"}</h5>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-control"
//                     placeholder="Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     name="phone"
//                     className="form-control"
//                     placeholder="Phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-success">
//                   {editUser ? "Update User" : "Add User"}
//                 </button>
//               </form>
//             </div>
//           )}

//           {/*  User Table */}
//           <div className="table-responsive">
//             <table className="table table-striped table-bordered">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.id}</td>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td>{user.phone}</td>
//                       <td className="text-center">
//                         <button
//                           className="btn btn-sm btn-warning me-2"
//                           onClick={() => handleEdit(user)}
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(user.id)}
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center text-muted">
//                       No matching users found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//            <Footer/>
          

//         </>


//       )}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; // ✅ Imported Navbar

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
      setError("");
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Live search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // ✅ Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Create / Update User
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields are required!");
      return;
    }

    try {
      if (editUser) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, formData);
        const updated = users.map((u) => (u.id === editUser.id ? formData : u));
        setUsers(updated);
        alert("User updated successfully!");
      } else {
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", formData);
        const newUser = { ...response.data, id: users.length + 1 };
        setUsers([...users, newUser]);
        alert("User created successfully!");
      }

      setFormData({ id: 0, name: "", email: "", phone: "" });
      setEditUser(null);
      setShowForm(false);
    } catch {
      alert("Error while saving user.");
    }
  };

  // ✅ Edit User
  const handleEdit = (user: User) => {
    setEditUser(user);
    setFormData(user);
    setShowForm(true);
  };

  // ✅ Delete User
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      alert("User deleted successfully!");
    } catch {
      alert("Failed to delete user.");
    }
  };

  return (
    <>
      {/* 🌈 Navbar Section */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleForm={() => {
          setShowForm(!showForm);
          setEditUser(null);
          setFormData({ id: 0, name: "", email: "", phone: "" });
        }}
        showForm={showForm}
      />

      <div className="container mt-4">

        {error && <p className="text-danger text-center">{error}</p>}
        {loading && <p className="text-center text-muted">Loading users...</p>}

        {!loading && (
          <>
            {/* 🧾 User Form */}
            {showForm && (
              <div className="card p-3 mb-4 shadow-sm">
                <h5 className="mb-3">{editUser ? "Edit User" : "Create New User"}</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    {editUser ? "Update User" : "Add User"}
                  </button>
                </form>
              </div>
            )}

            {/* 📋 User Table */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(user)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No matching users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default App;
