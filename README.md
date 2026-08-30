# 💼 Smart Bank – FinSphere

> A modern, secure, and intelligent smart banking platform built with Next.js, TypeScript, Prisma, and PostgreSQL — powered by CI/CD pipelines, production-grade deployment, and MNC-level DevOps best practices.



---
Live Demo - https://finsphere-gamma.vercel.app/

---
See how it look like ->


<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/f8cfd79f-d4d8-444d-be4e-cebedfe00216" />


<img width="1920" height="1080" alt="Screenshot (13)" src="https://github.com/user-attachments/assets/6b371f0f-93e7-4a8c-a87d-01f66d8e49fd" />

<img width="1920" height="1080" alt="Screenshot (20)" src="https://github.com/user-attachments/assets/528b7fe1-ae3b-41b6-8a89-5c29513b93b3" />


<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/1061267d-9dab-4535-b4a4-a1eb4138d0ee" />


<img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/bd4afa47-a5e4-4aeb-a41b-89403858e120" />



<img width="1920" height="1080" alt="Screenshot (17)" src="https://github.com/user-attachments/assets/94a973fe-11d9-4c30-8c85-42980d1bad3c" />

<img width="1920" height="1080" alt="Screenshot (18)" src="https://github.com/user-attachments/assets/a7582929-407d-4227-8734-fea05e552175" />


<img width="1920" height="1080" alt="Screenshot (19)" src="https://github.com/user-attachments/assets/69d69a3c-2b60-4882-8c7a-77260a3b7dbc" />


## 🚀 Features

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript-first** codebase
- ✅ **PostgreSQL** database with Prisma ORM
- ✅ **User Authentication** (login/signup)
- ✅ **Global State Management** (Context API or Zustand)
- ✅ **Dynamic Dashboards** with reusable UI
- ✅ **Modern UI** – Responsive, minimal, and professional
- ✅ **CI/CD Pipeline** via **GitHub Actions**
- ✅ **Railway** / **Vercel** Deployment (Prod)
- ✅ **Semantic Version Tagging** via Git
- ✅ **Secrets Management** via GitHub Encrypted Secrets
- ✅ **MNC-level Folder Structure & Dev Standards**

---

## 📁 Project Structure

smart-bank/   (src folder based structure)
├── src/app/ # Next.js App Directory (pages, routes, layouts)
├── sec/components/ # Reusable UI components
├── src/lib/ # Helpers, utils, constants
├── prisma/ # Prisma schema & migrations
├── public/ # Static assets
├── styles/ # Global styles (TailwindCSS)
├── .github/workflows/ # GitHub Actions CI/CD
├── .env.local # Local environment variables
├── README.md # Project documentation
└── ...


---

## ⚙️ Tech Stack

| Layer         | Tech                          |
|---------------|-------------------------------|
| Front + Back  | Next.js 14 with App Router , TypeScript, Tailwind |
| Database      | PostgreSQL (via Prisma ORM)   |
| Auth          | Credentials or JWT (NextAuth / Custom) |
| DevOps        | GitHub Actions (CI/CD)        |
| Deployment    | Vercel or Railway (Production)|
| Versioning    | Git Tags (`v1.0.0`, `v1.1.0`) |
| Package Mgmt  | npm                           |

---

## 🔐 Environment Variables

Create a `.env.local` file based on `.env.example` and configure the following:

```env
DATABASE_URL=your_postgres_db_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000

```

-> For CI/CD deployments, store secrets in GitHub:

-> RAILWAY_DATABASE_URL / DATABASE_URL

-> VERCEL_TOKEN, VERCEL_PROJECT_ID (if using Vercel)


Development Setup
```
# 1. Clone the repo
git clone https://github.com/your-username/smart-bank.git && cd smart-bank

# 2. Install dependencies
npm install

# 3. Push schema to database
npx prisma db push

# 4. Run the dev server
npm run dev
```

🛠️ CI/CD Pipeline
GitHub Actions runs CI on every push to main, builds the project, pushes the schema, and deploys to Vercel or Railway.

.github/workflows/deploy.yml
```
- npx prisma db push
- npm i -g vercel@latest
- vercel deploy --prod --yes --token=$VERCEL_TOKEN --project-id=$VERCEL_PROJECT_ID
```
✅ Encrypted Secrets: Managed via GitHub Secrets

✅ Prisma push integrated into workflow

✅ Git tags supported (v1.0.0 style)


🔖 Versioning (Manual Tags)
Release new versions by tagging your commits:
```
git tag v1.0.0
git push origin v1.0.0
```

📦 Build & Deploy (Production)
Vercel: Auto-deploys on push to main

Railway: Alternative option with PostgreSQL hosting


🧠 Future Enhancements
---
🤖 AI-Powered Finance Assistant

📈 Real-time Transaction Analytics

🔔 Discord/Telegram Release Notifications

📓 Auto-generated Changelog via Semantic Release

🔐 Role-based Access Controls (RBAC)
---


🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.


📄 License
MIT © 2025 [Ayush Upadhyay]

🙌 Acknowledgements
Built with ❤️ by a passionate developer aiming for top 1% SDE excellence.

---























