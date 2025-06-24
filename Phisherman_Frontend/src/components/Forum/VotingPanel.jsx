import { ChevronUp, ChevronDown } from "lucide-react";

export const VotingPanel = ({
  reportId,
  upvotes,
  downvotes,
  userVote,
  onVote,
}) => (
  <div className="flex flex-col items-center gap-1">
    <button
      onClick={() => onVote(reportId, "up")}
      className={`p-2 rounded-lg transition-colors ${
        userVote === "up"
          ? "bg-green-100 text-green-600"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
    <span className="font-bold text-lg">{upvotes - downvotes}</span>
    <button
      onClick={() => onVote(reportId, "down")}
      className={`p-2 rounded-lg transition-colors ${
        userVote === "down"
          ? "bg-red-100 text-red-600"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      <ChevronDown className="w-5 h-5" />
    </button>
  </div>
);
