import { Link } from "react-router-dom";
import { Shield, Search, Users, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../hooks/createClient";

export default function NavBar() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userPoints, setUserPoints] = useState(null);
  const [userTitle, setUserTitle] = useState(null);

  useEffect(() => {
    let currentUserId = null;

    async function fetchUserAndPoints() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user?.user_metadata?.username);
      if (user) {
        const username = user?.user_metadata?.username;
        if (username == null) {
          setUsername(user.email);
        } else {
          setUsername(username);
        }
        setLoggedIn(true);
        currentUserId = user.id;
        fetchUserPoints(user.id);
      } else {
        setUsername(null);
        setLoggedIn(false);
        setUserPoints(null);
      }
    }

    async function fetchUserPoints(userId) {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("points")
        .eq("user_id", userId)
        .single();

      if (!error && profile) {
        setUserPoints(profile.points ?? 0);
        // Map points to title
        const points = profile.points ?? 0;
        let mappedTitle = "Novice";
        if (points >= 100) mappedTitle = "Phish Master";
        else if (points >= 50) mappedTitle = "Phish Hunter";
        else if (points >= 25) mappedTitle = "Phish Guard";
        setUserTitle(mappedTitle);
      } else {
        console.error("Failed to fetch user points:", error?.message);
      }
    }

    fetchUserAndPoints();

    const refreshPoints = () => {
      if (currentUserId) {
        fetchUserPoints(currentUserId);
      }
    };

    window.addEventListener("pointsUpdated", refreshPoints);

    return () => {
      window.removeEventListener("pointsUpdated", refreshPoints);
    };
  }, []);

  return (
    <nav className="bg-white/90 shadow-lg rounded-b-2xl backdrop-blur-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col">
          <div className="py-1 text-xs text-gray-500 font-medium text-right flex justify-between items-center">
            {username ? (
              <div className="text-right w-full flex justify-end gap-4 items-center">
                <span>
                  Logged in as{" "}
                  <span className="text-blue-700 font-semibold">
                    {username}
                  </span>
                </span>
                <span>
                  Points:{" "}
                  <span className="text-green-600 font-semibold">
                    {userPoints ?? "-"}
                  </span>
                  {userTitle && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                      {userTitle}
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <span className="text-right w-full">Not logged in</span>
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
                <Link
                  to="/aboutus"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  About Us
                </Link>
                {loggedIn ? (
                  <button
                    className="ml-1 px-4 py-2 text-base font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border border-blue-700 shadow"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUsername(null);
                      setLoggedIn(false);
                      setUserPoints(null);
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
