import { useState, useEffect } from "react";
import supabase from "../hooks/createClient";
import Tesseract from "tesseract.js";
import { Header } from "../components/PhishingDetector/Header";
import { InputSection } from "../components/PhishingDetector/InputSection";
import { ResultBadge } from "../components/PhishingDetector/ResultBadge";
import { AnalysisSection } from "../components/PhishingDetector/AnalysisSection";
import { samplePhishingMessages } from "../data/sampleData";
import { Menu, X, HelpCircle } from "lucide-react";

import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Zap,
  Brain,
  BarChart3,
} from "lucide-react";

export default function PhishingDetector() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(null);
  const [MLResult, setMLResult] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [inputMode, setInputMode] = useState("text"); // 'text' or 'image'

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && user.email) {
        console.log(user);
        setUserLogged(user);
        setisLoggedIn(true);
      } else {
        setUserLogged(null);
        setisLoggedIn(false);
      }
    }
    fetchUser();
  }, []);

  // Load analysis history from Supabase on initial load
  useEffect(() => {
    async function loadHistory() {
      if (isLoggedIn) {
        try {
          const { data, error } = await supabase
            .from("analysis_history")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) {
            console.error("Error loading history:", error);
            return;
          }

          if (data && data.length > 0) {
            // Transform Supabase data to match the format expected by the app
            const formattedHistory = data.map((item) => ({
              id: item.id,
              timestamp: new Date(item.created_at).toLocaleString(),
              inputText: item.input_text,
              title: item.title,
              classification: item.classification,
              type: item.type,
              reason: item.reason,
              advice: item.advice,
              official_urls: item.official_urls,
              phishing_url: item.phishing_url,
              mlResult: item.ml_result,
            }));

            setHistory(formattedHistory);
          }
        } catch (error) {
          console.error("Failed to load history:", error);
        }
      }
    }

    loadHistory();
  }, [isLoggedIn, userLogged, history]);

  // Handle responsive behavior for the history sidebar
  useEffect(() => {
    const handleResize = () => {
      // On mobile, auto close the sidebar when switching to mobile view
      if (window.innerWidth < 768 && showHistory) {
        setShowHistory(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showHistory]);

  // Handle click outside for help tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHelp && !event.target.closest(".help-container")) {
        setShowHelp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHelp]);

  async function addRecord(result) {
    if (!isLoggedIn) {
      return "Please log in to post to forum!";
    }

    const { error: supabaseError } = await supabase.from("forum_db").insert({
      title: result.title,
      scamType: result.type,
      content: inputText,
      threat: result.classification,
      reason: result.reason,
      advice: result.advice,
      fakeurl: result.phishing_url,
      officialurl: result.officialurl,
      user: userLogged.email,
      user_id: userLogged.id,
    });

    if (supabaseError) {
      console.log("Record was not added!" + supabaseError);
      return supabaseError.message;
    } else {
      console.log("Added to supabase!");
      return "";
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");

      console.log("Extracted text:", text);
      setInputText(text);
      await handleProcess();
    } catch (error) {
      console.error("OCR error:", error);
      setError("Failed to extract text from image.");
    }

    setLoading(false);
  };

  // Save analysis to Supabase
  async function saveAnalysisToSupabase(analysisData) {
    if (!isLoggedIn || !userLogged) {
      console.log("User not logged in, cannot save history to Supabase");
      return false;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;

      // Format the data for Supabase table
      const supabaseEntry = {
        user_id: userId,
        input_text: analysisData.inputText,
        title: analysisData.title,
        classification: analysisData.classification,
        type: analysisData.type,
        reason: analysisData.reason,
        advice: analysisData.advice,
        official_urls: analysisData.official_urls,
        phishing_url: analysisData.phishing_url,
        ml_result: analysisData.mlResult,
        client_timestamp: analysisData.timestamp,
      };

      const { data, error } = await supabase
        .from("analysis_history")
        .insert(supabaseEntry);

      if (error) {
        console.error("Error saving analysis history to Supabase:", error);
        return false;
      }

      console.log("Analysis history saved to Supabase successfully");
      return true;
    } catch (error) {
      console.error("Failed to save analysis history:", error);
      return false;
    }
  }

  const handleProcess = async () => {
    setLoading(true);
    setResult(null);
    setMLResult(null);
    setShowPrompt(false);
    setError(null);

    try {
      const res = await fetch(
        "https://orbital-phisherman.onrender.com/api/llm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        }
      );

      const data = await res.json(); // RESPONSE FROM THE LLM

      //data format: title, advice, classification, official_url, reasoning, type of scam
      const result = {
        //something for threat level based off the ML model
        title: data.title,
        advice: data.advice,
        classification: data.classification,
        official_urls: data.official_url.split(",").map((link) => link.trim()),
        phishing_url: data.phishing_url,
        reason: data.reasoning,
        type: data.type,
      };

      //*----------------- CODE FOR THE ML --------------------*//
      //   try {
      //     const ml_res = await fetch("https://orbital-phisherman.onrender.com/predict", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ url: data.phishing_url }),
      //     });

      //     const ml_ret = await ml_res.json();

      //     const ml_analysis = {
      //       result: ml_ret.result, // classification
      //       confidence: ml_ret.confidence, //confidence of the prediction
      //     };

      //     setMLResult(ml_analysis);
      //   } catch (error) {
      //     console.error("Error with ML:", error);
      //     setError("ML Backend Error: " + error.message);
      //     setMLResult(null);
      //   }
      const ml_res = {
        result: "Phishing",
        confidence: "40.2",
      }; // HARD CODED CODE FOR NOW TO USE ON THE FRONT END

      setMLResult(ml_res);

      if (data.classification === "Phishing") {
        setShowPrompt(true);
      } //SHOW ADD TO FORUM PROMPT

      setResult(result);

      // Add to history - keep only the 3 most recent
      const newEntry = {
        timestamp: new Date().toLocaleString(),
        inputText: inputText,
        title: result.title,
        classification: result.classification,
        type: result.type,
        reason: result.reason,
        advice: result.advice,
        official_urls: result.official_urls,
        phishing_url: result.phishing_url,
        mlResult: ml_res,
      };

      // Save to Supabase if user is logged in
      if (isLoggedIn) {
        saveAnalysisToSupabase(newEntry);
      }
    } catch (error) {
      console.error("Error calling Flask backend:", error);
      setError("LLM Backend Error: " + error.message);
      setResult(null);
    }

    setLoading(false);
  };

  const handleAddToForum = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowPrompt(false);
    // Custom notification instead of alert
    const err = await addRecord(result);
    const notification = document.createElement("div");
    if (err === "") {
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
      notification.textContent = "✓ Added to community forum!";
    } else {
      notification.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse";
      notification.textContent = "Did not add successfully: " + err;
    }
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleViewPastAnalysis = (pastAnalysis) => {
    // Set the input text and results from the past analysis
    setInputText(pastAnalysis.inputText || "");

    // Recreate the result object from the history entry
    const pastResult = {
      title: pastAnalysis.title,
      classification: pastAnalysis.classification,
      type: pastAnalysis.type,
      reason: pastAnalysis.reason,
      advice: pastAnalysis.advice,
      official_urls: pastAnalysis.official_urls,
      phishing_url: pastAnalysis.phishing_url,
    };

    setResult(pastResult);
    setMLResult(pastAnalysis.mlResult);

    // On mobile, hide the history sidebar after selection
    if (window.innerWidth < 768) {
      setShowHistory(false);
    }

    // Show the "Post to Forum" prompt if it was a phishing attempt
    setShowPrompt(pastAnalysis.classification === "Phishing");
  };

  const handleAutopopulate = () => {
    // Randomly select a sample phishing message
    const randomSample =
      samplePhishingMessages[
        Math.floor(Math.random() * samplePhishingMessages.length)
      ];
    setInputText(randomSample.content);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] w-full relative">
      {/* Mobile Overlay when sidebar is open */}
      {showHistory && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => setShowHistory(false)}
        ></div>
      )}

      {/* History Sidebar */}
      <div
        className={`${
          showHistory ? "translate-x-0" : "-translate-x-full md:-translate-x-0"
        } fixed md:relative z-20 flex flex-col w-4/5 max-w-xs md:w-64 lg:w-72 bg-white md:bg-gray-50 border-r border-gray-200 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
          !showHistory ? "md:hidden" : ""
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">
            Analysis History
          </h3>
          <button
            onClick={() => setShowHistory(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Removed extra textarea/input box here. Only show history list below. */}

        {history.length > 0 ? (
          <div className="space-y-1 p-2 overflow-y-auto flex-grow">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleViewPastAnalysis(item)}
                className={`p-2 md:p-3 rounded-lg border cursor-pointer transition-colors flex flex-col ${
                  result && result.title === item.title
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">
                  {item.title || "Untitled Analysis"}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {item.timestamp.split(",")[0]}
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.classification === "Phishing"
                        ? "bg-red-100 text-red-700"
                        : item.classification === "Likely Phishing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.classification}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 h-full">
            <p>No analysis history yet</p>
            <p className="text-sm mt-2">
              Your recent analyses will appear here
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-grow overflow-auto transition-all duration-300`}>
        <div className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden mt-2 md:mt-8 px-0">
          <div className="relative flex justify-center items-center py-4 px-4 md:px-6 bg-gray-50 border-b border-gray-100">
            <button
              onClick={() => setShowHistory(true)}
              className="absolute left-4 flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden xs:inline">History</span>
            </button>

            <Header />

            <div className="absolute right-4 group help-container">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <div
                className={`absolute md:invisible ${
                  showHelp ? "visible" : "invisible"
                } md:group-hover:visible opacity-0 ${
                  showHelp ? "opacity-100" : "opacity-0"
                } md:group-hover:opacity-100 transition-all duration-300 ease-in-out right-0 mt-2 w-64 md:w-80 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-xs md:text-sm text-gray-700 z-30`}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold">How to use Phisherman AI:</p>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="md:hidden text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>
                    Paste a suspicious message or email in the text box or use
                    our autopoulate feature below
                  </li>
                  <li>Click "Analyze Message" to detect phishing attempts</li>
                  <li>View the ML and LLM analysis results</li>
                  <li>
                    For phishing messages, you can share with the community
                  </li>
                  <li>Use the history sidebar to review past analyses</li>
                </ol>
                <p className="mt-2 text-blue-600 text-xs">
                  Tip: The sidebar on the left stores your recent analyses.
                </p>
              </div>
            </div>
          </div>

          {/* Input type toggle */}
          <div className="mb-6 px-4 md:px-6 pt-4">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setInputMode("text")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  inputMode === "text"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Text Input
              </button>
              <button
                onClick={() => setInputMode("image")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  inputMode === "image"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Image Upload
              </button>
            </div>

            {inputMode === "image" ? (
              <div className="text-center">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload a Screenshot
                </label>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-semibold rounded-xl shadow-sm transition duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  Choose Image
                </label>
                {loading && (
                  <div className="mt-4 flex flex-col items-center space-y-2">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600">
                      Analyzing your image...
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <InputSection
                  inputText={inputText}
                  setInputText={setInputText}
                  loading={loading}
                  handleProcess={handleProcess}
                  handleAutopopulate={handleAutopopulate}
                />
                {loading && (
                  <div className="mt-4 flex flex-col items-center space-y-2">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600">
                      Analyzing your message...
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {error && (
            <div className="p-3 md:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm md:text-base">
              {error}
            </div>
          )}

          {result && (
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {result.title}
                </h2>
                <ResultBadge isPhishing={result.classification} />
              </div>

              <AnalysisSection
                mlAnalysis={
                  MLResult
                    ? {
                        result: MLResult.result,
                        confidence: parseFloat(MLResult.confidence),
                      }
                    : null
                }
                llmAnalysis={result}
              />

              {showPrompt && (
                <div className="mt-4 md:mt-6 p-4 md:p-6 bg-yellow-50 rounded-xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-yellow-900">
                        Share with Community
                      </h3>
                      <p className="text-sm md:text-base text-yellow-800">
                        Help others by sharing this phishing attempt in our
                        forum.
                      </p>
                    </div>
                    <button
                      onClick={handleAddToForum}
                      className="px-4 md:px-6 py-2 bg-yellow-600 text-white text-sm md:text-base rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Post to Forum
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
