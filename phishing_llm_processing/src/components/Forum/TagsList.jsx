export const TagsList = ({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <span
        key={index}
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${tag.className}`}
      >
        {tag.label}
      </span>
    ))}
  </div>
);
