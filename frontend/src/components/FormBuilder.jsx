import { useState } from "react";
import React from "react";
import { IoArrowBack, IoTrash } from "react-icons/io5"; // Back & Delete Icons
import { useNavigate } from "react-router-dom";

const FormBuilder = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  // 🛠️ Add Field Function
  const addField = (type) => {
    setFields([...fields, { id: Date.now(), label: "", type, required: false }]);
  };

  // 🛠️ Handle Input Change (Fixes Bug)
  const updateFieldLabel = (id, newLabel) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, label: newLabel } : field)));
  };

  // ❌ Remove Field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <IoArrowBack size={20} />
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* 📌 Form Builder Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create Your Form</h2>

        {/* 🔤 Form Title Input */}
        <input
          type="text"
          placeholder="Enter Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none mb-4"
        />

        {/* ➕ Add Field Buttons */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => addField("text")} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
            Add Text
          </button>
          <button onClick={() => addField("email")} className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
            Add Email
          </button>
        </div>

        {/* 📌 Fields List */}
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center gap-2 p-3 bg-gray-100 rounded-md shadow">
              <input
                type="text"
                placeholder="Enter Label"
                value={field.label}
                onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
              <button onClick={() => removeField(field.id)} className="text-red-500 hover:text-red-700">
                <IoTrash size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* 💾 Save Form Button */}
        <button
          onClick={() => onSave({ title, fields })}
          className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
