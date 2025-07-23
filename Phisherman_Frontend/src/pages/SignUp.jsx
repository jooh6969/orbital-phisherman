import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../hooks/createClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function signUpNewUser() {
    setIsSubmitting(true);

    try {
      // First check if username already exists
      const { data: existingUsers, error: searchError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (searchError && searchError.code !== "PGRST116") {
        console.error("Username check failed:", searchError);
        return "Error checking username availability";
      }

      if (existingUsers) {
        return "Username is already taken. Please choose another one.";
      }

      // Proceed with signup if username is available
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
            },
          },
        });

      if (signUpError) {
        console.error("Sign-up failed:", signUpError);
        const errorMessage =
          signUpError.message || "An error occurred during sign up";
        setError(errorMessage);
        return errorMessage;
      }

      // Check if we have the expected data
      if (!signUpData) {
        const message = "No response data received from server";
        console.error(message);
        setError(message);
        return message;
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: signUpData.user.id,
          username: username,
          is_admin: false,
          points: 0,
        },
      ]);

      if (profileError) {
        console.error("Profile creation failed:", profileError);
        return "Failed to create user profile";
      }

      return "";
    } catch (error) {
      const message = error.message || "An unexpected error occurred";
      setError(message);
      return message;
    } finally {
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !username || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Clear any existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className =
      "notification fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50";

    try {
      notification.className += " bg-blue-500 text-white";
      notification.textContent = "Creating account...";
      document.body.appendChild(notification);

      const err = await signUpNewUser();

      if (err === "") {
        notification.className =
          "notification fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
        notification.textContent = "✓ Account Successfully Created! ";

        setError("");
        setUsername("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          notification.remove();
          navigate("/login");
        }, 3000);
      } else {
        notification.className =
          "notification fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
        notification.textContent = "Error: " + err;
        setTimeout(() => notification.remove(), 3000);
      }
    } catch (error) {
      notification.className =
        "notification fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      notification.textContent = "An unexpected error occurred";
      setTimeout(() => notification.remove(), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Sign Up
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="signup-email">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="signup-password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              id="signup-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="signup-username"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              id="signup-username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="This name will be displayed"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded-lg font-semibold transition-colors`}
          >
            {isSubmitting ? "Please wait..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
