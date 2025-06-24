import { useMemo } from "react";

export const useReportFiltering = (
  reports,
  selectedFilter,
  searchQuery,
  sortBy
) => {
  return useMemo(() => {
    let filtered = reports;

    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (report) => report.scamType === selectedFilter
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.scamType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
        case "views":
          return b.views - a.views;
        case "recent":
        default:
          return new Date(b.submittedAt) - new Date(a.submittedAt);
      }
    });

    return filtered;
  }, [reports, selectedFilter, searchQuery, sortBy]);
};
