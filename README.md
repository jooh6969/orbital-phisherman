# Phishermen

A comprehensive phishing detection platform that combines machine learning, LLM analysis, and community-driven insights to protect users from phishing attempts through both web interface and browser extension.

---

## 🚀 Level of Achievement

**Apollo 11**

Our project successfully integrates multiple complex systems:

- React frontend with advanced user authentication and real-time analysis
- Flask backend for ML model serving and LLM integration
- Chrome extension for real-time webpage monitoring
- Supabase for secure user management and data storage
- Community-driven phishing report system

---

## 🧠 Motivation

Phishing remains one of the most common and dangerous cyber threats today, targeting individuals and organizations through fake websites and misleading links. Despite existing browser warnings and anti-virus software, many users fall prey to these scams due to a lack of real-time URL validation tools. Our solution addresses this gap.

---

## 🎯 Project Scope

- **One-sentence version**: A real-time phishing detection tool that scans URLs using ML and large language models, providing users with instant safety ratings and community feedback.

- **Detailed version**: Phishermen is a web application that allows users to submit links and receive predictions about whether the website is a phishing attempt. It uses a trained machine learning model to extract and analyze features from the URL and its metadata, such as domain age, WHOIS information, and indexability. Additional LLM-based text classification is used to analyze suspicious messaging patterns. A community voting system lets users flag URLs as "Safe" or "Unsafe." Eventually, a browser extension will notify users proactively when they visit suspicious sites.

---

## 🧩 Core Features / User Stories

### Core Features

- 🔗 **Multi-modal Analysis** – Analyze both URLs and message content for phishing attempts
- 🖼️ **Image Text Extraction** – OCR capability to analyze screenshots of suspicious messages
- 🧠 **ML & LLM Integration** – Combines machine learning URL analysis with LLM-based text analysis
- 👥 **Community Forum** – Share and discuss detected phishing attempts
- � **User Dashboard** – Track analysis history and community contributions
- 🔐 **Secure Authentication** – Email/password authentication with user profiles
- 🌐 **Chrome Extension** – Real-time webpage monitoring and analysis
- 🎮 **Reality Mode** – Interactive quiz-based learning system to train users in identifying phishing attempts

### User Stories

- As a user, I can paste text or upload screenshots for phishing analysis
- As a user, I receive detailed ML confidence scores and LLM reasoning
- As a user, I can share detected phishing attempts with the community
- As a user, I can track my analysis history
- As a user, I get real-time protection through the Chrome extension
- As a user, I can expose myself to real world examples of phishing scams to educate myself

---

## 🛠️ Tech Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Frontend    | React, Tailwind CSS, Tesseract.js    |
| Backend     | Flask (Python), Supabase             |
| Auth & DB   | Supabase Authentication, PostgreSQL  |
| ML & AI     | Scikit-learn, Google Gemini          |
| Browser Ext | Chrome Extension API                 |
| Deployment  | Netlify (Frontend), Render (Backend) |
| Versioning  | GitHub                               |

## 🔧 Installation & Testing

### Web Application

1. Visit [https://orbital-phishermen.netlify.app/](https://orbital-phishermen.netlify.app/)
2. Create an account or log in
3. Try the phishing detector with text input or screenshot
4. Explore the community forum and your analysis history

### Chrome Extension

1. Download the extension files from the `chrome_extension` folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `chrome_extension` folder
5. The extension icon should appear in your toolbar
6. Click the icon to analyze the current webpage

### Development Setup

1. Clone the repository
2. Frontend setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Backend setup:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

---

## 🗺️ Development Timeline

| Milestone   | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| Milestone 1 | Finalized idea, setup repo, implemented working prototype with ML model |
| Milestone 2 | Complete backend features, frontend integration, and partial LLM logic  |
| Milestone 3 | Polish UX/UI, user testing, finalize browser extension, optimize model  |

---

## 📊 Team Contributions & Time Log

All development and design work are documented in our shared time log spreadsheet:
👉 [Google Sheets Link to Project Log](https://docs.google.com/spreadsheets/d/1L41HYaqdnooXWYEMIe4ml_HP8J5QQLHBwhEK8YZ69uQ/edit?gid=375014103#gid=375014103)

---

## 🖼️ Poster & Demo

- 🖼️ [View Project Poster](https://drive.google.com/drive/u/1/folders/1_I00dTd_j1JlylFrSjwF4N_xdRSGH21_)
- 🎥 [Watch Demo Video](https://drive.google.com/drive/u/1/folders/1_I00dTd_j1JlylFrSjwF4N_xdRSGH21_)

---

## 🔗 Live Project Links

- **Frontend (Netlify)**: [https://orbital-phishermen.netlify.app/](https://orbital-phishermen.netlify.app/)
- **Backend (Render)**: [https://phishing-backend-beh4.onrender.com](https://phishing-backend-beh4.onrender.com)

---

## 📌 Repository Structure

Orbital-7494/
├── Backend/
│ ├── app.py
│ ├── feature_extraction.py
│ ├── phish_llm.py
│ ├── phishing_model.pkl
│ ├── phishing_keywords.csv
│ ├── dataset_phishing.csv
│ ├── .env
│ ├── requirements.txt
│ └── Procfile
└── frontend/
└── ... (React app files)

---

## 👨‍💻 Authors

- **jooh6969** – [GitHub Profile](https://github.com/jooh6969)
- **stanley-ting** - [GitHub Profile](https://github.com/stanley-ting)

---
