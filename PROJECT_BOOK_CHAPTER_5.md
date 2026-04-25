# Chapter 5: Project Layouts

## 5.1 Introduction

User interface (UI) design is a critical component of software systems, directly impacting user experience, system adoption, and operational efficiency. This chapter provides a comprehensive overview of SCALA-Guard's web application layouts, covering all major pages and user interface components. The layouts are designed following modern UI/UX principles including responsive design, accessibility compliance (WCAG 2.1), intuitive navigation, and visual hierarchy.

SCALA-Guard's web interface is built using React with TypeScript and styled with Tailwind CSS, enabling fast development, type safety, and consistent visual design across all pages. The interface serves multiple user roles (ANALYST, ADMIN, VIEWER) with role-based access controls determining available features. This chapter presents detailed descriptions of all major pages, user workflows, interactive elements, and design considerations that transform raw threat intelligence data into actionable security insights.

The layout descriptions follow a consistent pattern: page purpose, key components, user interactions, and data flow. While detailed wireframes and visual mockups are best viewed through an interactive design tool, this chapter provides comprehensive textual descriptions enabling developers to understand the visual architecture and implement responsive, accessible interfaces.

---

## 5.2 Project Layouts

### 5.2.1 Home Page

**Purpose:** Landing page introducing SCALA-Guard to new users and providing quick navigation to core features.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│              SCALA-Guard Navigation Bar                 │
│  Logo │ Home │ Features │ Scanner │ Dashboard │ Login  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    HERO SECTION                         │
│                                                         │
│  🛡️  SCALA-Guard: Behavioral Package Threat            │
│      Intelligence with LLM-Assisted Remediation        │
│                                                         │
│  Protect your open-source supply chain from malicious  │
│  packages using behavioral analysis, ML classification,│
│  and AI-powered remediation.                           │
│                                                         │
│  [Get Started] [View Demo] [Learn More]                │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              KEY STATISTICS SECTION                     │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ 10,000+ │  │  95% +   │  │  <5 Sec  │             │
│  │Packages │  │Accuracy  │  │ Analysis │             │
│  │Analyzed │  │          │  │Time      │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│           QUICK ACTION BUTTONS SECTION                 │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📦 Analyze Package                             │  │
│  │ Upload or specify a package for analysis       │  │
│  │ [Get Started →]                                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🔮 Predict Risk                                │  │
│  │ Use ML model for direct threat assessment      │  │
│  │ [Try Prediction →]                             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📋 Batch Audit                                 │  │
│  │ Scan entire requirements.txt files             │  │
│  │ [Batch Scan →]                                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└───────────────────────────────────────────���─────────────┘

┌─────────────────────────────────────────────────────────┐
│              TESTIMONIALS SECTION                       │
│                                                         │
│  "SCALA-Guard has reduced our incident response       │
│   time from 8 hours to 15 minutes." - Security Lead   │
│                                                         │
│  "The SHAP explainability makes it easy to justify    │
│   decisions to auditors." - Compliance Officer        │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  FOOTER SECTION                        │
│  Copyright © 2026 │ Privacy │ Terms │ Contact │ Social │
└──────────────────────────────────���──────────────────────┘
```

**Key Components:**

1. **Navigation Bar:** Fixed header with logo, menu items, authentication status
2. **Hero Section:** Large, compelling headline with value proposition and CTA buttons
3. **Statistics:** Key metrics showcasing system capabilities (10,000+ packages analyzed, 95% accuracy)
4. **Quick Action Cards:** Three primary use cases with descriptive text and call-to-action buttons
5. **Testimonials:** Social proof from satisfied users
6. **Footer:** Copyright, legal links, contact information

**User Interactions:**

- Click "Get Started" → Navigate to Scanner page
- Click "Try Prediction" → Navigate to Prediction page
- Click "Learn More" → Scroll to Features section
- Click "Login" → Navigate to Login page

**Responsive Design:**

- Desktop: Full-width layout with three-column action cards
- Tablet: Two-column cards layout, optimized spacing
- Mobile: Single-column stacked layout, enlarged touch targets

---

### 5.2.2 Platform Capabilities Section

**Purpose:** Showcase SCALA-Guard's key features and competitive advantages.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│         PLATFORM CAPABILITIES SECTION                   │
│                                                         │
│  🎯 Why Choose SCALA-Guard?                           │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ 🔍 Behavioral    │  │ 🤖 ML-Powered    │            │
│  │    Analysis      │  │    Scoring       │            │
│  │                  │  │                  │            │
│  │ Sandbox execution│  │ 96.5% accuracy   │            │
│  │ with strace &    │  │ with confidence  │            │
│  │ tcpdump capture  │  │ intervals        │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ 🧠 Explainable   │  │ 🛠️  AI Remediation│           │
│  │    AI            │  │                  │            │
│  │                  │  │ DeepSeek-powered │            │
│  │ SHAP values show │  │ fix suggestions  │            │
│  │ why packages are │  │ and alternatives │            │
│  │ flagged          │  │                  │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ 📦 Batch Audit   │  │ ⚡ Real-Time     │            │
│  │    Mode          │  │    Predictions   │            │
│  │                  │  │                  │            │
│  │ Scan 1000+ pkgs  │  │ Direct ML queries│            │
│  │ in minutes       │  │ with flexibility │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         SUPPORTED ECOSYSTEMS                            │
│                                                         │
│  NPM (Node.js)  →  Analyzes package.json & npm packages│
│  PyPI (Python)  →  Analyzes requirements.txt & packages│
│                                                         │
│  Future: Ruby, Go, Rust, Java, .NET                    │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         SUPPORTED FILE FORMATS                          │
│                                                         │
│  📄 Archives: ZIP, TAR.GZ, TAR.BZ2                     │
│  📄 Documents: PDF, DOCX, XLSX                         │
│  📄 Text: TXT, CSV, requirements.txt, package.json    │
│                                                         │
│  Maximum File Size: 20MB per upload                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **Feature Cards:** 6 major capabilities with icons and brief descriptions
2. **Ecosystem Support:** Displays supported package ecosystems
3. **File Format Support:** Lists accepted file types and size limits

**Visual Hierarchy:**

- Icon + Title: Primary information
- Description Text: Secondary details
- Color coding: Highlights different feature categories

---

### 5.2.3 Analysis Pipeline Section

**Purpose:** Educate users about SCALA-Guard's analysis process.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│          HOW SCALA-GUARD WORKS                         │
│                                                         │
│  Our analysis pipeline combines behavioral detection,  │
│  machine learning, and AI-powered remediation:         │
│                                                         │
│  Step 1              Step 2              Step 3        │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐   │
│  │ INGEST   │─────→ │ ANALYZE  │─────→ │ SCORE    │   │
│  │          │       │          │       │          │   │
│  │ Package  │       │ Behavioral│       │Risk      │   │
│  │ Upload   │       │ Analysis  │       │Prediction│  │
│  │          │       │ (Sandbox) │       │(ML)      │   │
│  └──────────┘       └──────────┘       └──────────┘   │
│        │                   │                  │        │
│        └───────────────────┼──────────────────┘        │
│                            │                           │
│                   Step 4            Step 5             │
│                   ┌──────────┐     ┌──────────┐        │
│                   │ EXPLAIN  │────→ │REMEDIATE │       │
│                   │          │     │          │        │
│                   │SHAP      │     │AI        │        │
│                   │Feature   │     │Suggestions        │
│                   │Importance│     │(DeepSeek)        │
│                   └──────────┘     └──────────┘        │
│                       │                 │              │
│                       └─────────┬───────┘              │
│                                 │                      │
│                           Step 6                       │
│                        ┌──────────────┐               │
│                        │ REPORT       │               │
│                        │              │               │
│                        │Display Results               │
│                        │Store History │               │
│                        └──────────────┘               │
│                                                       │
└─────────────────────────────────────────────────────────┘

                    DETAILED PROCESS FLOW

┌──────────────────────────────────────────────────────┐
│ 1️⃣ INGESTION                                        │
│ ├─ Accept package files (ZIP, TAR, PDF, DOCX)       │
│ ├─ Validate file format and size (<20MB)            │
│ ├─ Extract contents to temporary directory          │
│ └─ Store metadata in database                       │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ 2️⃣ BEHAVIORAL ANALYSIS                              │
│ ├─ Execute package in Docker sandbox                │
│ ├─ Capture system calls (strace)                    │
│ ├─ Capture network traffic (tcpdump)                │
│ ├─ Monitor file operations and process creation     │
│ └─ Extract behavioral features                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ 3️⃣ RISK SCORING                                     │
│ ├─ Fuse behavioral features (128-dimensional)       │
│ ├─ Pass through Random Forest/XGBoost model         │
│ ├─ Generate risk score (0-1)                        │
│ ├─ Assign threat level (HIGH/MEDIUM/LOW/SAFE)       │
│ └─ Calculate confidence interval                    │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ 4️⃣ EXPLAINABILITY                                   │
│ ├─ Calculate SHAP values for each feature           │
│ ├─ Rank features by importance                      │
│ ├─ Generate rule-based explanations                 │
│ └─ Create decision path visualization               │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ 5️⃣ REMEDIATION                                      │
│ ├─ Query alternative package databases              │
│ ├─ Call DeepSeek API for code suggestions           │
│ ├─ Map relevant CVE entries                         │
│ ├─ Generate isolation strategies                    │
│ └─ Return actionable remediation options            │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ 6️⃣ REPORTING                                        │
│ ├─ Aggregate all analysis results                   │
│ ├─ Generate interactive dashboard                   │
│ ├─ Store scan history in database                   │
│ ├─ Enable result export (JSON, CSV, PDF)            │
│ └─ Send user notification (email/webhook)           │
└──���───────────────────────────────────────────────────┘
```

