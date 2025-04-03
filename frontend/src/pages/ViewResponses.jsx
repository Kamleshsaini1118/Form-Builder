import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResponses } from "../services/responseService";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5"; 

const ViewResponses = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch form responses on mount
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await getResponses(formId);
        setResponses(data);
      } catch (err) {
        console.error("Error fetching responses:", err);
        toast.error("Failed to load responses.");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [formId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading responses...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 relative">
        {/* Back Button - Top Left */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 md:top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <IoArrowBack size={22} />
          <span className="text-lg font-medium">Back</span>
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          View Responses
        </h1>

        {/* No Responses Message */}
        {responses.length === 0 ? (
          <p className="text-gray-500 text-center">No responses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {responses.map((response, idx) => (
              <div
                key={response._id}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-200 transition-all hover:shadow-xl"
              >
                <h2 className="font-bold text-lg mb-3 text-blue-600">
                  Response {idx + 1}
                </h2>
                <div className="space-y-3">
                {Object.entries(response.answers || {}).map(([key, value], index) => (
  <div key={index} className="flex flex-col">
    <span className="text-gray-600 font-semibold">{key}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
))}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResponses;
