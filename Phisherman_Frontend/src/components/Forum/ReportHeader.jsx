import { User, Calendar, Eye } from "lucide-react";
import { colorHelpers } from "../../data/mockData";
import { TagsList } from "./TagsList";

export const ReportHeader = ({
  title,
  submittedBy,
  submittedAt,
  scamType,
  suspicionLevel,
  userTitle,
}) => {
  const tags = [
    {
      label: scamType,
      className: colorHelpers.getScamTypeColor(scamType),
    },
    {
      label: `${suspicionLevel} Risk`,
      className: colorHelpers.getSuspicionColor(suspicionLevel),
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {submittedBy}
          {userTitle && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">{userTitle}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(submittedAt).toLocaleDateString()}
        </div>
      </div>
      <TagsList tags={tags} />
    </div>
  );
};
