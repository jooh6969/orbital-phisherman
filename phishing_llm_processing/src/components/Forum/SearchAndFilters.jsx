import { Search, Filter, X } from "lucide-react";

export const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  scamTypes,
}) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {scamTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>

    {(selectedFilter !== "All" || searchQuery) && (
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">Active filters:</span>
        {selectedFilter !== "All" && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Type: {selectedFilter}
            <button
              onClick={() => onFilterChange("All")}
              className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {searchQuery && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Search: "{searchQuery}"
            <button
              onClick={() => onSearchChange("")}
              className="ml-1 hover:bg-green-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>
    )}
  </div>
);
