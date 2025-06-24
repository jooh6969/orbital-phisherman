# Phishermen

A machine learning-powered phishing detection platform that analyzes URLs and warns users of suspicious websites in real-time.

---

## 🚀 Proposed Level of Achievement

**Apollo 11**

We aim for the Apollo 11 level as our project integrates multiple systems: a React frontend, Flask backend, and an ML model with additional API integrations (WHOIS, SERPAPI, and Gemini). We have made significant progress on our prototype and plan to expand it further based on feedback and testing.

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
- 🔗 **URL Submission Interface** – Input form to analyze suspicious links.
- 🧠 **ML-based Phishing Detection** – Detects phishing based on features from the URL.
- 💬 **LLM Message Analysis (planned)** – Detects scam-like phrasing using Gemini.
- 👥 **Community Voting System** – Allows users to vote "Safe" or "Unsafe."
- 🌐 **Browser Extension (planned)** – Warns users in real-time on visiting shady links.

### User Stories
- As a user, I want to paste a URL and get an immediate safety verdict.
- As a user, I want to view the confidence level of the detection.
- As a user, I want to flag phishing websites and see what others voted.
- As a user, I want the tool to work automatically when I browse.

---

## 🛠️ Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | React, Tailwind CSS        |
| Backend      | Flask (Python)             |
| Model APIs   | Scikit-learn, Gemini API   |
| External APIs| WHOIS XML, SerpAPI, ScraperAPI |
| Deployment   | Netlify (Frontend), Render (Backend) |
| Versioning   | GitHub                     |

---

## 🗺️ Development Timeline

| Milestone      | Description                                                             |
|----------------|-------------------------------------------------------------------------|
| Milestone 1    | Finalized idea, setup repo, implemented working prototype with ML model |
| Milestone 2    | Complete backend features, frontend integration, and partial LLM logic  |
| Milestone 3    | Polish UX/UI, user testing, finalize browser extension, optimize model  |

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

- **Frontend (Netlify)**: [https://elaborate-druid-a59398.netlify.app/](https://elaborate-druid-a59398.netlify.app/)
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
