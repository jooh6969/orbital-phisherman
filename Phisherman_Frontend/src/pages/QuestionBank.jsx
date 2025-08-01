import RealLogin from '../assets/RealLogin.png';
import FakeLogin from '../assets/FakeLogin.png';
import FakeEmail from '../assets/FakeEmail.png';
import RealEmail from '../assets/RealEmail.png';
import FakePaypal from '../assets/FakePaypal.png';
import RealPaypal from '../assets/RealPaypal.png';

export const allQuestions = [
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
  },
  // --- True/False Questions ---
  {
    title: "Password Sharing",
    scenario: "It is safe to share your password with your manager if they ask for it.",
    options: [
      { text: "True", isCorrect: false, explanation: "You should never share your password with anyone, even your manager." },
      { text: "False", isCorrect: true, explanation: "Passwords are personal and should never be shared." }
    ]
  },
  {
    title: "HTTPS Means Safe",
    scenario: "If a website uses HTTPS, it is always safe to enter your personal information.",
    options: [
      { text: "True", isCorrect: false, explanation: "HTTPS only means the connection is encrypted, not that the site is trustworthy." },
      { text: "False", isCorrect: true, explanation: "Phishing sites can also use HTTPS. Always check the website's legitimacy." }
    ]
  },
  {
    title: "Urgent Requests",
    scenario: "Phishing emails often create a sense of urgency to trick you into acting quickly.",
    options: [
      { text: "True", isCorrect: true, explanation: "Urgency is a common tactic used by phishers to pressure victims." },
      { text: "False", isCorrect: false, explanation: "Be wary of urgent requests, especially for sensitive information." }
    ]
  },
  {
    title: "Pop-up Security Warnings",
    scenario: "Legitimate companies will never use pop-up windows to ask for your login credentials.",
    options: [
      { text: "True", isCorrect: true, explanation: "Pop-up windows asking for credentials are a red flag for phishing." },
      { text: "False", isCorrect: false, explanation: "You should never enter credentials into pop-up windows." }
    ]
  },
  // --- More Image-Based Questions ---
  {
    type: "image",
    title: "Email – Real or Phishing?",
    scenario: "Which of these emails is a phishing attempt?",
    images: [
      {
        src: FakeEmail,
        label: "A",
        isFake: true
      },
      {
        src: RealEmail,
        label: "B",
        isFake: false
      }
    ],
    options: [
      {
        text: "A is phishing",
        isCorrect: true,
        explanation: "The l in paypal has been replaced with a capital I"
      },
      {
        text: "B is phishing",
        isCorrect: false,
        explanation: "Email B is a legitimate email."
      }
    ]
  },
  {
    type: "image",
    title: "Login Page – Spot the Fake",
    scenario: "One of these login pages is a phishing site. Which one?",
    images: [
      {
        src: RealLogin,
        label: "1",
        isFake: false
      },
      {
        src: FakeLogin,
        label: "2",
        isFake: true
      }
    ],
    options: [
      {
        text: "1 is fake",
        isCorrect: false,
        explanation: "Login 1 is the real site."
      },
      {
        text: "2 is fake",
        isCorrect: true,
        explanation: "Login 2 is a phishing site mimicking the real login page."
      }
    ]
  },
  {
    type: "image",
    title: "Website – Real or Phishing?",
    scenario: "Which of these websites is a phishing site?",
    images: [
      {
        src: "FakePaypal", 
        label: "A",
        isFake: true
      },
      {
        src: "RealPaypal", 
        label: "B",
        isFake: false
      }
    ],
    options: [
      {
        text: "A is phishing",
        isCorrect: true,
        explanation: "A shows visual inconsistencies or suspicious URL formatting."
      },
      {
        text: "B is phishing",
        isCorrect: false,
        explanation: "B is a legitimate website with proper branding and URL."
      }
    ]
  }
];
