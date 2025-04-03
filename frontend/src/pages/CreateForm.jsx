import { useState } from "react";
import React from "react";
import { createForm } from "../services/formService";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoAddCircle, IoTrash } from "react-icons/io5"; // Icons

const fieldTypes = ["text", "email", "number", "checkbox", "radio", "select"];

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  // ✅ Add new field dynamically
  const addField = () => {
    setFields([...fields, { label: "", type: "text", options: [], required: false }]);
  };

  // ✅ Remove field
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // ✅ Update field properties
  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;

    // 🛠️ Reset options if field type is changed to non-select type
    if (key === "type" && value !== "select") {
      updatedFields[index].options = [];
    }

    setFields(updatedFields);
  };

  // ✅ Add option for dropdown
  const addOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  // ✅ Update dropdown options
  const updateOption = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  // ✅ Remove option
  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Form title is required!");
      return;
    }
    try {
      await createForm({ title, fields });
      navigate("/admin"); // Redirect after success
    } catch (error) {
      console.error("Form creation failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
        >
          <IoArrowBack size={20} />
          <span className="text-lg font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 mt-2">
          Create a New Form
        </h2>

        {/* ✅ Form Title Input */}
        <input
          type="text"
          placeholder="Enter Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none mb-4"
        />

        {/* 🔹 Dynamic Fields Section */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-50">
              <input
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none mb-2"
              />

              <div className="flex gap-2 items-center">
                {/* Field Type Dropdown */}
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
                >
                  {fieldTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Required Checkbox */}
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, "required", e.target.checked)}
                  />
                  Required
                </label>

                {/* ❌ Delete Field Button */}
                <button onClick={() => removeField(index)} className="text-red-600 hover:text-red-800">
                  <IoTrash size={20} />
                </button>
              </div>

              {/* Options for "select" type fields */}
              {field.type === "select" && (
                <div className="mt-2">
                  <p className="text-sm font-semibold mb-1">Options:</p>
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-2 items-center mb-1">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                        placeholder="Option value"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
                      />
                      <button onClick={() => removeOption(index, optionIndex)} className="text-red-600 hover:text-red-800">
                        <IoTrash size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ➕ Add Field Button */}
        <button
          onClick={addField}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm mt-4"
        >
          <IoAddCircle size={20} />
          Add New Field
        </button>

        {/* ✅ Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
          >
            Create Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
