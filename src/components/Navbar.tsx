import React from "react";
import { FaPlus, FaSearch, FaUsers } from "react-icons/fa";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  toggleForm: () => void;
  showForm: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  toggleForm,
  showForm,
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background:
          "linear-gradient(90deg, #007bff, #6610f2, #6f42c1, #e83e8c)",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center py-2">
        {/* Left: Logo / Title */}
        <div className="d-flex align-items-center text-white fw-bold fs-5">
          <FaUsers className="me-2" /> User Management
        </div>

        {/* Center: Search Bar */}
        <div className="input-group w-50">
          <span className="input-group-text bg-white">
            <FaSearch color="#6c757d" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search user by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Right: Add User Button */}
        <button
          className="btn btn-light fw-semibold"
          onClick={toggleForm}
        >
          <FaPlus className="me-1" />
          {showForm ? "Close Form" : "Add User"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
