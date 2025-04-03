import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getForms } from "../services/formService";

const Home = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms();
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-50">
      {/* 🚀 Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text animate-fadeIn">
          Build Forms Effortlessly
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-3">
          Create, share, and manage custom forms in just a few clicks!
        </p>

        {/* CTA Button */}
        <Link
          to="/create-form"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-lg hover:scale-105"
        >
          Get Started 🚀
        </Link>
      </div>

      {/* 📄 Available Forms Section */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Available Forms</h2>

        {/* 🌀 Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-32">
            <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
          </div>
        ) : forms.length === 0 ? (
          <p className="text-center mt-4 text-gray-600">No forms available.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {forms.map((form) => (
              <li key={form._id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
                <Link
                  to={`/submit-form/${form._id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline flex justify-between items-center"
                >
                  <span>{form.title}</span>
                  <span className="text-sm text-gray-500">{new Date(form.createdAt).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
