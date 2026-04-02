# Creative Developer Portfolio

A high-performance, aesthetically pleasing portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Designed to showcase projects and skills with a premium "dark mode" interface, glassmorphism effects, and smooth animations.

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?style=flat-square&logo=framer)

---

## Features

| Feature | Description |
|---------|-------------|
| **Modern Tech Stack** | Built on Next.js 15 (App Router) and React 19 with full TypeScript support |
| **TypeScript** | Fully typed codebase for reliability and maintainability |
| **Responsive Design** | Mobile-first approach ensuring a great experience on all devices |
| **Performance Optimized** | Uses `next/font`, `next/image`, and efficient code splitting |
| **Premium UI Effects** | Glassmorphism cards, magnetic gradients, smooth scroll animations |
| **Custom Scrollbar** | Styled scrollbar and typography |

---

## Project Screenshots

### Main Sections

| Section | Preview |
|---------|---------|
| **Hero & Landing** | ![Hero](./portfolio/public/assets/projects.png) |
| **Projects Gallery** | ![Projects](./portfolio/public/assets/projects.png) |
| **Skills Section** | ![Skills](./portfolio/public/assets/skills.png) |
| **About Me** | ![About](./portfolio/public/assets/about.png) |
| **Qualifications** | ![Qualifications](./portfolio/public/assets/qualifications.png) |
| **Contact** | ![Contact](./portfolio/public/assets/contact.png) |
| **Footer** | ![Footer](./portfolio/public/assets/footer.png) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogeshthapa-7/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
portfolio/
├── app/
│   ├── components/    # Reusable UI components (Hero, Projects, Skills, etc.)
│   ├── api/           # API routes (contact form handler)
│   ├── layout.tsx     # Root layout with fonts and metadata
│   ├── page.tsx       # Main landing page
│   └── globals.css    # Global styles and Tailwind configuration
├── public/            # Static assets
│   └── assets/        # Images and screenshots
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Customization

### Colors & Styling

Modify in `app/globals.css` and Tailwind classes. The theme uses a dark color palette with cyan and purple accents.

### Fonts

Uses **Geist** font family via `next/font`. Configure in `app/layout.tsx`.

### Projects

Update the `projects` array in `app/components/projects.tsx` with your actual work details.

### Contact Form

The contact form currently logs to console. To enable real functionality:

1. Sign up for [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/)
2. Update the `handleSubmit` function in `app/components/contact.tsx`
3. Add your API credentials to environment variables

---

## Note on Data

> **Disclaimer**: To customize this portfolio, update the projects array with your actual work details and screenshots.

---

[![GitHub Stars](https://img.shields.io/github/stars/yogeshthapa-7/portfolio?style=social)](https://github.com/yogeshthapa-7/portfolio)
[![GitHub Forks](https://img.shields.io/github/forks/yogeshthapa-7/portfolio?style=social)](https://github.com/yogeshthapa-7/portfolio)
[![Follow](https://img.shields.io/github/followers/yogeshthapa-7?style=social)](https://github.com/yogeshthapa-7)