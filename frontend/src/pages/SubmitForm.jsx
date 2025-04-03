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
  const [submittedResponse, setSubmittedResponse] = useState(null); // ✅ Show response after submit
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(formId);
        setForm(data);

        if (data?.fields) {
          const initialResponses = {};
          data.fields.forEach((field) => {
            initialResponses[field._id] = "";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(responses).some((value) => value.trim() === "")) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const savedResponse = await submitResponse(formId, responses);
      toast.success("Form submitted successfully!");
      setSubmittedResponse(savedResponse); // ✅ Save response to state
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
                name={field._id}
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

      {/* ✅ Show Response Below After Submission */}
      {submittedResponse && (
        <div className="mt-6 w-full max-w-md bg-green-100 border border-green-500 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold text-green-800">Response Submitted:</h2>
          <ul className="mt-2 text-gray-700">
            {Object.entries(submittedResponse).map(([fieldId, value]) => {
              const fieldLabel = form?.fields?.find((f) => f._id === fieldId)?.label || "Unknown Field";
              return (
                <li key={fieldId} className="py-1">
                  <strong>{fieldLabel}:</strong> {value}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
