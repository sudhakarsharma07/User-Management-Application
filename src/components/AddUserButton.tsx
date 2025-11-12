import React from "react";
import { FaUserPlus } from "react-icons/fa";

interface AddUserButtonProps {
  onAddUser: () => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAddUser }) => {
  return (
    <button className="btn btn-success d-flex align-items-center gap-2" onClick={onAddUser}>
      <FaUserPlus />
      Add User
    </button>
  );
};

export default AddUserButton;
