
# Node.js Script to Auto-Populate Trello Board from your CLI 

This Node.js mini project allows you to **auto-populate a Trello board** from your CLI. 

It was built to improve your productivity, instead of creating cards and typing long list via Trello GUI.
---

## 📌 What It Does

- Reads a structured JSON file containing the contents you want to populate
- Authenticates using Trello's REST API
- Creates Trello lists and cards automatically
- Adds checklist items with links to resources (videos, articles, problems)
- Organizes learning workflow: `Topics → Focus → Current → Covered`

---

## ✅ Features

- Powered by **Node.js + async fetch**
- Secret keys stored in `.env`
- Example structured for **6-month frontend study plan**
- Respects a clear **learning workflow**
- Completely configurable by editing a single `.json` file

---

## 📁 Folder Structure

```

Trello\_Board\_Auto\_Pop/
├── .env
├── import\_to\_trello.js
├── third\_faang\_frontend\_full\_workflow\.json
├── README.md

````

---

## 🛠 Setup Instructions

### 1. Clone or Download

```bash
git clone https://github.com/your-username/trello-board-autopop.git
cd Trello_Board_Auto_Pop
````

### 2. Install Dependencies

```bash
npm init -y
npm install dotenv
```

### 3. Add Trello API Credentials to `.env`

```env
TRELLO_API_KEY=your_trello_api_key
TRELLO_TOKEN=your_trello_token
TRELLO_BOARD_ID=your_board_id
```

> ✅ Get your API Key and Token here:
> [https://trello.com/app-key](https://trello.com/app-key)

---

### 4. Update Your JSON Plan

Edit `third_faang_frontend_full_workflow.json` to fit your learning plan.

---

### 5. Run the Script

```bash
node import_to_trello.js
```

---

## 📋 Example Trello Structure

* **Topics**: all planned study topics
* **Focus**: topics for this week's sprint
* **Current**: what you're studying right now
* **Covered**: completed and reviewed topics

---


## 🙌 Contribution

Pull requests are welcome if you'd like to extend this (e.g., label support, due dates, Markdown formatting, etc.).

---

## 📣 Shout-out

This project was inspired by a real-world learning need and powered with help from **ChatGPT** to bootstrap it fast 🚀

---

Let’s go build 💻📚
```
