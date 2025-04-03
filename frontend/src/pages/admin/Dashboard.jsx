import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getForms, deleteForm } from "../../services/formService.js";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch forms on component mount
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const data = await getForms();
        setForms(data);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Failed to fetch forms.");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  // ✅ Delete Form
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      await deleteForm(id);
      toast.success("Form deleted successfully!");
      setForms(forms.filter((form) => form._id !== id)); // Update UI
    } catch (err) {
      console.error("Error deleting form:", err);
      toast.error("Failed to delete form.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>

      {/* ✅ Admin Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/manage-forms"
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700 transition"
        >
          📂 Manage Forms
        </Link>
        <Link
          to="/admin/form-responses/1"
          className="bg-green-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-green-700 transition"
        >
          📊 View Responses
        </Link>
      </div>

      {/* ✅ Forms List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Available Forms</h2>

        {loading && <p className="text-gray-500">Loading forms...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {forms.length === 0 ? (
          <p className="text-gray-600 text-center">No forms found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div key={form._id} className="bg-gray-50 p-4 rounded-lg shadow-md border">
                <h3 className="font-semibold text-lg text-gray-700">{form.title}</h3>
                <div className="mt-3 flex justify-between items-center">
                  <Link
                    to={`/admin/form-responses/${form._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Responses
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(form._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
