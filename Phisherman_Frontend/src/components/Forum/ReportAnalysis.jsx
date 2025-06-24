import { Shield, ExternalLink, CheckCircle } from "lucide-react";

export const ReportAnalysis = ({ reason, advice, fakeurls, officialurl }) => {
  // Normalize fakeurls and officalurl to arrays
  const fakeUrlList =
    typeof fakeurls === "string"
      ? fakeurls
          .split(",")
          .map((u) => u.trim())
          .filter(Boolean)
      : Array.isArray(fakeurls)
      ? fakeurls
      : [];
  const officialUrlList =
    typeof officialurl === "string"
      ? officialurl
          .split(",")
          .map((u) => u.trim())
          .filter(Boolean)
      : Array.isArray(officialurl)
      ? officialurl
      : [];
  console.log("officialurl " + officialurl);
  return (
    <div className="p-6 bg-gray-50 border-t border-gray-200">
      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Advanced AI Analysis
      </h4>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">Risk Assessment/Reason</h5>
            <p className="text-sm text-gray-700">{reason}</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">Advice</h5>
            <p className="text-sm text-gray-700">{advice}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border space-y-6">
          <div>
            <h5 className="font-semibold mb-2 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Detected URLs
            </h5>
            {fakeUrlList.length > 0 ? (
              <div className="space-y-2">
                {fakeUrlList.map((url, idx) => (
                  <div
                    key={idx}
                    className="bg-red-50 border border-red-200 rounded p-2"
                  >
                    <code className="text-sm text-red-700 break-all">
                      {url}
                    </code>
                    <div className="text-xs text-red-600 mt-1">
                      ⚠️ Do not visit this URL
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                No suspicious URLs detected
              </p>
            )}
          </div>
          <div>
            <h5 className="font-semibold mb-2 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              Official URLs
            </h5>
            {officialUrlList.length > 0 ? (
              <div className="space-y-2">
                {officialUrlList.map((url, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50 border border-blue-200 rounded p-2"
                  >
                    <code className="text-sm text-green-700 break-all">
                      {url}
                    </code>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                No official URLs detected
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
