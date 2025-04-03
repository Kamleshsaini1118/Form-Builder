import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Importing Icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-3 mt-10">
      <p>&copy; 2025 Form Builder | All rights reserved.</p>

      {/* 🔗 Social Media Links */}
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/Kamleshsaini1118"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition"
        >
          <FaGithub size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/kamlesh-saini-a44268259/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
