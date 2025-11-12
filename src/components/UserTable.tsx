import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { User } from "../types/User";


// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEdit(user)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(user.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center text-muted">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
