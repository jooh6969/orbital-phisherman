import { Shield } from "lucide-react";
import logo from "../../assets/logo.png";

export const Header = () => (
  <div className="flex flex-col items-center">
    <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full mb-3 shadow-lg">
      <img
        src={logo}
        alt="Phishermen AI Logo"
        className="w-20 h-20 md:w-32 md:h-32 p-1"
      />
    </div>
    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Phishermen AI
    </h1>
  </div>
);
