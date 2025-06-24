import { MessageSquare } from "lucide-react";

export const Header = () => (
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
      <MessageSquare className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
      Scam Alert Community
    </h1>
    <p className="text-gray-600 text-lg">
      Latest updates on Phishing Scams!
    </p>
  </div>
);
