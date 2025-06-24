import { MessageSquare } from "lucide-react";
import { ReportCard } from "./ReportCard";

export const ReportsList = ({
  reports,
  onVote,
  expandedPost,
  onToggleExpand,
}) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No reports found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onVote={onVote}
          isExpanded={expandedPost === report.id} //returns a boolean if expandedpost is curr
          onToggleExpand={() => onToggleExpand(report.id)} //sets expandedPost to curr post
        />
      ))}
    </div>
  );
};
