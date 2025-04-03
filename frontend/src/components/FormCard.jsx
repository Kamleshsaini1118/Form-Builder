import { Link } from "react-router-dom";
import React from "react";

const FormCard = ({ form }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{form.title}</h2>
      <Link to={`/submit-form/${form._id}`} className="text-blue-500">
        Fill Form →
      </Link>
    </div>
  );
};

export default FormCard;