**Key Information:**

- 6-step analysis pipeline from ingestion to reporting
- Each step clearly labeled with description
- Detailed sub-steps explaining what happens in each phase
- Time estimates for each phase (visible in actual UI)

---

### 5.2.4 Footer Section

**Purpose:** Provide navigation, legal information, and contact details.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│                   FOOTER SECTION                        │
│                                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │                                                  │ │
│  │ 📍 Quick Links        📚 Resources    ⚙️ Legal  │ │
│  │                                                  │ │
│  │ • Home                • Documentation • Privacy  │ │
│  │ • Scanner             • Blog          • Terms    │ │
│  │ • Prediction          • FAQ           • License  │ │
│  │ • Batch Audit         • Support       • Cookies  │ │
│  │ • Dashboard           • API Docs                 │ │
│  │ • History                                       │ │
│  │                                                  │ │
│  │ 📧 Newsletter         🔗 Social Media           │ │
│  │                                                  │ │
│  │ [Email Input Box] [Subscribe]                   │ │
│  │                                                  │ │
│  │ Twitter  LinkedIn  GitHub  YouTube              │ │
│  │                                                  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │  © 2026 SCALA-Guard. All rights reserved.          │ │
│  │  Built by Abdus-Salam24 at MBSTU                   │ │
│  │  Version 1.0.0  |  Status: Production              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Footer Components:**

1. **Quick Links Column:** Navigation to main pages
2. **Resources Column:** Documentation, blog, support
3. **Legal Column:** Privacy policy, terms of service, license
4. **Newsletter Signup:** Email subscription for updates
5. **Social Media Links:** Twitter, LinkedIn, GitHub, YouTube
6. **Copyright & Version Info:** Legal notice and system status

**Features:**

- Dark background for contrast
- Organized in 3+ columns (responsive to 1-column on mobile)
- Links are clickable and tracked for analytics
- Newsletter integration with email service
- Social icons link to external profiles

---

### 5.2.5 User Login or Register Page

**Purpose:** Authenticate users or create new accounts.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│         SCALA-Guard Authentication Page                 │
│                                                         │
│  Left Side (Desktop View)      Right Side               │
│  ┌──────────────────────┐  ┌────────────────────────┐  │
│  │                      │  │                        │  │
│  │   🛡️ SCALA-Guard    │  │  LOGIN                 │  │
│  │                      │  │                        │  │
│  │   Behavioral Package │  │  Email or Username     │  │
│  │   Threat            │  │  [________________]    │  │
│  │   Intelligence      │  │                        │  │
│  │                      │  │  Password              │  │
│  │   Protect your      │  │  [________________]    │  │
│  │   supply chain      │  │  □ Remember me         │  │
│  │   from malicious    │  │  [Forgot Password?]    │  │
│  │   packages          │  │                        │  │
│  │                      │  │  [LOGIN BUTTON]        │  │
│  │   • 95% Accuracy    │  │                        │  │
│  │   • <5 Sec Analysis │  │  ─────────────────────  │  │
│  │   • AI Remediation  │  │  Don't have account?   │  │
│  │                      │  │  [SIGN UP HERE]        │  │
│  │                      │  │                        │  │
│  └──────────────────────┘  └────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

                    REGISTER PAGE

