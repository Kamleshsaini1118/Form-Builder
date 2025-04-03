import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getForms, deleteForm } from "../../services/formService";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5"; 

const ManageForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For Back Navigation

  // Forms Fetch Karne ka Function
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

  // Form Delete Karne ka Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      await deleteForm(id);
      setForms(forms.filter((form) => form._id !== id)); // UI se remove karna
      toast.success("Form deleted successfully!");
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Failed to delete form.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <IoArrowBack size={20} />
        <span className="text-lg font-medium">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Manage Forms
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : forms.length === 0 ? (
        <p className="text-gray-600 text-center">No forms available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-white p-5 rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                {form.title}
              </h2>

              <div className="flex flex-wrap gap-3">
                {/* Submit Form Button */}
                <Link
                  to={`/submit-form/${form._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Submit
                </Link>

                {/* View Responses Button */}
                <Link
                  to={`/form-responses/${form._id}`}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  Responses
                </Link>

                {/* Edit Form Button */}
                <Link
                  to={`/edit-form/${form._id}`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>

                {/* Delete Form Button */}
                <button
                  onClick={() => handleDelete(form._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageForms;
