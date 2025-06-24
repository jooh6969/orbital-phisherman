import { useState, useMemo, useEffect } from "react";

export default function StatsBar({ reports }) {
    const stats = useMemo(
      () => ({
        total: reports.length,
        votes: reports.reduce((sum, r) => sum + r.upvotes, 0),
        highRisk: reports.filter((r) => r.analysis.suspicion === "High").length,
      }),
      [reports]
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.votes}
              </div>
              <div className="text-sm text-gray-600">Community Votes</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.highRisk}
              </div>
              <div className="text-sm text-gray-600">High Risk</div>
            </div>
          </div>
        </div>
      </div>
    );

}