┌────────────────────────────────────────────────────────┐
│                   SIGN UP                              │
│                                                        │
│  Full Name                                            │
│  [________________________________]                  │
│                                                        │
│  Email Address                                        │
│  [________________________________]                  │
│  (Must be valid email)                               │
│                                                        │
│  Username                                             │
│  [________________________________]                  │
│  (4-20 characters, alphanumeric)                      │
│                                                        │
│  Password                                             │
│  [________________________________]                  │
│  (Minimum 8 characters, 1 uppercase, 1 number)       │
│                                                        │
│  Confirm Password                                     │
│  [________________________________]                  │
│                                                        │
│  ☐ I agree to Terms of Service                       │
│  ☐ I agree to Privacy Policy                         │
│                                                        │
│  [CREATE ACCOUNT]  or  [SIGN IN WITH GITHUB]        │
│                                                        │
│  Already have account? [LOGIN HERE]                  │
│                                                        │
└────────────────────────────────────────────────────────┘

              TWO-FACTOR AUTHENTICATION

┌────────────────────────────────────────────────────────┐
│           Verify Your Identity                         │
│                                                        │
│  Enter the 6-digit code sent to:                      │
│  mda****@example.com                                  │
│                                                        │
│  [_] [_] [_] [_] [_] [_]                              │
│                                                        │
│  [VERIFY]                                             │
│                                                        │
│  Code will expire in: 3:45                            │
│  [Resend Code]  [Use Backup Code]                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Key Features:**

1. **Login Form:**
   - Email/Username field
   - Password field with "Show/Hide" toggle
   - "Remember Me" checkbox
   - "Forgot Password?" link
   - Login button
   - Register link for new users

2. **Registration Form:**
   - Full Name field
   - Email field with validation
   - Username field (alphanumeric check)
   - Password field (strength indicator)
   - Confirm Password field
   - Terms and Privacy checkboxes
   - Social login options (GitHub, Google)

3. **Two-Factor Authentication:**
   - OTP input with 6 digits
   - Timer showing code expiration
   - Resend code option
   - Backup code option

**Security Features:**

- Password strength indicator
- Rate limiting on login attempts
- HTTPS-only transmission
- Session timeout after inactivity
- Secure password recovery via email

---

### 5.2.6 Scanner Page

**Purpose:** Allow users to upload packages for threat analysis.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│                  PACKAGE SCANNER                       │
│                                                         │
│  🔍 Upload Package or Specify by Name                 │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              UPLOAD AREA                         │  │
│  │                                                  │  │
│  │    📦  Drag & Drop Package File Here             │  │
│  │        or [Click to Browse]                      │  │
│  │                                                  │  │
│  │    Supported: ZIP, TAR, PDF, DOCX, CSV           │  │
│  │    Max Size: 20MB                                │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ───────────────────────────────────────────────────   │
│                    OR                                  │
│  ───────────────────────────────────────────────────   │
│                                                         │
│  ANALYZE BY PACKAGE NAME                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Ecosystem                                        │  │
│  │ ◯ NPM (Node.js Packages)                        │  │
│  │ ◯ PyPI (Python Packages)                        │  │
│  │                                                  │  │
│  │ Package Name                                     │  │
│  │ [________________________________]               │  │
│  │ Example: requests, lodash, react                │  │
│  │                                                  │  │
│  │ Package Version (Optional)                      │  │
│  │ [________________________________]               │  │
│  │ Leave empty for latest version                  │  │
│  │                                                  │  │
│  │ [ANALYZE PACKAGE]                               │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ANALYSIS OPTIONS                                      │
│  ☑ Include Behavioral Analysis                        │
│  ☑ Include ML Risk Scoring                            │
│  ☑ Include LLM Remediation                            │
│  ☑ Generate SHAP Explainability                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

                   PROGRESS INDICATOR

┌────────────────────────────────────────────────────────┐
│  Analyzing: requests 2.28.1                            │
│                                                        │
│  ⏳ 1. Extracting Package... ✅ Done (0.5s)            │
│  ⏳ 2. Behavioral Analysis... ⚙️  Processing (2.3s)    │
│  ⏳ 3. Risk Scoring...       ⏰ Queued                  │
│  ⏳ 4. Explainability...     ⏰ Queued                  │
│  ⏳ 5. AI Remediation...     ⏰ Queued                  │
│                                                        │
│  Overall Progress: ████████░░ 67%                      │
│  Estimated Time: 3-5 seconds remaining                │
│                                                        │
│  [Cancel Analysis]                                    │
│                                                        │
└────────────────────────────────────────────────────────┘

                  RESULTS DISPLAY

┌────────────────────────────────────────────────────────┐
│  📦 Analysis Results                                   │
│                                                        │
│  Package: requests v2.28.1                            │
│  Ecosystem: PyPI                                      │
│  Analysis Date: April 25, 2026 10:30 AM               │
│                                                        │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │   RISK SCORE         │  │   THREAT LEVEL       │   │
│  │        0.08          │  │       SAFE 🟢        │   │
│  │   (8% Malicious)     │  │ Confidence: 96%      │   │
│  │                      │  │                      │   │
│  │   [Low Risk Gauge]   │  │ [Safe Status Badge]  │   │
│  └──────────────────────┘  └──────────────────────┘   │
│                                                        │
│  📊 FEATURE ANALYSIS (Top Contributing Factors)       │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 1. Network Connections: 0.02 (safe pattern)    │ │
│  │ 2. Syscall Patterns: 0.03 (normal execution)   │ │
│  │ 3. File Operations: 0.01 (expected behavior)   │ │
│  │ 4. Process Creation: 0.02 (standard practice)  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  🧠 EXPLAINABILITY                                     │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Why is this package safe?                       │ │
│  │                                                  │ │
│  │ • No suspicious network connections detected   │ │
│  │ • System calls follow standard HTTP patterns   │ │
│  │ • No attempts to access system files          │ │
│  │ • Process hierarchy is normal for Python      │ │
│  │ • Known legitimate maintainer signature       │ │
│  │                                                │ │
│  │ [View Full SHAP Analysis]                     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  [Export Results] [Save to History] [New Analysis]    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **Upload Area:** Drag-and-drop interface with file browser
2. **Package Name Input:** Ecosystem selector and version field
3. **Analysis Options:** Checkboxes for analysis features
4. **Progress Indicator:** Step-by-step progress with time estimates
5. **Results Display:** Risk gauge, threat level, feature analysis
6. **Explainability Panel:** SHAP-based explanations in plain language

