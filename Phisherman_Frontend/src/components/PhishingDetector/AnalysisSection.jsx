import {
  Brain,
  BarChart,
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import PropTypes from "prop-types";

export const AnalysisSection = ({ mlAnalysis = {}, llmAnalysis = {} }) => (
  <div className="p-4 md:p-6 space-y-6 md:space-y-8">
    {/* ML Analysis Section */}
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <BarChart className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
        <h2 className="text-base md:text-lg font-bold text-gray-900">
          Machine Learning Analysis
        </h2>
      </div>

      <div
        className={`p-3 md:p-5 rounded-lg mb-3 md:mb-4 ${
          mlAnalysis?.result === "Phishing" ? "bg-red-50" : "bg-green-50"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {mlAnalysis?.result === "Phishing" ? (
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600 mr-2" />
            ) : (
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2" />
            )}
            <p className="text-sm md:text-base font-semibold text-gray-900">
              ML Prediction: {mlAnalysis?.result || "Unknown"}
            </p>
          </div>
          <div className="text-right">
            <span
              className={`text-sm md:text-base font-bold ${
                (mlAnalysis?.confidence || 0) >= 80
                  ? "text-green-600"
                  : (mlAnalysis?.confidence || 0) >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {mlAnalysis?.confidence || 0}%
            </span>
            <p className="text-xs text-gray-500">Confidence</p>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center text-xs md:text-sm mb-1">
          <span className="text-gray-600">Confidence Level</span>
          <span
            className={`font-medium ${
              (mlAnalysis?.confidence || 0) >= 80
                ? "text-green-600"
                : (mlAnalysis?.confidence || 0) >= 60
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {(mlAnalysis?.confidence || 0) >= 80
              ? "High"
              : (mlAnalysis?.confidence || 0) >= 60
              ? "Medium"
              : "Low"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
          <div
            className={`h-1.5 md:h-2 rounded-full ${
              (mlAnalysis?.confidence || 0) >= 80
                ? "bg-green-500"
                : (mlAnalysis?.confidence || 0) >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${mlAnalysis?.confidence || 0}%` }}
          ></div>
        </div>
      </div>
    </div>

    {/* LLM Analysis Section */}
    <div className="rounded-lg">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <Brain className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
        <h2 className="text-base md:text-lg font-bold text-gray-900">
          LLM Analysis Results
        </h2>
      </div>

      {/* Threat Section */}
      <div
        className={`p-4 md:p-5 mb-3 md:mb-4 rounded-lg ${
          llmAnalysis?.classification === "Phishing"
            ? "bg-red-50"
            : llmAnalysis?.classification === "Likely Phishing"
            ? "bg-yellow-50"
            : "bg-green-50"
        }`}
      >
        <div className="flex justify-center items-center mb-1 md:mb-2">
          <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
        </div>
        <h3 className="text-center text-sm md:text-base font-bold text-gray-900 mb-1">
          Threat: {llmAnalysis?.classification || "Unknown"}
        </h3>
        <p className="text-center text-xs md:text-sm text-gray-700">
          {llmAnalysis?.reason || "No reasoning available."}
        </p>
      </div>

      {/* Security Advice Section */}
      <div className="p-4 md:p-5 mb-3 md:mb-4 bg-blue-50 rounded-lg">
        <div className="flex justify-center items-center mb-1 md:mb-2">
          <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
        </div>
        <h3 className="text-center text-sm md:text-base font-bold text-gray-900 mb-1">
          Security Advice
        </h3>
        <p className="text-center text-xs md:text-sm text-blue-700">
          {llmAnalysis?.advice || "No security advice available."}
        </p>
      </div>

      {/* Two Column Layout for URLs and Scam Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Official URLs */}
        <div className="p-3 md:p-5 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            <h3 className="text-sm md:text-base font-bold text-gray-900">
              Official URLs
            </h3>
          </div>
          <div className="p-2 md:p-3 bg-white rounded border border-gray-200">
            {(llmAnalysis?.official_urls || []).length > 0 ? (
              (llmAnalysis?.official_urls || []).map((url, index) => (
                <div
                  key={index}
                  className="mb-1 last:mb-0 text-xs md:text-sm text-blue-600 truncate"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </div>
              ))
            ) : (
              <span className="text-xs md:text-sm text-gray-500">
                No official URLs provided
              </span>
            )}
          </div>
        </div>

        {/* Type of Scam */}
        <div className="p-3 md:p-5 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            <h3 className="text-sm md:text-base font-bold text-gray-900">
              Type of Scam
            </h3>
          </div>
          <div className="p-2 md:p-3 bg-white rounded border border-gray-200">
            <span className="text-xs md:text-sm font-medium">
              {llmAnalysis?.type || "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

AnalysisSection.propTypes = {
  mlAnalysis: PropTypes.shape({
    result: PropTypes.string,
    confidence: PropTypes.number,
  }),
  llmAnalysis: PropTypes.shape({
    classification: PropTypes.string,
    reason: PropTypes.string,
    advice: PropTypes.string,
    official_urls: PropTypes.arrayOf(PropTypes.string),
    phishing_url: PropTypes.string,
    type: PropTypes.string,
  }),
};

AnalysisSection.defaultProps = {
  mlAnalysis: { result: "Not Phishing", confidence: 0 },
  llmAnalysis: {
    classification: "Not Phishing",
    reason: "No suspicious activity detected.",
    advice: "No action required.",
    official_urls: [],
    phishing_url: "N/A",
    type: "N/A",
  },
};
