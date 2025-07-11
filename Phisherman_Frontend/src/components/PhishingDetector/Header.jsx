import { Shield } from "lucide-react";

export const Header = () => (
  <div className="flex flex-col items-center">
    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-2 shadow-md">
      <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </div>
    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Phishermen AI
    </h1>
  </div>
);