**User Interactions:**

- Upload file or enter package name
- Select analysis options
- View real-time progress
- Click "View Full SHAP Analysis" to see detailed explainability
- Export results in JSON/CSV/PDF formats

---

### 5.2.7 Prediction Page

**Purpose:** Provide direct ML model access for feature-based threat predictions.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│              ML PREDICTION INTERFACE                    │
│                                                         │
│  🔮 Direct Machine Learning Predictions                │
│                                                         │
│  This page allows you to query the ML model directly   │
│  with custom features for threat assessment.           │
│                                                         │
│  ┌────────��─────────────────────────────────────────┐  │
│  │  INPUT METHOD                                    │  │
│  │                                                  │  │
│  │  ◯ Manual Entry (Form)                         │  │
│  │  ◯ CSV Upload                                  │  │
│  │  ◯ JSON Array Submission                       │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  MANUAL FEATURE ENTRY                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │                                                  │  │
│  │ Feature 1: Syscall Count                        │  │
│  │ [____________________]                          │  │
│  │ Expected range: 0-1000                          │  │
│  │                                                  │  │
│  │ Feature 2: Network Connections                  │  │
│  │ [____________________]                          │  │
│  │ Expected range: 0-500                           │  │
│  │                                                  │  │
│  │ Feature 3: File Operations                      │  │
│  │ [____________________]                          │  │
│  │ Expected range: 0-1000                          │  │
│  │                                                  │  │
│  │ Feature 4: Process Fork Events                  │  │
│  │ [____________________]                          │  │
│  │ Expected range: 0-100                           │  │
│  │                                                  │  │
│  │ Feature 5: Suspicious IP Access                 │  │
│  │ [____________________]                          │  │
│  │ Binary: 0 (no) or 1 (yes)                      │  │
│  │                                                  │  │
│  │ [PREDICT]                                       │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  CSV UPLOAD METHOD                                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │                                                  │  │
│  │  📤 Upload CSV for Batch Predictions           │  │
│  │                                                  │  │
│  │  [Browse File]  or Drag CSV here               │  │
│  │                                                  │  │
│  │  CSV Format:                                    │  │
│  │  Feature1,Feature2,Feature3,Feature4,Feature5  │  │
│  │  42,100,75,5,0                                 │  │
│  │  50,110,80,3,1                                 │  │
│  │  38,95,70,2,0                                  │  │
│  │                                                  │  │
│  │  [UPLOAD & PREDICT]                            │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

                PREDICTION RESULTS

┌────────────────────────────────────────────────────────┐
│  📊 Prediction Results                                 │
│                                                        │
│  Input Features: [42, 100, 75, 5, 0]                  │
│  Model Version: Random Forest v1.0                    │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │              PREDICTION OUTPUT                   │ │
│  │                                                  │ │
│  │  Risk Label:        MEDIUM_RISK  🟡             │ │
│  │  Risk Score:        0.62 (62% malicious)        │ │
│  │  Confidence:        0.87 (87% confident)        │ │
│  │                                                  │ │
│  │  [Risk Gauge Visualization]                    │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  📈 FEATURE STATISTICS                                │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Feature 1 (Syscall Count):         42           │ │
│  │  - Mean in dataset: 50              │ Below Avg  │ │
│  │  - Std deviation: 15                             │ │
│  │                                                  │ │
│  │ Feature 2 (Network Connections):   100          │ │
│  │  - Mean in dataset: 85              │ Above Avg  │ │
│  │  - Std deviation: 30                             │ │
│  │                                                  │ │
│  │ Feature 3 (File Operations):       75           │ │
│  │  - Mean in dataset: 70              │ Above Avg  │ │
│  │  - Std deviation: 20                             │ │
│  │                                                  │ │
│  │ Feature 4 (Process Forks):         5            │ │
│  │  - Mean in dataset: 3               │ Above Avg  │ │
│  │  - Std deviation: 2                              │ │
│  │                                                  │ │
│  │ Feature 5 (Suspicious IP Access):  0            │ │
│  │  - Normal value: 0 or 1             │ Normal     │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  💡 INTERPRETATION                                     │
│  This combination of features indicates moderate risk │
│  due to elevated network connections and process      │
│  creation. Recommend further investigation.           │
│                                                        │
│  [Compare with other predictions] [New Prediction]    │
│                                                        │
└────────────────────────────────────────────────────────┘

            BATCH PREDICTION SUMMARY

┌────────────────────────────────────────────────────────┐
│  📋 Batch Processing Summary                          │
│                                                        │
│  Total Predictions Processed: 100                      │
│  Processing Time: 2.5 seconds                          │
│  Average Time per Prediction: 25ms                     │
│                                                        │
│  Risk Distribution:                                    │
│  ├─ HIGH_RISK 🔴:   12 (12%)                          │
│  ├─ MEDIUM_RISK 🟡: 28 (28%)                          │
│  ├─ LOW_RISK 🟢:    35 (35%)                          │
│  └─ SAFE 🟢:        25 (25%)                          │
│                                                        │
│  [Export Results] [View Detailed Report]              │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **Input Method Selector:** Manual entry, CSV upload, JSON submission
2. **Feature Input Form:** 5+ feature fields with expected ranges
3. **CSV Uploader:** Drag-and-drop for batch predictions
4. **Prediction Results:** Risk label, score, confidence
5. **Feature Statistics:** Comparison with dataset mean/std
6. **Interpretation Panel:** Human-readable explanation
7. **Batch Summary:** Aggregate results for multiple predictions

**Features:**

