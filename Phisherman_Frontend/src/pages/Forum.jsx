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
        />

        <Footer />
      </div>
    </div>
  );
}
