import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormById } from "../../services/formService";
import { toast } from "react-hot-toast";

const FormDetail = () => {
  const { id } = useParams(); // URL se form ID le rahe hain
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(id);
        setForm(data);
      } catch (err) {
        console.error("Error fetching form:", err);
        setError("Failed to load form details.");
        toast.error("Form details not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) return <p className="text-gray-500">Loading form details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Form Details</h1>
      <div className="border p-4 rounded-lg shadow">
        <p><strong>Title:</strong> {form.title}</p>
        <p><strong>Description:</strong> {form.description}</p>
        <p><strong>Created At:</strong> {new Date(form.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FormDetail;
