const express = require("express");
const { createResponse, getResponses, getResponsesByFormId, deleteResponse } = require("../controllers/response.Controller");

const router = express.Router();

// Define Routes
router.post("/", createResponse);              
router.get("/", getResponses);                 
router.get("/:formId", getResponsesByFormId);  
router.delete("/:id", deleteResponse);         

module.exports = router;
