import { AlertTriangle, CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

export const ResultBadge = ({ isPhishing }) => (
  <div
    className={`inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
      isPhishing === "Phishing"
        ? "bg-red-100 text-red-700"
        : isPhishing === "Likely Phishing"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {isPhishing === "Phishing" ? (
      <>
        <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Phishing Detected</span>
      </>
    ) : isPhishing === "Likely Phishing" ? (
      <>
        <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Potential Phishing Detected</span>
      </>
    ) : (
      <>
        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Message Appears Safe</span>
      </>
    )}
  </div>
);

ResultBadge.propTypes = {
  isPhishing: PropTypes.string.isRequired,
};
