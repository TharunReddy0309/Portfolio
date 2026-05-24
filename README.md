#  Portfolio
Welcome to the repository of my personal developer portfolio! This website features an immersive, modern, and interactive 3D user interface showcasing my skills, experience, and project work.

**Live Demo:** [tharun-portfolio-web.vercel.app](https://tharun-portfolio-web.vercel.app/)
---
## 🚀 Key Features
* **Dynamic 3D Neural Scene:** A floating 3D particle entity surrounded by a 3,500-particle data swarm built with **Three.js** and **React Three Fiber** that reacts fluidly as you scroll.
* **Interactive 3D Hologram Cards:** Standard cards are transformed with custom 3D mouse-tilt physics and depth shifting, creating a premium glassmorphic hologram effect with shifting light reflection glares.
* **Work & Projects Showcase:** Automatically categories projects (Full Stack, AI/ML, etc.) with detailed description tags, GitHub link-outs, and work status markers.
* **Timeline Experience:** Interactive TA (Teaching Assistant) experience cards displaying academic and mentoring roles.
* **Fully Responsive:** Beautifully optimized across all device sizes (desktops, tablets, and phones) with custom-tailored dark modes.
* **Offline Resilience:** Resilient API design that automatically catches network errors and falls back to pre-populated static data to ensure 100% uptime and instant loading when deployed to serverless static hosting.
---
## 🛠️ Tech Stack
### Frontend (Web Application)
* **Core:** React 18, TypeScript, HTML5, Vanilla CSS
* **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animations & Physics:** `react-parallax-tilt` for 3D interactions
* **Build System:** Vite
### Backend API (Optional Workspace)
* **Core:** NestJS
* **Language:** TypeScript
* **Database integrations:** Supported out-of-the-box via environment variables
---
## 💻 Getting Started
This repository uses a monorepo structure. You can run the frontend independently:
### 1. Install Dependencies
Run the installation command in the project root:
```bash
npm install
```
### 2. Run the Development Server
To launch only the web frontend:
```bash
npm run dev:web
```
This will start the Vite dev server locally (usually on [http://localhost:5173](http://localhost:5173)).
---
## 📦 Deployment on Vercel
If you deploy this project yourself, configure the Vercel project with the following settings:
1. **Framework Preset:** Vite
2. **Root Directory:** `apps/web`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
