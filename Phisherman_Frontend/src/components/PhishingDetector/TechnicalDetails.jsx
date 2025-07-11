export const TechnicalDetails = ({ technicalInfo }) => (
  <div className="p-8 bg-gray-50 rounded-xl mb-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      Technical Details
    </h3>
    <div className="space-y-4">
      {Object.entries(technicalInfo).map(([key, value]) => (
        <div key={key}>
          <div className="text-sm font-medium text-gray-600 mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
          </div>
          <div className="text-sm text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
            {typeof value === "boolean"
              ? value
                ? "Yes"
                : "No"
              : value.toString()}
          </div>
        </div>
      ))}
    </div>
  </div>
);
