import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signUpNewUser() {
    console.log(email);
    console.log(username);
    console.log(password);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {
            displayName: username, 
          },
        },
      }
    );

    if (signUpError) {
      console.error("Sign-up failed:", signUpError.message);
      setError(signUpError.message);
      return signUpError.message;
    }

    //const user = signUpData.user;

    // 2. If user creation succeeded, store username in "profiles" table
    // const { error: insertError } = await supabase.from("profiles").insert([
    //   {
    //     user_id: user.id,
    //     username: username, // or just `username` if variable name matches
    //   },
    // ]);

    // if (insertError) {
    //   setError(insertError.message);
    //   console.log(insertError);
    //   return insertError.message;
    // } else {
    //   console.log("User and profile created successfully!");
    //   setError("");
    //   return "";
    // }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = await signUpNewUser();
    const notification = document.createElement("div");
    if (err === "") {
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
      notification.textContent = "✓ Account Successfully Created";
      setError("");
      setPassword("");
      setUsername("");
      setEmail("");
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
        navigate("/login");
      }, 2000);
    } else {
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
      notification.textContent = "Something went wrong! " + err;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Sign Up
        </h2>
        <form>
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
              htmlFor="signup-username"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              id="signup-username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
