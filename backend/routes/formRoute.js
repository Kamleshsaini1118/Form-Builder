const express = require("express");
const { createForm, getForms, getSingleForm, updateForm, deleteForm } = require("../controllers/formController.js");

const router = express.Router();

// Routes
router.post("/", createForm);       
router.get("/", getForms);          
router.get("/:id", getSingleForm);  
router.put("/:id", updateForm);     
router.delete("/:id", deleteForm);  

module.exports = router;