- Real-time feature validation
- Contextual help for each feature
- Comparison with historical data
- Batch processing for efficiency
- Export prediction results

---

### 5.2.8 Batch Audit Page

**Purpose:** Scan entire dependency files (requirements.txt, package.json) for supply chain auditing.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│              BATCH AUDIT SCANNER                        │
│                                                         │
│  📦 Scan Entire Dependency Files                       │
│                                                         │
│  Analyze all packages in requirements.txt or           │
│  package.json at once for comprehensive supply        │
│  chain risk assessment.                                │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │     UPLOAD DEPENDENCY FILE                       │  │
│  │                                                  │  │
│  │  📄  Drag & Drop File Here                       │  │
│  │       or [Click to Browse]                       │  │
│  │                                                  │  │
│  │  Supported:                                      │  │
│  │  • requirements.txt (Python)                     │  │
│  │  • package.json (Node.js)                        │  │
│  │  • package-lock.json (Lockfile)                  │  │
│  │  • CSV format (custom)                           │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  FILE PREVIEW                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Selected File: requirements.txt                 │  │
│  │  File Size: 2.3 KB                              │  │
│  │  Total Packages: 42                             │  │
│  │                                                  │  │
│  │  Preview:                                        │  │
│  │  numpy==1.21.0                                  │  │
│  │  pandas>=1.3.0                                  │  │
│  │  scikit-learn                                   │  │
│  │  matplotlib==3.4.2                              │  │
│  │  [+ 38 more packages]                           │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  SCAN OPTIONS                                          │
│  ☑ Analyze all packages                               │
│  ☑ Include version mismatch detection                 │
│  ☑ Check for deprecated packages                      │
│  ☑ Generate compliance report                         │
│                                                        │
│  [START BATCH ANALYSIS]                              │
│                                                         │
└─────────────────────────────────────────────────────────┘

                BATCH ANALYSIS PROGRESS

┌────────────────────────────────────────────────────────┐
│  📊 Batch Audit Progress                              │
│                                                        │
│  Analyzing: 42 Packages                               │
│  Status: Processing...                                │
│                                                        │
│  ████████████░░░░░░░░ 58% Complete (24/42)           │
│                                                        │
│  Processing:                                          │
│  ✅ numpy (1.21.0)         - 1.2s    SAFE 🟢          │
│  ✅ pandas (1.3.0)         - 1.8s    SAFE 🟢          │
│  ✅ scikit-learn (1.0.0)   - 2.3s    SAFE 🟢          │
│  ✅ matplotlib (3.4.2)     - 1.5s    LOW_RISK 🟡      │
│  ⏳ requests (2.28.1)      - 0.8s    Processing...    │
│                                                        │
│  Queued: 37 packages remaining                        │
│  Est. Time: 1-2 minutes                               │
│                                                        │
│  [Pause] [Resume] [Cancel]                            │
│                                                        │
└────────────────────────────────────────────────────────┘

              BATCH ANALYSIS RESULTS

┌────────────────────────────────────────────────────────┐
│  📈 Batch Audit Report                                │
│                                                        │
│  File: requirements.txt                               │
│  Analysis Date: April 25, 2026                        │
│  Total Time: 3:45 minutes                             │
│                                                        │
│  ┌────────────────────────────────────────────────┐   │
│  │  SUMMARY STATISTICS                            │   │
│  │                                                │   │
│  │  Total Packages Analyzed:     42               │   │
│  │  Safe Packages:                35 (83%)  🟢   │   │
│  │  Low Risk:                     5  (12%) 🟡   │   │
│  │  Medium Risk:                  2  (5%)  🟡   │   │
│  │  High Risk:                    0  (0%)  🔴   │   │
│  │                                                │   │
│  │  Overall Risk Level:  LOW                      │   │
│  │  Recommendation: APPROVE for deployment       │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  📊 RISK DISTRIBUTION CHART                           │
│  ┌────────────────────────────────────────────────┐   │
│  │                                                │   │
│  │  Safe     ██████████████████████ 83%          │   │
│  │  Low      ██████░ 12%                         │   │
│  │  Medium   ██░ 5%                              │   │
│  │  High     □ 0%                                │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  ⚠️ PACKAGES REQUIRING ATTENTION                      │
│  ┌────────────────────────────────────────────────┐   │
│  │ • requests (2.28.1) - LOW_RISK 🟡            │   │
│  │   Reason: Elevated network connections        │   │
│  │   Action: Review external API calls           │   │
│  │   Status: [View Details]                      │   │
│  │                                                │   │
│  │ • urllib3 (1.26.0) - LOW_RISK 🟡             │   │
│  │   Reason: HTTP client library                 │   │
│  │   Action: Monitor for vulnerabilities         │   │
│  │   Status: [View Details]                      │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  📋 DETAILED RESULTS TABLE                            │
│  ┌────────────────────────────────────────────────┐   │
│  │ Package │ Version │ Risk │ Confidence │ Action│   │
│  │─────────┼─────────┼─────┼────────────┼───────│   │
│  │numpy    │ 1.21.0  │SAFE │ 98%        │✅     │   │
│  │pandas   │ 1.3.0   │SAFE │ 97%        │✅     │   │
│  │requests │ 2.28.1  │LOW  │ 92%        │⚠️     │   │
│  │[+ 39 more]                                    │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  💾 EXPORT OPTIONS                                    │
│  [Export PDF Report] [Export CSV] [Export JSON]       │
│                                                        │
│  🔄 ACTIONS                                           │
│  [New Batch Audit] [Compare with Previous] [Share]    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **File Upload:** Drag-and-drop with format detection
2. **File Preview:** Shows detected packages and count
3. **Scan Options:** Customizable analysis parameters
4. **Progress Indicator:** Real-time package analysis progress
5. **Summary Statistics:** Overall risk distribution
6. **Risk Chart:** Visual representation of risk levels
7. **Attention List:** Flagged packages with details
8. **Detailed Results Table:** Complete package-by-package results
9. **Export Options:** PDF, CSV, JSON export formats

**Features:**

- Real-time progress with estimated time
- Pause/resume capability
- Detailed package-level information
- Risk trend visualization
- Batch comparison with historical scans
- Compliance reporting

---

### 5.2.9 Dashboard Page

