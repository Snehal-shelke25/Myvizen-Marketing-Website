# Myvizen-Marketing-Website (FitZen Herbal Wellness Platform)

A complete, professional, production-grade marketing website for **FitZen** — the premier herbal wellness coaching platform that connects wellness coaches with their clients for body composition analysis, smart reports, personalized diet plans, and daily habit tracking.

---

## 🚀 Technologies Used

- **React 18** (Functional Components, Hooks)
- **React Router 6** (`react-router-dom` multi-page routing)
- **Vite 5** (Fast lightning-speed development build tool)
- **Vanilla CSS** (Custom responsive design system with CSS custom properties, keyframe micro-animations, glassmorphism, and responsive layouts)
- **Google Fonts** (`Poppins` for headings, `Inter` for body copy)
- **SEO & Accessibility** (Meta descriptions, Open Graph cards, Twitter cards, semantic HTML, sitemap.xml, robots.txt, prefers-reduced-motion)

---

## 📁 Project Structure

```
Myvizen-Marketing-Website/
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── navbar.css
│   │       ├── hero.css
│   │       ├── components.css
│   │       └── pages.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── StatsBar.jsx
│   │   ├── MarqueeTicker.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── ScreenshotCarousel.jsx
│   │   ├── Benefits.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   ├── DownloadCTA.jsx
│   │   ├── Footer.jsx
│   │   └── MobileStickyCTA.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── FeaturesPage.jsx
│   │   ├── CoachesPage.jsx
│   │   ├── MembersPage.jsx
│   │   ├── WellnessCenterPage.jsx
│   │   ├── DownloadPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   ├── TermsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Getting Started & Installation

### Prerequisites

Ensure you have **Node.js** (v16.0 or higher) and **npm** installed on your system.

### Step 1: Extract & Open Project
Extract the zip file or navigate into the project directory:
```bash
cd Myvizen-Marketing-Website
```

### Step 2: Install Dependencies
Run the following command to install React, React Router, Vite, and build tool dependencies:
```bash
npm install
```

### Step 3: Launch Local Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the live site.

### Step 4: Build for Production
To create an optimized production build in the `dist/` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 How to Deploy to Vercel

1. **Push code to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of FitZen marketing website"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
   - Import your GitHub repository `Myvizen-Marketing-Website`.
   - Set **Framework Preset** to `Vite`.
   - Set **Build Command** to `npm run build`.
   - Set **Output Directory** to `dist`.
   - Click **"Deploy"**.

3. **Vercel Rewrites for Single Page App (SPA)**:
   If deploying SPA routing on Vercel, create a `vercel.json` file in the project root:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

---

## ✨ Features Included

1. **Exact Visual Matching & Content Compliance**: Full brand color palette (`#166534`, `#15803d`, `#22c55e`, `#f0fdf4`, `#e6c27a`, `#0f172a`), exact text, typography (`Poppins` + `Inter`), and layout hierarchy.
2. **One App, Two Experiences**: Tabbed and side-by-side showcases for Wellness Coaches & Members with step-by-step onboarding checklists.
3. **Wellness Center Digitization Hub**: Dedicated `/wellness-center` page showcasing walk-in visitor management simulators, digital registries, and center growth metrics.
4. **Interactive Screenshot Carousel & Live BMI Simulator**: Interactive mobile frames with slide controls and live height/weight sliders that recalculate BMI, estimated fat %, and status badges dynamically in real-time.
5. **Interactive FAQ Accordion**: Single active open state with smooth chevron rotation animations.
6. **QR Code Download Screen**: Pixel-perfect reproduction of the download page with QR code scanner and system requirements (Android 9.0+ & iOS 14.0+).
7. **Contact Form Validation**: Full client-side input validation with success toast notifications.
8. **100% Fully Responsive Layout**: Tested across desktop (1920px, 1440px), laptop (1024px), tablet (768px), and mobile (480px, 390px, 375px, 320px) with zero horizontal scroll overflow.
