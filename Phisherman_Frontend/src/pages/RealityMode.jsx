import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RealityMode() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const fromTab = location.state?.fromTab || "home";

  // Full question bank (10 questions)
  const allQuestions = [
    {
      title: "Phishing Email",
      scenario: "You receive an email from 'your bank' asking you to verify your account by clicking a link. What do you do?",
      options: [
        { text: "Click the link and enter your login details", isCorrect: false, explanation: "Never click suspicious links. Banks don't ask for credentials via email." },
        { text: "Log into your bank's official website directly to check", isCorrect: true, explanation: "Always go directly to the official website rather than clicking email links." },
        { text: "Reply to the email asking for more information", isCorrect: false, explanation: "Replying confirms your email is active and may lead to more phishing attempts." }
      ]
    },
    {
      title: "Suspicious Text Message",
      scenario: "You get a text saying 'Congratulations! You've won $1000. Click here to claim your prize.'",
      options: [
        { text: "Click the link immediately to claim the prize", isCorrect: false, explanation: "Legitimate contests don't notify winners via random text messages." },
        { text: "Delete the message without clicking anything", isCorrect: true, explanation: "Prize scam texts are very common. Deleting is the safest option." },
        { text: "Forward it to friends so they can win too", isCorrect: false, explanation: "This spreads the scam to others and puts them at risk too." }
      ]
    },
    {
      title: "Social Media Friend Request",
      scenario: "You receive a friend request from someone claiming to be a distant relative with no mutual friends.",
      options: [
        { text: "Accept immediately - family is family", isCorrect: false, explanation: "Scammers often impersonate relatives to gain trust and access personal info." },
        { text: "Message asking how you're related before accepting", isCorrect: true, explanation: "Verifying relationships helps protect against impersonation scams." },
        { text: "Accept and share your recent photos with them", isCorrect: false, explanation: "Sharing personal info with unverified contacts is risky." }
      ]
    },
    {
      title: "Tech Support Call",
      scenario: "Someone calls claiming to be from Microsoft, saying your computer has a virus and needs immediate fixing.",
      options: [
        { text: "Give them remote access to help fix the 'virus'", isCorrect: false, explanation: "Microsoft doesn't make unsolicited calls. This gives scammers full computer access." },
        { text: "Hang up and contact Microsoft directly if concerned", isCorrect: true, explanation: "Legitimate tech companies don't make cold calls about computer problems." },
        { text: "Ask them to prove they're from Microsoft first", isCorrect: false, explanation: "Scammers can fake credentials. It's better to hang up and verify independently." }
      ]
    },
    {
      title: "Urgent Payment Request",
      scenario: "Your 'boss' emails urgently asking you to buy gift cards for a client meeting and send the codes.",
      options: [
        { text: "Buy the gift cards immediately to help your boss", isCorrect: false, explanation: "This is a common business email compromise scam. Legitimate bosses don't request gift cards." },
        { text: "Call or meet your boss in person to verify the request", isCorrect: true, explanation: "Always verify unusual payment requests through a different communication channel." },
        { text: "Ask for the client's contact info to coordinate directly", isCorrect: false, explanation: "This might seem logical but doesn't address the core issue of verification." }
      ]
    },
    {
      title: "Dating App Romance",
      scenario: "Someone you met on a dating app quickly professes love and asks for money for a family emergency.",
      options: [
        { text: "Send money to help someone you care about", isCorrect: false, explanation: "Romance scammers build emotional connections to exploit victims financially." },
        { text: "Suggest meeting in person before any financial help", isCorrect: true, explanation: "Legitimate relationships involve meeting in person. Scammers avoid this." },
        { text: "Ask for proof of the emergency first", isCorrect: false, explanation: "Scammers can fake documentation. The request itself is the red flag." }
      ]
    },
    {
      title: "Job Offer Scam",
      scenario: "You receive a job offer via email offering high pay for easy work, but they ask for your Social Security number upfront.",
      options: [
        { text: "Provide your SSN since they need it for employment", isCorrect: false, explanation: "Legitimate employers verify identity after hiring, not before interviews." },
        { text: "Research the company and request an in-person interview", isCorrect: true, explanation: "Legitimate job offers involve proper interviews and verification processes." },
        { text: "Ask them to send a contract first", isCorrect: false, explanation: "Scammers can create fake contracts. The SSN request is already a red flag." }
      ]
    },
    {
      title: "Fake Charity Appeal",
      scenario: "After a natural disaster, you receive calls asking for immediate donations to help victims.",
      options: [
        { text: "Donate immediately over the phone with your credit card", isCorrect: false, explanation: "Scammers exploit disasters for donations. Never give payment info to unsolicited callers." },
        { text: "Research established charities and donate through their official websites", isCorrect: true, explanation: "Donate to verified charities through their official channels to ensure funds reach victims." },
        { text: "Ask the caller to send you information by mail", isCorrect: false, explanation: "This delays the scam but doesn't eliminate the risk. Research legitimate charities instead." }
      ]
    },
    {
      title: "Investment Opportunity",
      scenario: "A friend on social media shares a 'guaranteed' investment opportunity promising 50% returns in one month.",
      options: [
        { text: "Invest immediately since your friend recommends it", isCorrect: false, explanation: "Guaranteed high returns don't exist. Your friend's account may be compromised." },
        { text: "Research the investment independently and consult financial advisors", isCorrect: true, explanation: "All investments carry risk. Legitimate opportunities involve proper research and documentation." },
        { text: "Invest a small amount to test if it works", isCorrect: false, explanation: "Even small investments can be lost, and initial payouts are often used to lure bigger investments." }
      ]
    },
    {
      title: "Account Verification",
      scenario: "You get an email saying your Netflix account will be suspended unless you update your payment information within 24 hours.",
      options: [
        { text: "Click the link and update your payment info quickly", isCorrect: false, explanation: "Urgency is a common phishing tactic. Legitimate companies give reasonable notice periods." },
        { text: "Log into Netflix directly through their website to check your account", isCorrect: true, explanation: "Always access accounts through official websites, not email links." },
        { text: "Call the phone number provided in the email", isCorrect: false, explanation: "Scammers can provide fake phone numbers. Use official contact methods instead." }
      ]
    }
  ];

  // Shuffle and select 5 random questions when component mounts
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledQuestions = shuffleArray(allQuestions);
    setSelectedQuestions(shuffledQuestions.slice(0, 5));
  }, []);

  const currentQ = selectedQuestions[currentQuestion];

  // Show feedback modal
  const showFeedback = (isCorrect, explanation) => {
    setFeedbackText(isCorrect ? `Correct! ${explanation}` : `Incorrect: ${explanation}`);
    setIsCorrectAnswer(isCorrect);
    setShowModal(true);
  };

  // Handle modal dismiss
  const handleNext = () => {
    setShowModal(false);
    
    if (isCorrectAnswer) {
      // If correct and not the last question, move to next question
      if (currentQuestion < selectedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Completed all questions successfully
        setQuizCompleted(true);
      }
    } else {
      // If incorrect, restart the quiz with new random questions
      const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      
      const shuffledQuestions = shuffleArray(allQuestions);
      setSelectedQuestions(shuffledQuestions.slice(0, 5));
      setCurrentQuestion(0);
    }
  };

  // Close button handler
  const handleClose = () => {
    navigate(fromTab === "home" ? "/" : `/${fromTab}`);
  };

  // Restart quiz with new random questions
  const handleRestart = () => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    const shuffledQuestions = shuffleArray(allQuestions);
    setSelectedQuestions(shuffledQuestions.slice(0, 5));
    setCurrentQuestion(0);
    setQuizCompleted(false);
  };

  // Return to home
  const handleReturnHome = () => {
    navigate(fromTab === "home" ? "/" : `/${fromTab}`);
  };

  // Don't render anything if questions haven't been selected yet
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
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 left-6 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          ← Back
        </button>

        {/* Progress Bar */}
        {!quizCompleted && (
          <div className="absolute top-6 right-6 bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm">
            Question {currentQuestion + 1} / {selectedQuestions.length}
          </div>
        )}

        {/* Header with Icon and Title */}
        <div className="text-center pt-8 pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2 16.5V15a5 5 0 015-5h10a5 5 0 015 5v1.5a2.5 2.5 0 01-5 0V15H7v1.5a2.5 2.5 0 01-5 0z"
              />
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
              {/* Current Question Title */}
              <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">{currentQ.title}</h2>
              <p className="text-lg opacity-90 drop-shadow leading-relaxed">
                {currentQ.scenario}
              </p>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => showFeedback(option.isCorrect, option.explanation)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Quiz Completion Screen */
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-green-400 drop-shadow-lg">🎉 Congratulations!</h2>
              <p className="text-xl opacity-90 drop-shadow">
                You've successfully completed all 5 phishing awareness questions!
              </p>
              <p className="text-lg opacity-80 drop-shadow">
                You're now better equipped to identify and avoid phishing attempts.
              </p>
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

        {/* Feedback Modal */}
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
                  : "Restart Quiz"
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}