**Purpose:** Provide comprehensive visualization of threat intelligence and system analytics.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│                  ANALYTICS DASHBOARD                    │
│                                                         │
│  Welcome, John Analyst! 👋                             │
│  Last login: Today at 10:30 AM                         │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │          KEY METRICS AT A GLANCE                 │  │
│  │                                                  │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐   │  │
│  │  │ Scans     │  │ Malicious │  │ Avg Time  │   │  │
│  │  │ This Week │  │ Detected  │  │ per Scan  │   │  │
│  │  │   245     │  │    12     │  │   3.2s    │   │  │
│  │  └───────────┘  └───────────┘  └───────────┘   │  │
│  │                                                  │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐   │  │
│  │  │ Avg Risk  │  │Remediations│ │ Accuracy  │   │  │
│  │  │ Score     │  │ Generated  │  │ Rate      │   │  │
│  │  │   0.18    │  │    8       │  │  96.5%    │   │  │
│  │  └───────────┘  └───────────┘  └───────────┘   │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │      THREAT DISTRIBUTION (Last 30 Days)         │  │
│  │                                                  │  │
│  │      Safe          Low Risk    Med Risk          │  │
│  │       🟢             🟡         🟡               │  │
│  │                                                  │  │
│  │  ╭─────────────────╮                            │  │
│  │  │                 │                            │  │
│  │  │     Safe        │  High Risk                │  │
│  │  │     81%         │   3%  🔴                  │  │
│  │  │     [Blue]      │                            │  │
│  │  │                 │                            │  │
│  │  ╰─────────────────╯   Medium Risk               │  │
│  │                        16%                       │  │
│  │    [Pie Chart with Donut View]                  │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │    SCAN ACTIVITY OVER TIME (Last 7 Days)        │  │
│  │                                                  │  │
│  │  Scans per Day                                  │  │
│  │  │                                              │  │
│  │40│                    ╱╲                        │  │
│  │35│               ╱╲ ╱  ╲                       │  │
│  │30│          ╱╲ ╱  ╲╱    ╲                     │  │
│  │25│      ╱╲ ╱  ╲╱         ╲                   │  │
│  │20│ ╱╲ ╱  ╲╱              ╲╱╲                 │  │
│  │15│╱  ╲╱                       ╲╱╲            │  │
│  │  │                                  ╲        │  │
│  │  ├─────────────────────────────────────────  │  │
│  │  │Mon Tue Wed Thu Fri Sat Sun                 │  │
│  │                                                  │  │
│  │  [Line Graph with Trend]                       │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │   TOP MALICIOUS PACKAGES (Last 30 Days)         │  │
│  │                                                  │  │
│  │  1. 🔴 malware-package (PyPI)                   │  │
│  │     Risk: 0.98 | Detected: 5 times | [Details] │  │
│  │                                                  │  │
│  │  2. 🔴 fake-crypto (NPM)                        │  │
│  │     Risk: 0.95 | Detected: 3 times | [Details] │  │
│  │                                                  │  │
│  │  3. 🟡 suspicious-lib (PyPI)                    │  │
│  │     Risk: 0.72 | Detected: 2 times | [Details] │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │   REMEDIATION STATUS                            │  │
│  │                                                  │  │
│  │  Generated: 8 remediation suggestions           │  │
│  │  Applied:   5 remediation recommendations       │  │
│  │  Pending:   3 awaiting review                   │  │
│  │  Approved:  95% of generated suggestions        │  │
│  │                                                  │  │
│  │  [View Pending Remediations]                    │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │   ECOSYSTEM BREAKDOWN                           │  │
│  │                                                  │  │
│  │  NPM Packages:    156 scans  (63%)              │  │
│  │  PyPI Packages:   91 scans   (37%)              │  │
│  │                                                  │  │
│  │  [Bar Chart]                                    │  │
│  │                                                  │  ��
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

              FILTER & EXPORT OPTIONS

┌────────────────────────────────────────────────────────┐
│  Filters:                                              │
│  Date Range: [Last 7 Days ▼] [Custom Date Range]     │
│  Risk Level: [All ▼] [High ▼] [Medium ▼]             │
│  Ecosystem:  [All ▼] [NPM ▼] [PyPI ▼]                │
│                                                        │
│  [Apply Filters]  [Reset]                             │
│                                                        │
│  Export: [PDF Report] [CSV Data] [JSON]               │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **Key Metrics Cards:** High-level statistics at a glance
2. **Threat Distribution Chart:** Pie chart of risk levels
3. **Activity Timeline:** Line graph of scans over time
4. **Top Threats:** List of most malicious packages detected
5. **Remediation Status:** Progress on fixing identified issues
6. **Ecosystem Breakdown:** Distribution across package types
7. **Filters:** Date range, risk level, ecosystem filtering
8. **Export Options:** PDF, CSV, JSON export

**Interactive Features:**

- Click on metrics to drill down
- Hover on charts for detailed tooltips
- Drag time range to zoom into specific periods
- Click packages to view detailed analysis
- Real-time updates with WebSocket

---

### 5.2.10 History Page

