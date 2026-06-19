# Smart Placement and Internship Management System

A full-stack web application that streamlines the campus placement and internship process for students, the placement/TPO cell, and recruiting companies — replacing manual, spreadsheet-driven workflows with a single centralized platform.

**Live demo:** https://smart-placement-and-internship-mana.vercel.app

> Repo: `frontend/` (client) + `backend/` (server), built primarily in JavaScript.

---

## ✨ Features

- **Student portal** — register, build/maintain a profile and resume, browse open placement & internship drives, apply, and track application status in real time.
- **Admin / TPO dashboard** — post and manage drives, review applicant lists, shortlist/update candidate status, and view placement statistics.
- **Company/drive management** — create and manage job/internship postings with eligibility criteria (CGPA, branch, backlog rules, etc.).
- **Authentication & role-based access** — separate flows/permissions for students and administrators.
- **Status tracking & notifications** — students get visibility into where they stand (applied / shortlisted / interview / selected / rejected).
- **Responsive UI** — usable across desktop and mobile browsers.

> Some features above reflect the project's intended scope — check the `frontend/` and `backend/` source for the exact set currently implemented, since this README was written without full access to the codebase.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (JavaScript), CSS / HTML |
| Backend | Node.js + Express |
| Database | MongoDB *(adjust if a different DB is used)* |
| Auth | JWT-based authentication *(adjust if different)* |
| Deployment | Frontend on Vercel |

*(Confirm/update the exact versions and packages from `package.json` in the `frontend/` and `backend/` folders.)*

---

## 📁 Project Structure

```
Smart-Placement-and-Internship-Management-System/
├── backend/          # Express API server, routes, controllers, models
├── frontend/         # React client application
├── package.json      # Root-level scripts/config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/Madhan1822/Smart-Placement-and-Internship-Management-System.git
cd Smart-Placement-and-Internship-Management-System
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with variables such as:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm start
```

The app should now be running locally (typically `http://localhost:3000` for the frontend, talking to the backend on `http://localhost:5000`).

> Adjust ports, scripts, and required environment variables to match what's actually defined in each folder's `package.json`.

---

## 🔧 Available Scripts

Run these from inside `frontend/` or `backend/` as applicable:

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm start` | Run the app in development mode |
| `npm run build` | Create a production build (frontend) |

---

## 🌐 Deployment

The frontend is deployed via **Vercel**: https://smart-placement-and-internship-mana.vercel.app
The backend can be deployed to services like Render, Railway, or Heroku, with the frontend's API base URL updated to point to it.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

No license has been specified for this repository yet. Consider adding one (e.g., MIT) so others know how they may use this project.

---

## 👤 Author

**Madhan1822**
GitHub: [@Madhan1822](https://github.com/Madhan1822)
