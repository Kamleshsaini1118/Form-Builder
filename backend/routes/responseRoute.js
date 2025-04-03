const express = require("express");
const { createResponse, getResponses, getResponsesByFormId, deleteResponse } = require("../controllers/response.Controller");

const router = express.Router();

// Define Routes
router.post("/", createResponse);              // Submit a response
router.get("/", getResponses);                 // Get all responses
router.get("/:formId", getResponsesByFormId);  // Get responses by form ID
router.delete("/:id", deleteResponse);         // Delete a response

module.exports = router;