**Purpose:** Browse, filter, compare, and manage historical scans.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│                   SCAN HISTORY                          │
│                                                         │
│  📜 View and Manage All Previous Scans                 │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            SEARCH & FILTER                       │  │
│  │                                                  │  │
│  │  Search: [_____________________________]         │  │
│  │          (Package name, ID, date)                │  │
│  │                                                  │  │
│  │  Filters:                                        │  │
│  │  Date Range: [From: ________] [To: ________]    │  │
│  │  Risk Level: ☑ Safe ☑ Low ☑ Medium ☑ High      │  │
│  │  Ecosystem:  ☑ NPM  ☑ PyPI                      │  │
│  │  Status:     ☑ Completed ☑ Pending ☑ Failed    │  │
│  │                                                  │  │
│  │  Sort By: [Recent ▼]                            │  │
│  │  [Apply Filters] [Reset] [Save as View]         │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           SCAN HISTORY TABLE                     │  │
│  │                                                  │  │
│  │ ☐ Package         │ Version │ Risk │ Date │    │  │
│  │───────────────────┼─────────┼──────┼──────┤     │  │
│  │ ☑ requests        │ 2.28.1  │ SAFE │ Today│     │  │
│  │   [View] [Compare]│ PyPI    │ 🟢   │10:30│     │  │
│  │                   │         │ 0.08 │ AM  │     │  │
│  │───────────────────┼─────────┼──────┼──────┤     │  │
│  │ ☑ lodash          │ 4.17.21 │ LOW  │Today │     │  │
│  │   [View] [Compare]│ NPM     │ 🟡   │ 9:15│     │  │
│  │                   │         │ 0.32 │ AM  │     │  │
│  │───────────────────┼─────────┼──────┼──────┤     │  │
│  │ ☑ numpy           │ 1.21.0  │ SAFE │ Yes-│     │  │
│  │   [View] [Compare]│ PyPI    │ 🟢   │terday        │  │
│  │                   │         │ 0.05 │ 3:45│     │  │
│  │───────────────────┼─────────┼──────┼──────┤     │  │
│  │ ☑ flask           │ 2.0.1   │ MED  │ Yes-│     │  │
│  │   [View] [Compare]│ PyPI    │ 🟡   │terday        │  │
│  │                   │         │ 0.58 │ 1:20│     │  │
│  │───────────────────┼─────────┼──────┼──────┤     │  │
│  │ ☑ express         │ 4.18.1  │ SAFE │ 2 days     │  │
│  │   [View] [Compare]│ NPM     │ 🟢   │ ago │     │  │
│  │                   │         │ 0.09 │ 4:00│     │  │
│  │                                                  │  │
│  │  Showing 5 of 247 scans                         │  │
│  │  [< Previous] [1] [2] [3] [Next >]              │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  BULK ACTIONS                                          │
│  ☑ 5 Selected Items                                   │
│  [Delete Selected] [Export Selected] [Compare All]    │
│                                                         │
└─────────────────────────────────────────────────────────┘

              COMPARISON VIEW

┌────────────────────────────────────────────────────────┐
│  📊 Compare Scans                                      │
│                                                        │
│  Compare: requests 2.28.1 vs requests 2.27.1          │
│                                                        │
│  ┌────────────────────────────────────────────────┐   │
│  │ Metric              │ Previous │ Current │Δ   │   │
│  │─────────────────────┼──────────┼─────────┼────│   │
│  │ Risk Score          │ 0.12     │ 0.08    │-33%│   │
│  │ Threat Level        │ LOW      │ SAFE    │  ↓ │   │
│  │ Confidence          │ 0.89     │ 0.96    │+7% │   │
│  │ Syscall Count       │ 142      │ 138     │-3% │   │
│  │ Network Connections │ 12       │ 8       │-33%│   │
│  │ File Operations     │ 45       │ 42      │-7% │   │
│  │ Analysis Date       │ 2 days   │ Today   │    │   │
│  │─────────────────────┼──────────┼─────────┼────│   │
│  │ Overall Trend       │ IMPROVED ↑        │    │   │
│  │ Recommendation      │ APPROVE  ✅        │    │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  [View Side-by-Side Details]  [Export Comparison]     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **Search Bar:** Quick search by package name or ID
2. **Filter Panel:** Multiple filter options (date, risk, ecosystem, status)
3. **History Table:** Sortable list of scans with key information
4. **Bulk Actions:** Select multiple scans for batch operations
5. **Pagination:** Navigate through large scan histories
6. **Comparison View:** Side-by-side scan comparison
7. **Trend Analysis:** Show improvement/degradation over time

**Features:**

- Full-text search across scan history
- Multi-criteria filtering
- Sortable columns
- Export capabilities (CSV, PDF, JSON)
- Scan comparison with trend analysis
- Bulk delete and operations
- Quick access to detailed results

---

### 5.2.11 About Page

**Purpose:** Provide information about SCALA-Guard, team, and project details.

**Layout Structure:**

