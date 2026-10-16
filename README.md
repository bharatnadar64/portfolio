# Bharat Nadar — Professional Developer Portfolio

> **Production-ready, recruiter-focused personal developer portfolio website for Bharat Nadar**, built with pure semantic HTML5, modern vanilla CSS3, and ES6+ JavaScript. Designed for zero-dependency static hosting on **GitHub Pages**.

---

## 🌟 Overview & Highlights

- **Aesthetic Direction:** Premium dark-first engineering identity with deep charcoal tones (`#0A0D14`), polished surfaces (`#121927`), electric violet (`#8B7CFF`), and cyan (`#57D5F2`) accents.
- **Recruiter Optimized:** High-priority visual hierarchy highlighting real projects, technical instruction experience (80+ students), national hackathon placement (IndiaNext Top 40 / 229), and academic excellence (9.55 B.Sc. IT CGPA).
- **Zero Build Step:** 100% static architecture without npm, bundlers, Node.js runtime, frameworks, or server-side dependencies.
- **GitHub Pages Subpath Ready:** All asset references use strictly relative paths (`./assets/...`) ensuring perfect rendering at `https://bharatnadar64.github.io/portfolio/`.
- **Accessibility & Performance:** WCAG AA contrast standards, keyboard focus management, semantic HTML structure, and `prefers-reduced-motion` support.

---

## 📁 Project Structure

```
portfolio/
├── index.html                           # Main entry point with all 11 required sections
├── README.md                            # Complete setup & deployment guide
├── style.css                            # Root style forwarder (imports assets/css/style.css)
├── script.js                           # Root script forwarder (imports assets/js/main.js)
└── assets/
    ├── css/
    │   └── style.css                    # Complete design system & responsive styling
    ├── js/
    │   └── main.js                      # Vanilla JavaScript interactions & scroll spy
    ├── icons/
    │   └── favicon.svg                  # Brand favicon with BN monogram & code accents
    ├── images/
    │   ├── profile-placeholder.svg      # Original BN monogram & developer emblem
    │   ├── mindcompile-preview.svg      # Designed preview for MindCompile platform
    │   ├── datastraw-preview.svg        # Designed preview for Datastraw Support CRM
    │   ├── zyra-preview.svg             # Designed preview for Zyra E-commerce
    │   └── resumer-preview.svg          # Designed preview for Resumer Spring AI app
    └── documents/
        ├── README.md                    # Instructions for placing official resume PDF
        └── Bharat_Nadar_Resume.pdf      # [USER ACTION NEEDED] Place your real resume here
```

---

## 🚀 Running Locally

Because the portfolio is built exclusively with standard web technologies, you can run it immediately without any installation:

### Option 1: Direct File Open (Easiest)
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python's Built-in Server
If you prefer running a local HTTP server:
```bash
# In the portfolio directory:
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 📄 Action Item: Adding Your Official Resume PDF

The download button across the header, hero section, and footer is already pre-configured to download:
```
./assets/documents/Bharat_Nadar_Resume.pdf
```

1. Export your latest resume as a PDF.
2. Rename the file to:
   ```
   Bharat_Nadar_Resume.pdf
   ```
3. Copy or move it into the `assets/documents/` folder.
4. Refresh your browser — the download button will now serve your actual PDF immediately.

---

## 📸 Replacing Project Previews with Real Screenshots

The portfolio currently uses high-fidelity, custom-crafted vector SVGs (`mindcompile-preview.svg`, `datastraw-preview.svg`, etc.) clearly labeled as **"Designed Preview"**.

When you want to showcase real application screenshots:
1. Capture screenshots of your running applications in 16:10 or 16:9 aspect ratio (e.g. 1200×750px).
2. Save them into `assets/images/` (e.g., `mindcompile-screenshot.png`, `datastraw-screenshot.png`).
3. In `index.html`, locate the project card's `<img>` tag and update the `src` attribute:
   ```html
   <!-- Example: -->
   <img src="./assets/images/mindcompile-screenshot.png" alt="MindCompile live competition screen" class="project-preview-img" loading="lazy">
   ```
4. You can also update the preview badge from `<span class="project-preview-badge">Designed Preview</span>` to `Live Application`.

---

## 🌐 Deploying to GitHub Pages (Step-by-Step)

Deploying takes under 3 minutes:

### Step 1: Create a GitHub Repository
1. Log into your GitHub account: [https://github.com/bharatnadar64](https://github.com/bharatnadar64).
2. Click **New Repository** (+ icon at the top right).
3. Name your repository (e.g., `portfolio` or `bharatnadar64.github.io`).
4. Set visibility to **Public**.
5. Leave "Initialize with a README" unchecked, then click **Create repository**.

### Step 2: Push Your Portfolio Files
Open your terminal in `c:\Users\Bharat\Downloads\portfolio` and run:
```bash
git init
git add .
git commit -m "feat: initial release of premium developer portfolio"
git branch -M main
git remote add origin https://github.com/bharatnadar64/portfolio.git
git push -u origin main
```
*(Replace `portfolio.git` with your exact repository name if different).*

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** Select `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes. GitHub will display a notification:
   > *Your site is live at https://bharatnadar64.github.io/portfolio/*

---

## ⚠️ Credential Verification Note

> [!NOTE]  
> **Microsoft Certification Title:**  
> On your resume, this credential is listed as:  
> **"Microsoft Certified: Azure AI Fundamentals (AZ-900)"**  
> In Microsoft's official catalog:  
> - **AZ-900** is *Microsoft Certified: Azure Fundamentals*  
> - **AI-900** is *Microsoft Certified: Azure AI Fundamentals*  
>   
> Please check your Microsoft Learn transcript before sharing with recruiters to ensure the exact exam code matches your certificate. You can edit the text directly in `index.html` under the `#education` section.

---

## 🛠️ Modifying Content & Projects

All project URLs, technical tags, and copy can be updated easily inside `index.html`:

- **Primary Contact Info:** Search for `bharatnadar64@gmail.com` or `+91 9969607140` in `index.html` to update your email or phone number.
- **Adding a Project:** Duplicate one of the `<article class="project-card">` or `<article class="secondary-card">` blocks and fill in your details.
- **Styling Customizations:** Open `assets/css/style.css` and adjust the CSS variables in the `:root` block (e.g., `--accent-primary`, `--bg-primary`).

---

&copy; 2026 Bharat Nadar. All rights reserved.
