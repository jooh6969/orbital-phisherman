import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { allQuestions } from './QuestionBank';
import supabase from '../hooks/createClient';

export default function RealityMode() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fromTab = location.state?.fromTab || "home";

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledQuestions = shuffleArray(allQuestions)
      .slice(0, 5)
      .map(q => ({
        ...q,
        options: q.options ? shuffleArray(q.options) : q.options
      }));

    setSelectedQuestions(shuffledQuestions);
  }, []);


  const currentQ = selectedQuestions[currentQuestion];

  // Feedback handler must be outside JSX
  const showFeedback = (isCorrect, explanation) => {
    if (showModal) return; // Prevent double feedback
    setFeedbackText(isCorrect ? `Correct! ${explanation}` : `Incorrect: ${explanation}`);
    setIsCorrectAnswer(isCorrect);
    setShowModal(true);
    if (!isCorrect) {
      setFirstAttempt(false);
    }
  };

  const handleNext = async () => {
    setShowModal(false);

    if (isCorrectAnswer) {
      if (firstAttempt) {
        setCorrectCount((prev) => prev + 1);
      }
      setFirstAttempt(true); // reset for next question
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Failed to get user:", userError?.message);
        return;
      }

      const userId = user.id;
      console.log("Supabase user ID:", userId);

      // Ensure user has a row in profiles
      await supabase
        .from("profiles")
        .upsert({ user_id: userId, points: 0 }, { onConflict: "user_id" });

      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("points")
        .eq("user_id", userId)
        .single();

      if (fetchError) {
        console.error("Error fetching current points:", fetchError.message);
      } else {
        const newPoints = (profile.points ?? 0) + 1;
        console.log("Updating points to:", newPoints);

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ points: newPoints })
          .eq("user_id", userId);

        if (updateError) {
          console.error("Failed to update user points:", updateError.message);
        } else {
          console.log("Points updated successfully.");
          window.dispatchEvent(new Event("pointsUpdated"));
        }
      }

      if (currentQuestion < selectedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    } else {
      setFirstAttempt(false); // mark that first attempt failed
    }
    // If incorrect let user retry
  };


  const handleClose = () => {
    navigate(fromTab === "home" ? "/" : `/${fromTab}`);
  };

  const handleRestart = () => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledQuestions = shuffleArray(allQuestions)
      .slice(0, 5)
      .map(q => ({
        ...q,
        options: q.options ? shuffleArray(q.options) : q.options
      }));

    setSelectedQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setCorrectCount(0);
    setFirstAttempt(true);
  };

  const handleReturnHome = () => {
    navigate(fromTab === "home" ? "/" : `/${fromTab}`);
  };

  if (selectedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-sans">
      <div className="bg-black bg-opacity-50 min-h-screen px-4 py-6 relative text-white">
        <button onClick={handleClose} className="absolute top-6 left-6 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-4 py-2 rounded-full text-sm transition-all">← Back</button>

        {!quizCompleted && (
          <div className="absolute top-6 right-6 bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm">
            Question {currentQuestion + 1} / {selectedQuestions.length}
          </div>
        )}

        <div className="text-center pt-8 pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 16.5V15a5 5 0 015-5h10a5 5 0 015 5v1.5a2.5 2.5 0 01-5 0V15H7v1.5a2.5 2.5 0 01-5 0z" />
              <circle cx="8.5" cy="13" r="1" fill="currentColor" />
              <circle cx="15.5" cy="13" r="1" fill="currentColor" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10v.01M15 10v.01" />
            </svg>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Reality Mode</h1>
          </div>
          <p className="text-sm text-gray-300 opacity-90">Test your phishing awareness skills</p>
        </div>

        <div className="max-w-xl mx-auto pt-8 pb-10 space-y-10 text-center">
          {!quizCompleted ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">{currentQ.title}</h2>
              <p className="text-lg opacity-90 drop-shadow leading-relaxed">{currentQ.scenario}</p>

              {currentQ.type === "image" ? (
                <div className="flex justify-center gap-4 flex-wrap">
                  {currentQ.images.map((img, i) => (
                    <div key={i} className="w-full sm:w-[45%]">
                      <img
                        src={img.src}
                        alt={`Option ${img.label}`}
                        className={`rounded shadow-lg transition-transform ${showModal ? '' : 'hover:scale-105 cursor-pointer'}`}
                        style={{ pointerEvents: showModal ? 'none' : 'auto', opacity: showModal ? 0.6 : 1 }}
                        onClick={() => {
                          showFeedback(
                            img.isFake === true,
                            img.isFake
                              ? "Correct! This message is a scam."
                              : "Incorrect – that one is actually real."
                          );
                        }}
                      />
                      <p className="text-white text-center mt-2 font-semibold">Option {img.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        showFeedback(option.isCorrect, option.explanation);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-green-400 drop-shadow-lg">🎉 Congratulations!</h2>
          <p className="text-xl opacity-90 drop-shadow">You've successfully completed all 5 phishing awareness questions!</p>
          <p className="text-lg font-semibold text-blue-300 drop-shadow">Your Score: {correctCount} / {selectedQuestions.length}</p>
              <p className="text-lg opacity-80 drop-shadow">You're now better equipped to identify and avoid phishing attempts.</p>
              <div className="space-y-4 pt-6">
                <button
                  onClick={handleRestart}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Take Quiz Again
                </button>
                <button
                  onClick={handleReturnHome}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Return
                </button>
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-white text-gray-800 rounded-xl p-6 w-80 shadow-2xl text-center transform scale-100 transition-transform">
              <p className="mb-4 text-base leading-relaxed">{feedbackText}</p>
              <button
                onClick={handleNext}
                className={`mt-2 transition-all duration-300 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isCorrectAnswer
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                }`}
              >
                {isCorrectAnswer
                  ? (currentQuestion === selectedQuestions.length - 1 ? "Complete Quiz" : "Next Question")
                  : "Try Again"
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
