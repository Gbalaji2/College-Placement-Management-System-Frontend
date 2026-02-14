🎓 College Placement Management System (Frontend)

A web-based College Placement Management System built using the MERN Stack. This frontend provides an interactive UI for Students, TPO, Management, Admin, and Companies to manage placement activities such as job postings, applications, student profiles, internships, and status updates.

🚀 Live Demo

Frontend (Netlify): https://collegeplacementfrontend.netlify.app

Backend API (Render): https://college-placement-management-system-ubfr.onrender.com

🛠 Tech Stack

React JS

Vite

Tailwind CSS

Axios

React Router DOM

JWT Authentication

Netlify (Deployment)

✨ Features
👨‍🎓 Student

Signup & Login

Update profile

Upload resume

Apply for jobs

Track job application status (Applied / Interview / Hired / Rejected)

View internships

🏢 Company

Login

Post jobs

View applicants

Update student application status

🧑‍💼 TPO / Management

Manage placement process

View student records

Monitor job applications

👑 Admin

Approve student profiles

View year & branch wise student data

Notify students (Interview / Hired updates)

🔑 Demo Login Credentials (All Roles)

Use the following demo accounts to test the application:

Role	Email	Password
Admin	admin@gmail.com
	Admin@123
Student	student@gmail.com
	Student@123
TPO	tpo@gmail.com
	Tpo@123
Management	management@gmail.com
	Management@123
Company	company@gmail.com
	Company@123

⚠️ These are dummy credentials for testing only.

📦 Installation & Setup (Frontend)
1️⃣ Clone the repository
git clone https://github.com/Gbalaji2/College-Placement-Management-System-Frontend.git

2️⃣ Go into the project folder
cd College-Placement-Management-System-Frontend

3️⃣ Install dependencies
npm install

4️⃣ Run the project
npm run dev


The app will run on:

http://localhost:5173

🔧 Environment Variables

Create a .env file in the project root and add:

VITE_API_BASE_URL=https://college-placement-management-system-ubfr.onrender.com


Example API usage:

const API = import.meta.env.VITE_API_BASE_URL;
axios.post(`${API}/api/v1/student/signup`, data);

📂 Project Folder Structure
src/
 ├── components/
 ├── pages/
 ├── routes/
 ├── services/
 ├── assets/
 ├── App.jsx
 └── main.jsx

🧾 Important Notes
✅ Do NOT push node_modules

Make sure your .gitignore includes:

node_modules/
dist/
.env

📌 Future Enhancements

Better UI/UX design improvements

Dashboard analytics (charts for placements)

Forgot password / Reset password

Notification system with email alerts

👨‍💻 Author

Balaji (Gowthambalaji)
GitHub: https://github.com/Gbalaji2

⭐ Support

If you like this project, give it a ⭐ on GitHub!
