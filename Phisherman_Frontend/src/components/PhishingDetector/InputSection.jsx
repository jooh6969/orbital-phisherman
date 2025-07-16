import { Zap, Sparkles } from "lucide-react";

export const InputSection = ({
  inputText,
  setInputText,
  loading,
  handleProcess,
  handleAutopopulate,
}) => (
  <div className="p-4 md:p-6 lg:p-8 border-b border-gray-100">
    <div className="mb-4 md:mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3">
        Message Content
      </label>
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste the suspicious message, email, or text here for analysis..."
          className="w-full p-3 md:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
          rows={6}
        />
        <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 text-xs text-gray-400">
          {inputText.length} characters
        </div>
      </div>
    </div>

    <div className="flex gap-3 md:gap-4">
      <button
        onClick={handleProcess}
        disabled={loading || !inputText.trim()}
        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-2 border-white border-t-transparent"></div>
            Analyzing Message...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 md:w-5 md:h-5" />
            Analyze Message
          </>
        )}
      </button>

      <button
        onClick={handleAutopopulate}
        disabled={loading}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden sm:inline">Autopopulate</span>
      </button>
    </div>
  </div>
);
