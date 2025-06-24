import { useCallback } from "react";

export const useReportVoting = (reports, setReports) => {
  const handleVote = useCallback(
    (reportId, voteType) => {
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.id === reportId) {
            const newReport = { ...report };

            if (report.userVote === "up") {
              newReport.upvotes -= 1;
            } else if (report.userVote === "down") {
              newReport.downvotes -= 1;
            }

            if (voteType === "up" && report.userVote !== "up") {
              newReport.upvotes += 1;
              newReport.userVote = "up";
            } else if (voteType === "down" && report.userVote !== "down") {
              newReport.downvotes += 1;
              newReport.userVote = "down";
            } else {
              newReport.userVote = null;
            }

            return newReport;
          }
          return report;
        })
      );
    },
    [setReports]
  );

  return { handleVote };
};
