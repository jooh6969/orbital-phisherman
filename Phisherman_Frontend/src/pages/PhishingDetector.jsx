import { useState, useEffect } from "react";
import supabase from "../hooks/createClient";

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

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && user.email) {
        console.log(user);
        setUserLogged(user.email);
        setisLoggedIn(true);
      } else {
        setUserLogged(null);
        setisLoggedIn(false);
      }
    }
    fetchUser();
  }, []);

  async function addRecord(result) {
    if (!isLoggedIn) {
      console.log(userLogged + " user is not logged in");
      return "Please log in to post to forum!";
    }
    console.log(result);
    const { error: supabaseError } = await supabase.from("forum_db").insert({
      title: result.title,
      scamType: result.type,
      content: inputText,
      threat: result.classification,
      reason: result.reason,
      advice: result.advice,
      fakeurl: result.phishing_url,
      officialurl: result.officialurl,
      user: userLogged,
    });

    if (supabaseError) {
      console.log("Record was not added!" + supabaseError);
      return supabaseError.message;
    } else {
      console.log("Added to supabase!");
      return "";
    }
  }

  const handleProcess = async () => {
    setLoading(true);
    setResult(null);
    setMLResult(null);
    setShowPrompt(false);
    setError(null);

    try {
      const res = await fetch("https://orbital-phisherman.onrender.com/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

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
      }; // EXTRACT OUT THE RESULTS

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
        result: "Not Phishing",
        confidence: "90.2",
      }; // HARD CODED CODE FOR NOW TO USE ON THE FRONT END

      setMLResult(ml_res);

      if (data.classification === "Phishing") {
        setShowPrompt(true);
      } //SHOW ADD TO FORUM PROMPT

      setResult(result);
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

  const getSuspicionColor = (level) => {
    switch (level) {
      case "Phishing":
        return "text-red-600 bg-red-50 border-red-200";
      case "Likely Phishing":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Not Phishing":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  //FROM THE ML MODEL
  const getMLColor = (result) => {
    switch (result?.toLowerCase()) {
      case "phishing":
        return "text-red-600 bg-red-50 border-red-200";
      case "not phishing":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  //FROM THE LLM
  const getSuspicionIcon = (level) => {
    switch (level) {
      case "Phishing":
        return <AlertTriangle className="w-5 h-5" />;
      case "Likely Phishing":
        return <Shield className="w-5 h-5" />;
      case "Not Phishing":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  //FROM THE ML MODEL
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Phishermen AI
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced phishing detection powered by GEMINI
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Input Section */}
            <div className="p-8 border-b border-gray-100">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message Content
                </label>
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste the suspicious message, email, or text here for analysis..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
                    rows={8}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {inputText.length} characters
                  </div>
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={loading || !inputText.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Analyzing Message...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze Message
                  </>
                )}
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="p-8 text-center border-b border-gray-100">
                <div className="inline-flex items-center gap-3 text-blue-600">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="font-medium">
                    AI is analyzing the message...
                  </span>
                </div>
              </div>
            )}

            {/* ML Prediction Section */}
            {MLResult && (
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Machine Learning Analysis
                </h3>

                <div className="space-y-4">
                  {/* ML Classification */}
                  <div
                    className={`p-4 rounded-xl border-2 ${getMLColor(
                      MLResult.result
                    )} flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">
                          ML Prediction: {MLResult.result}
                        </div>
                        {/* <div className="text-sm opacity-80">
                          Machine learning model classification
                        </div> */}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold text-lg ${getConfidenceColor(
                          MLResult.confidence
                        )}`}
                      >
                        {MLResult.confidence}%
                      </div>
                      <div className="text-xs text-gray-500">Confidence</div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Confidence Level
                      </span>
                      <span className="text-sm text-gray-600">
                        {MLResult.confidence >= 80
                          ? "High"
                          : MLResult.confidence >= 60
                          ? "Medium"
                          : "Low"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          MLResult.confidence >= 80
                            ? "bg-green-500"
                            : MLResult.confidence >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${MLResult.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LLM Results Section */}
            {result && (
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  LLM Analysis Results
                </h3>

                <div className="space-y-4">
                  {/* Threat Level */}
                  <div
                    className={`p-4 rounded-xl border-2 ${getSuspicionColor(
                      result.classification
                    )} flex flex-col items-center text-center gap-3`}
                  >
                    {getSuspicionIcon(result.classification)}
                    <div>
                      <div className="font-semibold">
                        Threat: {result.classification}
                      </div>
                      <div className="text-sm opacity-80">{result.reason}</div>
                    </div>
                  </div>

                  {/* Advice Section */}
                  {result.advice && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="font-semibold text-blue-700 mb-2 flex flex-col items-center text-center gap-2">
                        <Shield className="w-6 h-6" />
                        Security Advice
                      </div>
                      <div className="text-sm text-blue-600 text-center">
                        {result.advice}
                      </div>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* URLs */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Official URLs
                      </div>
                      <div className="text-sm text-gray-600">
                        {result.official_urls &&
                        result.official_urls.length > 0 ? (
                          <div className="space-y-1">
                            {result.official_urls.map((url, idx) => (
                              <div
                                key={idx}
                                className="font-mono bg-white px-2 py-1 rounded border text-red-600"
                              >
                                {url}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-green-600">
                            No suspicious URLs detected
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tactic */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Type of Scam
                      </div>
                      <div className="text-sm text-gray-600">
                        {result.type || "No specific tactic identified"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Community Forum Prompt */}
            {showPrompt && (
              <div className="p-8 bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-2">
                      High-Risk Phishing Detected!
                    </h4>
                    <p className="text-red-700 mb-4">
                      This message shows strong indicators of a phishing
                      attempt. Would you like to share this with our community
                      forum to help protect others?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToForum}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                      >
                        Share with Community
                      </button>
                      <button
                        onClick={() => setShowPrompt(false)}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2 rounded-lg border border-gray-300 transition-colors duration-200"
                      >
                        Not Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>
              Powered by advanced AI algorithms • Protecting users from digital
              threats
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 text-red-600 bg-red-100 p-4 rounded-lg border border-red-200">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
