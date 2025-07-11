import { ReportHeader } from "./ReportHeader";
import { VotingPanel } from "./VotingPanel";
import { ReportContent } from "./ReportContent";
import { ReportAnalysis } from "./ReportAnalysis";
import { Trash2 } from "lucide-react";

export const ReportCard = ({
  report,
  onVote,
  isExpanded,
  onToggleExpand,
  isAdmin,
  onDeletePost,
}) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <ReportHeader
            title={report.title}
            submittedBy={report.user}
            submittedAt={report.report_time}
            scamType={report.scamType}
            suspicionLevel={report.threat} //Not Phishing/ Likely Phishing / Phishing
          />
        </div>

        <VotingPanel
          reportId={report.id}
          upvotes={report.upvotes}
          downvotes={report.downvotes}
          userVote={report.userVote}
          onVote={onVote} // kiv voting panel
        />
      </div>

      <ReportContent
        content={report.content}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      />
    </div>

    {isExpanded && (
      <ReportAnalysis
        reason={report.reason}
        advice={report.advice}
        fakeurls={report.fakeurl}
        officialurl={report.officialurl}
      />
    )}

    {isAdmin && (
      <div className="bg-gray-50 p-4 flex justify-end">
        <button
          onClick={onDeletePost}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          title="Delete this post"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Post</span>
        </button>
      </div>
    )}
  </div>
);
