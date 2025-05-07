# InterviewAI - Technical Interview Simulator

![InterviewAI Logo](https://via.placeholder.com/150)

## 📋 Description

InterviewAI is a SaaS platform developed with Next.js that simulates technical interviews for technology professionals. Our application allows users to practice customized interviews based on their experience, preferred programming language, and the position they're applying for.

### ✨ Key Features

- **AI-powered Interviewer**: Simulates real interviews adapting to your responses
- **Complete Customization**: Select your experience level, programming language, and position type
- **Practical Exercises**: Solve coding problems in real-time
- **Resume Analysis**: Upload your CV to get personalized questions
- **Different Difficulty Levels**: From junior to senior level
- **Detailed Feedback**: Receive comments on your answers and areas for improvement

## 🚀 Prerequisites

To run this project you'll need:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (our preferred package manager)
- [Docker](https://www.docker.com/) (for the database)
- "Backend-interAI" backend project running

## 💻 Installing Bun

### macOS and Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

### Windows

For Windows, you'll need WSL (Windows Subsystem for Linux):

1. Install WSL following the [official instructions](https://docs.microsoft.com/en-us/windows/wsl/install)

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```
then restart your terminal or open a new one or restart your computer.

2. Inside your Linux distribution in WSL, run:

```bash
curl -fsSL https://bun.sh/install | bash
```

## 🛠️ Project Setup

1. Clone this repository:

```bash
git clone https://github.com/DereckAn/Frontend-interAI
cd practice-inter
```

2. Install dependencies:

```bash
bun install
```

3. Configure the `.env` file in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

4. Start the database with Docker:

```bash
docker-compose up -d
```

5. Start the "Backend-interAI" backend project (follow instructions in its repository)

6. Start the development server:

```bash
bun dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📊 Project Structure

```
Frontend-interAI/
├── src/
│   ├── app/              # Next.js routes and pages
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities and constants
│   ├── types/            # TypeScript type definitions
│   └── data/             # Static data and mocks
├── public/               # Static files
├── .env                  # Environment variables (not included in the repository)
└── ...                   # Other configuration files
```

## 🧪 Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Bun](https://bun.sh/) - Package manager and runtime environment

## 🤝 Contribution

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add an amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ by [Dereck Angeles](https://github.com/DereckAn)