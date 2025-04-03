import axios from "axios";

const API_URL = "http://localhost:5000/api/response"; // Backend URL

// Get all responses
export const getResponses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }
};

// Get responses by form ID
export const getResponsesByFormId = async (formId) => {
  try {
    const response = await axios.get(`${API_URL}/${formId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching responses by form ID:", error);
    throw error;
  }
};

// Submit a response
export const submitResponse = async (responseData) => {
  try {
    const response = await axios.post(API_URL, responseData);
    return response.data;
  } catch (error) {
    console.error("Error submitting response:", error);
    throw error;
  }
};

// Delete a response
export const deleteResponse = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { message: "Response deleted successfully" };
  } catch (error) {
    console.error("Error deleting response:", error);
    throw error;
  }
};
