# CareerPulse — Multimodal AI Resume Analyzer

**Designed by Shivam Kumar · Team Moshdi**

CareerPulse is a full-stack Applicant Tracking System (ATS) and multimodal resume audit platform powered by Gemini. It evaluates resumes across **5 weighted ATS dimensions**, detects keyword gaps against target job descriptions, and rewrites weak experience bullets using **Google's XYZ impact formula** in **under 10 seconds**.

---

## Key Features

- **Sub-10 Second Turbo ATS Audit**:
  - Low-latency Gemini inference (`ThinkingLevel.LOW`) combined with client-side image compression and server-side SHA-256 LRU caching.
  - Real-time stopwatch timer and 3-stage pipeline progress tracking.
- **Universal File, Photo & Camera Support**:
  - **Photos & Camera Scans**: Upload `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.bmp`, `.heic`, `.tiff`, capture directly from your device camera, or press `Ctrl+V` to paste any clipboard screenshot.
  - **Documents & Text**: Native support for **PDF** (`.pdf`), **Word** (`.docx` via Mammoth, `.doc`, `.rtf`), and **Structured Text** (`.txt`, `.md`, `.html`, `.json`, `.csv`, `.tex`, `.xml`).
- **8 Built-In Sample Resumes (Text, Photo Scans, PDF & DOCX)**:
  - **Priya Nair** — Principal Java & Distributed Systems Architect (`PDF Document`)
  - **Dr. Elena Rostova** — Senior AI & Machine Learning Research Engineer (`Photo Scan - JPG`)
  - **Alex Rivera** — Senior Full-Stack Software Engineer (`Plain Text / Markdown`)
  - **Arjun Mehta** — Cloud DevOps & Site Reliability Engineer (`Photo Scan - PNG`)
  - **Sophia Zhang** — Lead Product Manager, Enterprise B2B SaaS (`PDF Document`)
  - **Marcus Vance** — Data Analyst & BI Specialist (`Plain Text`)
  - **Olivia Sterling** — VP of Growth Marketing & RevOps (`DOCX Document`)
  - **Lucas Chen** — Cybersecurity & Cloud SecOps Analyst (`Photo Scan - WEBP`)
- **Interactive Career Optimization Suite**:
  - **Visual Document & OCR Inspector**: Side-by-side preview of uploaded or generated photo scans and PDF sheets.
  - **Actionable Fixes & Score Simulator**: Check off resolved fixes to preview your projected ATS score boost in real time.
  - **Google XYZ Bullet Transformer**: Instant side-by-side upgrades plus a live custom bullet rewriter.
  - **Keyword Gap Matrix**: Filter matched vs. missing keywords and copy missing terms in one click.
  - **Tailored Cover Letter & Interview Defense**: Generate role-specific executive cover letters and STAR-framework interview defenses.

---

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create a `.env` file with your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
