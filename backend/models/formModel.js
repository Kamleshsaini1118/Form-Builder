const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fields: [
      {
        label: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["text", "email", "number", "checkbox", "radio", "select"],
        },
        options: [{ type: String }], // For dropdowns, radio buttons, etc.
        required: { type: Boolean, default: false },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;

