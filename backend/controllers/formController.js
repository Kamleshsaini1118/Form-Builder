const Form = require ("../models/formModel.js");

// Create a new form
const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const newForm = new Form({ title, fields });
    await newForm.save();
    res.status(201).json({ message: "Form created successfully", form: newForm });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Single Form
const getSingleForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Form
const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedForm) return res.status(404).json({ message: "Form not found" });
    res.json(updatedForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Form
const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: "Form not found" });
    res.json({ message: "Form deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createForm,
    getForms,
    getSingleForm,
    updateForm,
    deleteForm
}