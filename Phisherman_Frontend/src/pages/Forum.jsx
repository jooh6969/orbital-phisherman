import { useState, useEffect } from "react";
import { Header } from "../components/Forum/Header";
import { StatsBar } from "../components/Forum/StatsBar";
import { SearchAndFilters } from "../components/Forum/SearchAndFilters";
import { ReportsList } from "../components/Forum/ReportsList";
import { Footer } from "../components/Forum/Footer";
import { useReportFiltering } from "../hooks/useReportFiltering";
import { useReportVoting } from "../hooks/useReportVoting";
import supabase from "../hooks/createClient";

// Main Forum Container
export default function PhishingForumContainer() {
  const [reports, setReports] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [expandedPost, setExpandedPost] = useState(null);
  const [scamTypes, setScamTypes] = useState([]);

  async function getReports() {
    try {
      const { data: reportsData, error: forumError } = await supabase
        .from("forum_db")
        .select();
      //console.log(forumError, reportsData, supabase);

      const { data: scamTypesData } = await supabase
        .from("forum_db")
        .select("scamType");

      if (reportsData) setReports(reportsData);
      if (scamTypesData) {
        const types = Array.from(
          new Set(scamTypesData.map((item) => item.scamType))
        ).filter(Boolean);
        setScamTypes(["All", ...types]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    // Call getReports when component mounts
    getReports();
  }, []); // Empty dependency array means this runs once on mount

  const filteredReports = useReportFiltering(
    reports,
    selectedFilter,
    searchQuery,
    sortBy
  );

  const { handleVote } = useReportVoting(reports, setReports);

  const handleToggleExpand = (reportId) => {
    setExpandedPost(expandedPost === reportId ? null : reportId);
  };

  const handleDeletePost = async (postId) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      const { error } = await supabase
        .from("forum_db")
        .delete()
        .eq("id", postId);

      if (error) {
        console.error("Failed to delete post:", error.message);
        alert("Failed to delete post: " + error.message);
        return;
      }

      // Show success notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
      notification.textContent = "Post deleted successfully!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      // Refresh reports
      getReports();

      // Close expanded post if it was deleted
      if (expandedPost === postId) {
        setExpandedPost(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <StatsBar reports={reports} />
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          scamTypes={scamTypes}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
        </div>

        <ReportsList
          reports={filteredReports}
          onVote={handleVote}
          expandedPost={expandedPost}
          onToggleExpand={handleToggleExpand}
          onDeletePost={handleDeletePost}
        />

        <Footer />
      </div>
    </div>
  );
}
