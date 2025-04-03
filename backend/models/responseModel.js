const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId, // form se referense lene k liye iska use krte h !
      ref: "Form",
      required: true,
    },
    responses: [
      {
        fieldId: String,
        value: String,
      },
    ],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const response = mongoose.model("Response", ResponseSchema);
module.exports = response;

// export const response = mongoose.model("response", ResponseSchema);
