const Response = require("../models/responseModel.js");
const Form = require("../models/formModel.js");

// Create a new response
const createResponse = async (req, res) => {
  try {
    const { formId, responses } = req.body;
    const formExists = await Form.findById(formId);
    if (!formExists) {
      return res.status(404).json({ message: "Form not found" });
    }

    const newResponse = new Response({ formId, responses });
    await newResponse.save();
    res.status(201).json({ message: "Response submitted successfully", response: newResponse });
  } catch (error) {
    console.error("Error Fetching Responses:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all responses
const getResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    console.log("Raw Responses (Before Populate):", responses); // Debug

    const populatedResponses = await Response.find().populate({
      path: "formId",
      select: "title fields",
    });

    console.log("Populated Responses (After Populate):", populatedResponses); // Debug

    res.status(200).json(populatedResponses);
  } catch (error) {
    console.error("Error Fetching Responses:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// Get responses for a specific form
const getResponsesByFormId = async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    if (!responses.length) return res.status(404).json({ message: "No responses found for this form" });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a response
const deleteResponse = async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    if (!deletedResponse) return res.status(404).json({ message: "Response not found" });
    res.json({ message: "Response deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createResponse,
    getResponses,
    getResponsesByFormId,
    deleteResponse
}