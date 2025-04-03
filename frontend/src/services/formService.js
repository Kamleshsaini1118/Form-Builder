import axios from "axios";

const API_URL = "http://localhost:5000/api/forms"; // Backend URL

// Get all forms
export const getForms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};

// Get a single form by ID
export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching form:", error);
    throw error;
  }
};

// Create a new form
export const createForm = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
};

// Update an existing form
export const updateForm = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating form:", error);
    throw error;
  }
};

// Delete a form
export const deleteForm = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { message: "Form deleted successfully" };
  } catch (error) {
    console.error("Error deleting form:", error);
    throw error;
  }
};
