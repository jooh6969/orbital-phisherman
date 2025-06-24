import { Eye } from "lucide-react";

export const ReportContent = ({ content, isExpanded, onToggleExpand }) => (
  <div className="text-gray-700 mb-4">
    <div className={`${isExpanded ? "" : "line-clamp-3"}`}>
      <strong>Scam Message:</strong>
      <br />
      <span className="italic bg-gray-50 p-2 rounded border-l-4 border-red-400 block mt-2">
        "{content}"
      </span>
    </div>
    <button
      onClick={onToggleExpand}
      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-2"
    >
      {isExpanded ? "Hide Details" : "View Full Analysis"}
      <Eye className="w-4 h-4" />
    </button>
  </div>
);
