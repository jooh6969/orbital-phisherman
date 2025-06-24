export const mockScamReports = [
  {
    id: 1,
    title: "Fake Bank Account Verification",
    scamType: "Banking",
    content:
      "URGENT: Your account has been temporarily suspended. Click here to verify your identity within 24 hours or your account will be permanently closed. Verify Now: suspicious-bank-site.com/verify",
    analysis: {
      suspicion: "High",
      reason:
        "Contains urgent language, suspicious domain, and impersonates legitimate bank",
      urls: ["suspicious-bank-site.com/verify", "fake-login.net"],
      tactic: "Account verification scam",
    },
    submittedBy: "SecurityExpert42",
    submittedAt: "2025-06-12",
    upvotes: 23,
    downvotes: 2,
    views: 156,
    userVote: null,
  },
  {
    id: 2,
    title: "Cryptocurrency Investment Scam",
    scamType: "Investment",
    content:
      "🚀 EXCLUSIVE CRYPTO OPPORTUNITY! 💎 Join our VIP group and turn $500 into $50,000 in just 30 days! Limited spots available. Our AI trading bot has 98% success rate. Don't miss out! Register: crypto-millions.biz",
    analysis: {
      suspicion: "High",
      reason:
        "Unrealistic profit promises, urgency tactics, and suspicious domain",
      urls: ["crypto-millions.biz", "telegram.me/cryptoscam"],
      tactic: "Get-rich-quick scheme",
    },
    submittedBy: "CryptoWatcher",
    submittedAt: "2025-06-11",
    upvotes: 45,
    downvotes: 1,
    views: 203,
    userVote: "up",
  },
  {
    id: 3,
    title: "Tech Support Phone Scam",
    scamType: "Tech Support",
    content:
      "Microsoft Security Alert: We have detected suspicious activity on your computer. Your system may be compromised. Call our certified technicians immediately at 1-800-FAKE-NUM. DO NOT use your computer until you speak with us.",
    analysis: {
      suspicion: "High",
      reason:
        "Impersonates Microsoft, creates false urgency, requests phone contact",
      urls: [],
      tactic: "Tech support impersonation",
    },
    submittedBy: "TechSafety101",
    submittedAt: "2025-06-10",
    upvotes: 31,
    downvotes: 0,
    views: 89,
    userVote: null,
  },
];

export const scamTypes = [
  "All",
  "Banking",
  "Investment",
  "Tech Support",
  "Romance",
  "Delivery",
  "Lottery",
];

export const colorHelpers = {
  getSuspicionColor: (level) => {
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
  },

  getScamTypeColor: (type) => {
    const colors = {
      Banking: "bg-blue-100 text-blue-800 border-blue-200",
      Investment: "bg-purple-100 text-purple-800 border-purple-200",
      TechSupport: "bg-orange-100 text-orange-800 border-orange-200",
      Romance: "bg-pink-100 text-pink-800 border-pink-200",
      Delivery: "bg-green-100 text-green-800 border-green-200",
      Lottery: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    // Default to blue if type is not found
    return colors[type] || "bg-blue-100 text-blue-800 border-blue-200";
  },
};
