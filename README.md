# Note Mood 🧠💬

> A smart journaling web application that empowers users to understand, track, and reflect on their emotions using AI-powered sentiment and aspect analysis.

## 📰 About the Project

**Note Mood** is a graduation project featured in [Al-Watan newspaper](https://alwan.elwatannews.com/news/details/7451400/note-mood) 🎓.  
It aims to foster emotional awareness and mental well-being by analyzing users’ daily journals using advanced machine learning techniques.

Users can write personal journals, and our system processes these entries to:
- Analyze the overall mood (positive, negative, neutral).
- Extract **aspects** (e.g., "Work", "Family", "Health") and identify the sentiment toward each.
- Identify the most **frequent topics** in their life.
- Visualize emotional trends over time in a meaningful way.

---
## 📽 Demo Video

> 🎥 You can watch a short video demo of the app [here](https://drive.google.com/file/d/1SXTkjoKjMaT983itYRbXSfV9zdYCLmbF/view?usp=drive_link)

---
## 📸 Screenshot From Deployed Demo 

| Login    | New Journal    | Journals       |
|----------|----------------|----------------|
| ![Dashboard](screenshots/login.png) | ![Topics](screenshots/AddNewJournal.png) | ![Emotions](./screenshots/Journals.png) | 

---

| Help     | category       | Charts         |
|----------|----------------|----------------|
| ![Dashboard](screenshots/help.png) | ![Topics](screenshots/category.png) | ![Emotions](./screenshots/charts.png) | 

---

## 🧠 How It Works

1. **Sentiment Analysis Model** analyzes the mood of each journal entry.
2. **Attention-based Aspect Extraction Model** detects specific entities and topics discussed.
3. Each aspect is then analyzed for individual sentiment.
4. Comprehensive **charts** and **reports** are generated to help users understand emotional triggers.

---

## 🌟 Key Features

- ✍️ Write and store daily journals.
- 🔍 Search through journal entries.
- 📈 View emotional trends with visual charts.
- 📊 Aspect-based sentiment analysis.
- 📚 Topic extraction from journals.
- 🧾 Daily and overall emotion summaries.

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: ASP.NET Core + Entity Framework
- **Database**: SQL Server (Azure-hosted)
- **Machine Learning**: Sentiment & Aspect Analysis Models
- **Deployment**: Azure + GitHub Actions
- **Other tools**: Hangfire, Lucene Search, JWT Authentication

---

## 📄 Documentation

All documentation including system architecture, dataset details, and ML model explanation is available here:  
[📁 Documentation Drive Folder](https://drive.google.com/drive/folders/1rtO5elqI6k6FjgXNKQtXfAkA437AlHFW)

---

## 📌 Deployment

Fron End deployed on vercel ,The backend hosting was deployed on a free tier which has now expired. However, you can view detailed screenshots and the full design experience above.





