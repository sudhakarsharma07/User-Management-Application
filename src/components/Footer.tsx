// import React from "react";

// const Footer: React.FC = () => {
//   return (
//     <footer className="text-center py-3 mt-4 bg-light border-top shadow-sm">
//       <p className="mb-0 text-muted">
//         © {new Date().getFullYear()} User Management App — Built with 💻 React + Vite
//       </p>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="text-center py-3 mt-4 text-white"
      style={{
        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
        boxShadow: "0px -3px 10px rgba(0,0,0,0.2)",
      }}
    >
      <p className="mb-0" style={{ fontWeight: 500 }}>
        © {new Date().getFullYear()} <strong>User Management App</strong> — Built with 💻 React + Vite
      </p>
    </footer>
  );
};

export default Footer;
