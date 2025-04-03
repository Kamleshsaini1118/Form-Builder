import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFormById } from "../services/formService";
import { submitResponse } from "../services/responseService";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

const SubmitForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch form details
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(formId);
        setForm(data);

        // 🛠 Properly Initialize Responses
        if (data?.fields) {
          const initialResponses = {};
          data.fields.forEach((field) => {
            initialResponses[field._id] = ""; // Correct field ID
          });
          setResponses(initialResponses);
        }
      } catch (err) {
        console.error("Error fetching form:", err);
        toast.error("Failed to load form.");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  // ✅ Handle input changes correctly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value, // Update only the targeted field
    }));
  };

  // ✅ Submit user response
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (Object.values(responses).some((value) => value.trim() === "")) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await submitResponse(formId, responses);
      toast.success("Form submitted successfully!");
      navigate(-1); // Redirect back after submission
    } catch (err) {
      console.error("Error submitting response:", err);
      toast.error("Failed to submit form.");
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading form...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <IoArrowBack size={20} />
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* 📌 Form Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {form?.title || "Submit Form"}
        </h1>

        {/* 📌 Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {form?.fields?.map((field) => (
            <div key={field._id} className="flex flex-col">
              <label className="font-medium text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field._id} // ✅ Unique name for each field
                value={responses[field._id] || ""}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>
          ))}

          {/* 💾 Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
