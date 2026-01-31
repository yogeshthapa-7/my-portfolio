# Creative Developer Portfolio

A high-performance, aesthetically pleasing portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Designed to showcase projects and skills with a premium "dark mode" interface, glassmorphism effects, and smooth animations.

## 🚀 Features

- **Modern Tech Stack**: Built on Next.js 15 (App Router) and React 19.
- **TypeScript**: Fully typed codebase for reliability and maintainability.
- **Responsive Design**: Mobile-first approach ensuring a great experience on all devices.
- **Performance Optimized**: Uses `next/font`, `next/image`, and efficient code splitting.
- **Premium UI**: 
  - Glassmorphism card effects
  - Interactive magnetic gradients (Hero section)
  - Smooth scroll animations
  - Custom custom scrollbar and typography

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yogeshthapa-7/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── components/    # Reusable UI components (Hero, Projects, etc.)
│   ├── globals.css    # Global styles and Tailwind configuration
│   ├── layout.tsx     # Root layout with fonts and metadata
│   └── page.tsx       # Main landing page
├── public/            # Static assets
└── ...config files
```

## 📝 Note on Data

> **Disclaimer**: The projects listed in the "Featured Work" section are currently **mock data** used for demonstration purposes. 
> To customize this portfolio:
> 1. Open `app/components/projects.tsx`
> 2. Update the `projects` array with your actual work details.
> 3. Add your own screenshots/images.

## 🎨 Customization

- **Colors**: Modified in `app/globals.css` and Tailwind classes.
- **Fonts**: Uses `Geist` font family via `next/font`.
- **Contact Form**: The contact form in `app/components/contact.tsx` logs to console. Integrate with a service like EmailJS or Formspree for real functionality.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
