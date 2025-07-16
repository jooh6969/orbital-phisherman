import { MessageSquare, Trash2 } from "lucide-react";
import { ReportCard } from "./ReportCard";
import supabase from "../../hooks/createClient";
import { useState, useEffect } from "react";

export const ReportsList = ({
  reports,
  onVote,
  expandedPost,
  onToggleExpand,
  onDeletePost,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      try {
        console.log(user.id);
        // Use regular select instead of single() to avoid errors when no profile is found
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("user_id", user.id);

        if (error) {
          console.error("Failed to check admin status:", error.message);
          return;
        }

        // Check if any profiles were returned and if the first one has is_admin = true
        setIsAdmin(
          (profiles && profiles.length > 0 && profiles[0].is_admin) || false
        );
      } catch (error) {
        console.error("Failed to check admin status:", error);
      }
    };

    checkAdmin();
  }, []);
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
        <div key={report.id} className="relative">
          <ReportCard
            report={report}
            onVote={onVote}
            isExpanded={expandedPost === report.id} //returns a boolean if expandedpost is curr
            onToggleExpand={() => onToggleExpand(report.id)} //sets expandedPost to curr post
            isAdmin={isAdmin}
            onDeletePost={() => onDeletePost(report.id)}
          />
        </div>
      ))}
    </div>
  );
};