```
┌─────────────────────────────────────────────────────────┐
│                   ABOUT SCALA-GUARD                     │
│                                                         │
│  🛡️ SCALA-Guard: Behavioral Package Threat             │
│      Intelligence with LLM-Assisted Remediation         │
│                                                         │
│  Version 1.0.0 | Released: April 2026                  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              PROJECT OVERVIEW                    │  │
│  │                                                  │  │
│  │ SCALA-Guard is a comprehensive capstone project  │  │
│  │ addressing supply chain security in open-source │  │
│  │ ecosystems. The platform combines behavioral    │  │
│  │ analysis, machine learning classification, and  │  │
│  │ LLM-powered remediation to detect and resolve   │  │
│  │ malicious packages in NPM and PyPI ecosystems.  │  │
│  │                                                  │  │
│  │ Project Status: ✅ Active Development           │  │
│  │ GitHub: https://github.com/salam2216/Project    │  │
│  │ License: MIT                                     │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           KEY FEATURES & CAPABILITIES            │  │
│  │                                                  │  │
│  │ ✅ Behavioral Package Analysis                  │  │
│  │    System call tracing + network monitoring     │  │
│  │    in isolated Docker sandboxes                 │  │
│  │                                                  │  │
│  │ ✅ ML-Based Risk Scoring                        │  │
│  │    96.5% accuracy with Random Forest/XGBoost    │  │
│  │    ensemble models                              │  │
│  │                                                  │  │
│  │ ✅ SHAP-Based Explainability                    │  │
│  │    Feature importance analysis for transparent  │  │
│  │    decision-making                              │  │
│  │                                                  │  │
│  │ ✅ LLM-Assisted Remediation                     │  │
│  │    DeepSeek API integration for AI-generated    │  │
│  │    fix suggestions and code patches             │  │
│  │                                                  │  │
│  │ ✅ Batch Audit Mode                             │  │
│  │    Scan 1000+ packages from requirements.txt    │  │
│  │                                                  │  │
│  │ ✅ Real-Time Predictions                        │  │
│  │    Direct ML model access with flexible input   │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              TECHNOLOGY STACK                    │  │
│  │                                                  │  │
│  │ Frontend:                                        │  │
│  │ • React 18.2+ with TypeScript                   │  │
│  │ • Vite 4.4+ for fast builds                     │  │
│  │ • Tailwind CSS for responsive design            │  │
│  │ • Chart.js for data visualization               │  │
│  │                                                  │  │
│  │ Backend:                                         │  │
│  │ • FastAPI 0.104+ REST API framework             │  │
│  │ • Python 3.10+ (93.8% of codebase)              │  │
│  │ • Scikit-learn for ML models                    │  │
│  │ • Docker + strace/tcpdump for sandboxing       │  │
│  │                                                  │  │
│  │ Infrastructure:                                  │  │
│  │ • PostgreSQL for data persistence               │  │
│  │ • Redis for caching and task queuing            │  │
│  │ • Render.com for cloud deployment               │  │
│  │ • GitHub Actions for CI/CD automation           │  │
│  │                                                  │  │
│  │ AI/ML:                                           │  │
│  │ • DeepSeek LLM API for remediation               │  │
│  │ • SHAP for explainability                       │  │
│  │ • XGBoost/Random Forest classifiers             │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │                PROJECT TEAM                      │  │
│  │                                                  │  │
│  │ 👨‍💼 Project Lead: Abdus-Salam24                  │  │
│  │    Full-stack Developer, ML Engineer             │  │
│  │    Email: it21016@mbstu.ac.bd                    │  │
│  │    GitHub: https://github.com/Abdus-Salam24     │  │
│  │                                                  │  │
│  │ 🏫 Institution:                                  │  │
│  │    Mawlana Bhashani Science & Technology         │  │
│  │    University (MBSTU), Bangladesh                │  │
│  │                                                  │  │
│  │ 📅 Duration: 2025-2026                          │  │
│  │ 🎓 Project Type: Capstone / Thesis              │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           RESEARCH CONTRIBUTIONS                 │  │
│  │                                                  │  │
│  │ 1. Hybrid Feature Fusion                         │  │
│  │    Combines syscall sequences + network         │  │
│  │    patterns for improved accuracy                │  │
│  │                                                  │  │
│  │ 2. SHAP-Based Explainability                    │  │
│  │    Decision transparency for ML predictions      │  │
│  │                                                  │  │
│  │ 3. LLM Remediation Quality Evaluation           │  │
│  │    Benchmarks DeepSeek against known CVE patches │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              PERFORMANCE METRICS                 │  │
│  │                                                  │  │
│  │ Classification Accuracy:  96.5% (on test set)   │  │
│  │ F1-Score:                 0.95                  │  │
│  │ Average Analysis Time:    3.2 seconds           │  │
│  │ Batch Processing Speed:   100 packages/minute   │  │
│  │ API Response Time:        <500ms (p95)          │  │
│  │ System Uptime:            99.99% (SLA)          │  │
│  │ Concurrent Users:         1000+                 │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │             FUTURE ROADMAP                       │  │
│  │                                                  │  │
│  │ Q3 2026:                                         │  │
│  │ □ Support for Ruby, Go, Rust ecosystems         │  │
│  │ □ Real-time monitoring and alerting system      │  │
│  │ □ WebSocket streaming for live scans            │  │
│  │                                                  │  │
│  │ Q4 2026:                                         │  │
│  │ □ Multi-model ensemble for higher accuracy      │  │
│  │ □ Mobile app for on-the-go analysis             │  │
│  │ □ GitHub/GitLab webhook integrations            │  │
│  │                                                  │
│  │ 2027:                                            │  │
│  │ □ Advanced threat intelligence sharing          │  │
│  │ □ Community vulnerability database              │  │
│  │ □ Integration with security platforms           │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  [Documentation] [GitHub Repository] [Report Issue]    │
│  [Feature Request] [Contact Team] [Privacy Policy]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Components:**

1. **Project Overview:** Brief description and status
2. **Features List:** Key capabilities and highlights
3. **Technology Stack:** Complete list of technologies used
4. **Project Team:** Team members and contact information
5. **Research Contributions:** Novel approaches and innovations
6. **Performance Metrics:** Key performance indicators
7. **Future Roadmap:** Planned features and enhancements
8. **Quick Links:** Documentation, GitHub, contact, etc.

**Sections:**

- Comprehensive project background
- Technical stack documentation
- Team member profiles
- Research contributions
- Performance benchmarks
- Roadmap for future development
- Links to resources and support

---

## 5.3 Conclusion

This chapter has provided comprehensive descriptions of SCALA-Guard's complete web application interface, covering all major pages and user workflows. The layout designs follow modern UI/UX principles including:

**User-Centric Design:** Each page serves a specific user need with clear navigation, intuitive workflows, and contextual help.

**Responsive Architecture:** Layouts adapt seamlessly from mobile to desktop, ensuring accessibility across devices.

**Visual Hierarchy:** Information is organized with clear primary, secondary, and tertiary elements guiding user attention.

**Accessibility Compliance:** WCAG 2.1 standards ensure usability for users with diverse abilities.

**Performance Optimization:** Clean layouts enable fast rendering and minimal load times.

**Data Visualization:** Charts, gauges, and progress indicators make complex threat data easily understandable.

The eleven major pages (Home, Platform Capabilities, Analysis Pipeline, Footer, Login/Register, Scanner, Prediction, Batch Audit, Dashboard, History, About) collectively provide a complete security operations platform enabling analysts to discover, understand, and remediate threats in package ecosystems.

**Key Design Principles Implemented:**

1. **Consistency:** Visual language and interaction patterns remain consistent across pages
2. **Clarity:** All information is presented clearly with appropriate visual hierarchy
3. **Feedback:** Real-time progress indicators and status updates keep users informed
4. **Control:** Users can pause, resume, modify, and customize their analysis workflows
5. **Efficiency:** Quick actions and shortcuts enable power users to work rapidly
6. **Trust:** Transparency through explainability (SHAP) and detailed reporting builds confidence

The interface successfully transforms SCALA-Guard's sophisticated threat intelligence capabilities into an accessible platform enabling security teams to protect their supply chains from malicious packages effectively and efficiently.

---

**Chapter 5 Statistics:**
- **Content Length:** ~5,000+ words
- **Page Estimate:** ~10-12 pages
- **Major Pages:** 11 comprehensive page layouts
- **UI Components:** 50+ distinct interface elements
- **Diagrams:** Detailed ASCII mockups for each page
- **Features:** Complete feature list per page
- **User Workflows:** End-to-end user journeys documented

---

*Chapter 5 bridges the gap between system functionality and user experience, demonstrating how SCALA-Guard transforms sophisticated backend capabilities into intuitive, accessible web interfaces serving diverse security team needs.*
