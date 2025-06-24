import { Link } from "react-router-dom";
import { Shield, Search, Users, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../hooks/createClient";

export default function NavBar() {
  const [userEmail, setUserEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && user.email) {
        console.log(user);
        setUserEmail(user.email);
        setLoggedIn(true);
      } else {
        setUserEmail(null);
        setLoggedIn(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <nav className="bg-white/90 shadow-lg rounded-b-2xl backdrop-blur-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col">
          <div className="py-1 text-xs text-gray-500 font-medium text-right">
            {userEmail ? (
              <span>
                Logged in as{" "}
                <span className="text-blue-700 font-semibold">{userEmail}</span>
              </span>
            ) : (
              <span>Not logged in</span>
            )}
          </div>
          <div className="flex justify-between h-16 items-center">
            <Link
              to="/predict"
              className="flex items-center group hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
            >
              <Shield className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-xl font-bold text-gray-800 tracking-tight group-hover:text-blue-700 transition-colors">
                Phishermen AI
              </span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/predict"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Analyse
              </Link>
              <Link
                to="/forum"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Users className="w-5 h-5" />
                Forum
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  to="/education"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  Reality Mode
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  About Us
                </a>
                {userEmail && loggedIn ? (
                  <button
                    className="ml-1 px-4 py-2 text-base font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-blue-700 shadow"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUserEmail(null);
                      setLoggedIn(false);
                      window.location.reload();
                    }}
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="ml-1 px-4 py-2 text-base font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-blue-700 shadow"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
