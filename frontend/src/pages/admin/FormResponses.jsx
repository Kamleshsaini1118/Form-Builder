import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResponsesByFormId } from "../../services/responseService";
import { IoArrowBack } from "react-icons/io5"; // Back arrow icon

const FormResponses = () => {
  const { id } = useParams(); // URL se form ID le rahe hain
  const navigate = useNavigate(); // Navigation hook for going back
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await getResponsesByFormId(id);
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
      >
        <IoArrowBack size={20} />
        <span className="text-lg font-medium">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Form Responses
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading responses...</p>
      ) : responses.length === 0 ? (
        <p className="text-gray-600 text-center">No responses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {responses.map((response, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Response #{index + 1}
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                {Object.entries(response).map(([key, value], i) => (
                  <p key={i} className="text-gray-800 text-sm">
                    <strong className="text-gray-600">{key}:</strong> {value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormResponses;
