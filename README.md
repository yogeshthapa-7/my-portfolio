<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Developer Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
            color: #e0e0e0;
            line-height: 1.6;
            min-height: 100vh;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        header {
            text-align: center;
            margin-bottom: 50px;
        }

        h1 {
            font-size: 3em;
            background: linear-gradient(135deg, #00d4ff, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
        }

        .subtitle {
            font-size: 1.2em;
            color: #888;
        }

        .section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        h2 {
            font-size: 1.8em;
            color: #00d4ff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        h3 {
            color: #e0e0e0;
            margin-bottom: 10px;
        }

        p {
            color: #b0b0b0;
            margin-bottom: 15px;
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        li {
            padding: 8px 0;
            color: #b0b0b0;
        }

        li::before {
            content: "→";
            color: #7c3aed;
            margin-right: 10px;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .feature-card {
            background: rgba(124, 58, 237, 0.1);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(124, 58, 237, 0.3);
        }

        .feature-card h3 {
            color: #00d4ff;
            margin-bottom: 8px;
        }

        .feature-card p {
            font-size: 0.9em;
            margin-bottom: 0;
        }

        code {
            background: rgba(0, 212, 255, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            color: #00d4ff;
            font-family: 'Courier New', monospace;
        }

        pre {
            background: #0d0d1a;
            border-radius: 8px;
            padding: 15px;
            overflow-x: auto;
            margin: 15px 0;
        }

        pre code {
            background: none;
            padding: 0;
            display: block;
            line-height: 1.8;
        }

        .code-block {
            margin-bottom: 15px;
        }

        .code-block h4 {
            color: #7c3aed;
            margin-bottom: 8px;
            font-size: 1em;
        }

        .screenshot {
            width: 100%;
            border-radius: 12px;
            margin: 15px 0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .screenshots-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 20px;
        }

        .screenshot-item {
            text-align: center;
        }

        .screenshot-item img {
            width: 100%;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease;
        }

        .screenshot-item img:hover {
            transform: scale(1.02);
        }

        .screenshot-item p {
            margin-top: 10px;
            font-size: 0.9em;
            color: #888;
        }

        .highlight {
            color: #00d4ff;
            font-weight: 600;
        }

        .note {
            background: rgba(255, 170, 0, 0.1);
            border-left: 4px solid #ffaa00;
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin: 20px 0;
        }

        .note p {
            margin-bottom: 0;
            color: #ffaa00;
        }

        .tech-badge {
            display: inline-block;
            background: rgba(0, 212, 255, 0.15);
            color: #00d4ff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            margin: 3px;
        }

        .steps {
            counter-reset: step;
        }

        .step {
            position: relative;
            padding-left: 50px;
            margin-bottom: 25px;
        }

        .step::before {
            counter-increment: step;
            content: counter(step);
            position: absolute;
            left: 0;
            top: 0;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #00d4ff, #7c3aed);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #fff;
        }

        .step-content h4 {
            color: #e0e0e0;
            margin-bottom: 5px;
        }

        .step-content p {
            margin-bottom: 0;
            font-size: 0.95em;
        }

        .tree {
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            line-height: 1.8;
            color: #888;
        }

        .tree .folder {
            color: #00d4ff;
        }

        .tree .file {
            color: #7c3aed;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #00d4ff, #7c3aed);
            color: #fff;
            padding: 12px 30px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 15px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        }

        @media (max-width: 768px) {
            h1 {
                font-size: 2em;
            }

            .screenshots-grid {
                grid-template-columns: 1fr;
            }

            .feature-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Creative Developer Portfolio</h1>
            <p class="subtitle">A high-performance, aesthetically pleasing portfolio website built with modern web technologies</p>
        </header>

        <div class="section">
            <h2>Tech Stack</h2>
            <div>
                <span class="tech-badge">Next.js 15</span>
                <span class="tech-badge">TypeScript</span>
                <span class="tech-badge">Tailwind CSS</span>
                <span class="tech-badge">React 19</span>
                <span class="tech-badge">Framer Motion</span>
            </div>
            <p style="margin-top: 20px;">
                Built on <span class="highlight">Next.js 15</span> with App Router, featuring full TypeScript support for reliability and maintainability. Styled with <span class="highlight">Tailwind CSS</span> for responsive, utility-first design.
            </p>
        </div>

        <div class="section">
            <h2>Features</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <h3>Modern Tech Stack</h3>
                    <p>Built on Next.js 15 (App Router) and React 19 with full TypeScript support.</p>
                </div>
                <div class="feature-card">
                    <h3>Responsive Design</h3>
                    <p>Mobile-first approach ensuring a great experience on all devices.</p>
                </div>
                <div class="feature-card">
                    <h3>Performance Optimized</h3>
                    <p>Uses next/font, next/image, and efficient code splitting for optimal loading.</p>
                </div>
                <div class="feature-card">
                    <h3>Premium UI Effects</h3>
                    <p>Glassmorphism cards, magnetic gradients, smooth scroll animations.</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Project Screenshots</h2>
            <div class="screenshots-grid">
                <div class="screenshot-item">
                    <img src="portfolio/public/assets/projects.png" alt="Projects Section">
                    <p>Featured Projects</p>
                </div>
                <div class="screenshot-item">
                    <img src="portfolio/public/assets/skills.png" alt="Skills Section">
                    <p>Skills & Expertise</p>
                </div>
                <div class="screenshot-item">
                    <img src="portfolio/public/assets/about.png" alt="About Section">
                    <p>About Me</p>
                </div>
                <div class="screenshot-item">
                    <img src="portfolio/public/assets/qualifications.png" alt="Qualifications Section">
                    <p>Experience & Education</p>
                </div>
                <div class="screenshot-item">
                    <img src="portfolio/public/assets/contact.png" alt="Contact Section">
                    <p>Get In Touch</p>
                </div>
                <div class="screenshot-item">
                    <img src="portfolio/public/assets/footer.png" alt="Footer">
                    <p>Footer Section</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Getting Started</h2>
            <div class="steps">
                <div class="step">
                    <div class="step-content">
                        <h4>Clone the repository</h4>
                        <p>Copy the repository to your local machine using Git.</p>
                    </div>
                </div>
                <pre><code>git clone https://github.com/yogeshthapa-7/portfolio.git
cd portfolio</code></pre>

                <div class="step">
                    <div class="step-content">
                        <h4>Install dependencies</h4>
                        <p>Install all required npm packages.</p>
                    </div>
                </div>
                <pre><code>npm install</code></pre>

                <div class="step">
                    <div class="step-content">
                        <h4>Run the development server</h4>
                        <p>Start the local development server.</p>
                    </div>
                </div>
                <pre><code>npm run dev</code></pre>

                <div class="step">
                    <div class="step-content">
                        <h4>Open in browser</h4>
                        <p>View your portfolio at the local URL.</p>
                    </div>
                </div>
                <pre><code>http://localhost:3000</code></pre>
            </div>
        </div>

        <div class="section">
            <h2>Project Structure</h2>
            <pre class="tree"><span class="folder">portfolio/</span>
├── <span class="folder">app/</span>
│   ├── <span class="folder">components/</span>   <span class="file"># Reusable UI components</span>
│   ├── <span class="folder">api/</span>         <span class="file"># API routes</span>
│   ├── <span class="file">layout.tsx</span>    <span class="file"># Root layout with fonts</span>
│   ├── <span class="file">page.tsx</span>      <span class="file"># Main landing page</span>
│   └── <span class="file">globals.css</span>   <span class="file"># Global styles</span>
├── <span class="folder">public/</span>         <span class="file"># Static assets</span>
└── <span class="file">package.json</span></pre>
        </div>

        <div class="section">
            <h2>Customization</h2>
            <ul>
                <li><strong>Colors & Styling:</strong> Modify in <code>app/globals.css</code> and Tailwind classes.</li>
                <li><strong>Fonts:</strong> Uses Geist font family via next/font.</li>
                <li><strong>Projects:</strong> Update the <code>projects</code> array in <code>app/components/projects.tsx</code>.</li>
                <li><strong>Contact Form:</strong> Integrate with EmailJS or Formspree for real functionality.</li>
            </ul>
        </div>

        <div class="note">
            <p><strong>Note:</strong> The projects section uses mock data for demonstration. Update with your actual work details and screenshots.</p>
        </div>

        <div style="text-align: center; margin-top: 40px;">
            <a href="https://github.com/yogeshthapa-7/portfolio" class="cta-button">View on GitHub</a>
        </div>
    </div>
</body>
</html>