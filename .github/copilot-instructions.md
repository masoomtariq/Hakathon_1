# Project Constitution & Development Guidelines: Physical AI & Humanoid Robotics Course

## Core principles

**Truth-first & verifiable:** All factual claims, technical instructions, and performance numbers must be verifiable with reproducible steps, links to primary sources, or runnable code/simulations.

**Safety & ethics by design:** Prioritize safe robot behaviours, data privacy, user consent, and avoid instructions that enable unsafe or harmful real-world robot operation without appropriate safeguards.

**Reproducibility:** Every code example, simulation, dataset, and experiment must include the exact commands, dependency pins, and data pointers needed to reproduce results.

**Clarity for practitioners:** Content targets learners with a Computer Science / engineering background — explanations should be succinct, unambiguous, and include worked examples and diagrams where they aid comprehension.

### Writing quality metrics

All prose content (excluding code blocks, tables, and citations) must meet:

| Metric | Target | Tool |
|--------|--------|------|
| Flesch-Kincaid Grade Level | 10–14 | `textstat` Python library |
| Passive voice usage | ≤ 25% of sentences | `proselint` or `write-good` |
| Sentence length | Average ≤ 25 words | `textstat` |
| Broken links | 0 | `lychee` link checker in CI |

**Enforcement:** CI runs `scripts/check-prose.py` on all `.md` files; PRs with violations are blocked.

**User-centric personalization:** Personalization (via signup) must improve learning — content variants, difficulty, and suggested exercises adapt to declared software/hardware background.

**Open and traceable AI assistance:** Any content generated or edited by AI tools must be labeled, include provenance (what tool & prompt), and link or cite sources used by the AI.

**Accessibility & multilingualism:** The site and core content must be accessible (screen-reader friendly, semantic HTML) and provide high-quality Urdu translations alongside English.

**Modularity & maintainability:** Chapters, code, datasets, and deployment scripts must be modular and tested so future contributors can update pieces safely.

**Practicality & hands-on orientation:** Emphasize runnable labs and capstone outcomes (the Autonomous Humanoid simulated workflow) over purely theoretical exposition.

---

## Key standards (rules that apply to every artifact)

### Content & citation

- **Source traceability:** Every non-trivial factual claim or procedure must point to one or more sources (paper, docs, repo, dataset) or include a reproducible experiment.
- **Citation style:** Use a consistent citation format across the book (recommendation: APA for text + clickable links in the web version).
- **Originality:** No plagiarism — any reused text or images must have explicit permission or a license; attribute and license third-party materials clearly.
- **Plagiarism detection:** Before merging content PRs, run `copyscape` API check OR manual verification against top-5 Google results for key phrases. Document check in PR comment.
- **Citation link validation:** 
  - CI runs `lychee --max-retries 3` weekly on all Markdown files.
  - Stale links (404/410) generate GitHub issues with label `citation-maintenance`.
  - Links must be fixed or replaced within 14 days.
- **Source freshness:** For technical docs citations (ROS, NVIDIA), verify annually that linked version matches content. Track in `docs/citations-audit.md`.
- **AI-authorship label:** If any section/paragraph/code was generated or substantially revised by an AI tool, add a short provenance note: tool name, prompt summary, and the sources the tool used.

### Code, simulations & notebooks

- **Pin dependencies:** All code and simulation environments must provide version-pinned requirements (e.g., `requirements.txt`, `pyproject.toml`, `Dockerfile`) and a minimal test script that runs headless.
- **Reproducible environments:** Provide Docker images or devcontainer / GitHub Actions workflows so readers can reproduce examples locally or in CI.
- **Test coverage:** Key tutorials and examples must include automated smoke tests (e.g., unit/integration test that the notebook/script executes without errors).
- **Simulation assets license & size:** All simulation models (URDFs, meshes, textures) must include a license and be sized/packaged so they are practical to host on GitHub Pages or via a small CDN.

### RAG chatbot & data

- **Provenance for answers:** The RAG bot must provide source snippets (with clickable links or slide/section references) for every factual answer and indicate confidence.

**Confidence scale (required in RAG responses):**

| Level | Label | Criteria |
|-------|-------|----------|
| High | ✅ Confident | ≥ 3 relevant chunks with cosine similarity > 0.85 |
| Medium | ⚠️ Partial | 1–2 relevant chunks OR similarity 0.70–0.85 |
| Low | ❓ Uncertain | No chunks > 0.70; response prefixed with "Based on limited evidence..." |
| None | 🚫 No answer | No chunks > 0.50; respond "I don't have information about this in the book." |

- **Scope control:** The bot must honor user-selected text scope: if the user selects text and asks a question, answers should be limited to that selection unless the user asks to broaden scope.
- **No hallucinations policy:** If the system cannot find good evidence in the indexed content, it must respond with "I don't know / insufficient evidence" and optionally offer suggested search terms.
- **Indexing hygiene:** Only index the book's approved content; do not index private user data or unrelated repositories. Keep an index update log and retention policy for embeddings.

### Security, privacy & auth

- **Minimal data collection:** Ask only necessary background questions at signup (software/hardware experience) and store only what's needed for personalization.
- **Clear consent & privacy notice:** At signup show a concise privacy summary (what is stored, why, retention, how to delete).
- **Secure secrets & keys:** All API keys (OpenAI, Qdrant, Neon, Better-Auth) must be stored in secrets managers; never commit keys to the repository.
- **Auth integration standard:** Use Better-Auth for signup/signin. Personalization data mapping must be auditable and revocable by users.

### UX & translation

- **One-click chapter translation:** The "Translate to Urdu" button must translate the chapter content with quality control: machine translation + human proofreading notes (if available).
- **Personalization toggle:** Logged users see a personalization toggle at start of each chapter; default is non-personalized until user agrees.
- **Accessibility:** Follow WCAG 2.1 AA baseline for web content (semantic headings, alt text, keyboard navigation).

### Licensing & contributions

- **Content license:** Default recommendation: Creative Commons (e.g., CC BY-SA) for the textbook content; code examples under MIT or Apache 2.0. State license clearly in repo root.
- **Contribution rules:** All pull requests must include an issue reference, a short description, any relevant tests, and pass CI checks before merge. Use code review and require at least one approver.

---

## Constraints (hard boundaries)

**Deployment target:** Primary web build is Docusaurus → deployed to GitHub Pages. The production site must fit within GitHub Pages constraints (single repo, static site build).

**RAG infra limits:** Design the RAG system to operate within free/low-cost tiers (Qdrant Cloud Free, Neon Serverless free tier). If scaling beyond free tiers is required, create a clear upgrade path and cost estimate.

**Data retention & export:** Personalization data retention must be ≤ 2 years by default; allow immediate export/delete upon user request. (Adjust to comply with applicable laws.)

**Chapter length & structure:** Each chapter should be between 1,500–6,000 words (web friendly), include at least: learning objectives, prerequisites, step-by-step lab, and 3–5 exercises.

**Minimum reproducible artifacts per chapter:** each technical chapter must include:
- a runnable example (script, notebook, or Docker image),
- dependency file with pins,
- CI smoke test.

**CI requirement:** All merges to the main branch require passing CI (build + smoke tests + link checker).

**Security/PII prohibition:** Never publish raw user-declared personal identifiers (email, full name, exact location) in the public book or index them into the RAG vector store.

### Deployment Architecture (NEW)

This subsection defines the separation between static frontend and dynamic backend services:

#### (a) Static Frontend on GitHub Pages

- The Docusaurus-generated static site is deployed to GitHub Pages.
- All static assets (HTML, CSS, JS, images, simulation demos) are served from the GitHub Pages domain.
- The frontend is rebuilt and redeployed automatically on every merge to the `main` branch via GitHub Actions.

#### (b) Backend API on Hugging Face Spaces

- The FastAPI backend (handling RAG queries, authentication callbacks, personalization API) is deployed on **Hugging Face Spaces** (free tier, Docker-based).
- Hugging Face Spaces provides:
  - Free hosting for Docker-based applications
  - Persistent endpoints for API access
  - Integration-friendly environment for ML/AI workloads
- The backend connects to:
  - **Qdrant Cloud (Free Tier):** Vector database for RAG embeddings
  - **Neon Serverless Postgres (Free Tier):** User data, personalization settings, session management
  - **OpenAI API:** LLM inference for chatbot responses
  - **Better-Auth:** Authentication provider integration

#### (c) Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     GITHUB PAGES (Static Frontend)                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Docusaurus Static Site                                               │  │
│  │  • Course chapters (EN + Urdu)                                        │  │
│  │  • Embedded RAG Chatbot UI (iframe/widget)                            │  │
│  │  • Personalization toggle component                                   │  │
│  │  • Translation button component                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │ HTTPS API Calls
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   HUGGING FACE SPACES (Backend API)                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  FastAPI Application                                                  │  │
│  │  • /api/chat       → RAG query endpoint                               │  │
│  │  • /api/auth/*     → Better-Auth callbacks                            │  │
│  │  • /api/user       → Personalization settings CRUD                    │  │
│  │  • /api/translate  → Translation requests (if dynamic)               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                │                    │                         │
                ▼                    ▼                         ▼
┌──────────────────────┐ ┌─────────────────────┐ ┌─────────────────────────────┐
│  QDRANT CLOUD        │ │  NEON SERVERLESS    │ │  EXTERNAL SERVICES          │
│  (Free Tier)         │ │  POSTGRES           │ │                             │
│                      │ │  (Free Tier)        │ │  • OpenAI API (LLM)         │
│  • Book embeddings   │ │                     │ │  • Better-Auth (Auth)       │
│  • Semantic search   │ │  • User accounts    │ │  • Crowdin (Translation)    │
│  • Chapter vectors   │ │  • Personalization  │ │                             │
│                      │ │  • Session data     │ │                             │
└──────────────────────┘ └─────────────────────┘ └─────────────────────────────┘
```

#### Data Flow Summary

| Flow | Description |
|------|-------------|
| **User → GitHub Pages** | User loads static Docusaurus site; all static content served from GitHub Pages CDN |
| **Frontend → Hugging Face Spaces** | AJAX/fetch calls to FastAPI for chat, auth, personalization |
| **FastAPI → Qdrant** | Semantic search queries against book content embeddings |
| **FastAPI → Neon Postgres** | User data persistence, personalization retrieval/storage |
| **FastAPI → OpenAI** | LLM inference for RAG response generation |
| **FastAPI → Better-Auth** | OAuth callbacks, token validation |

#### CORS Configuration

The FastAPI backend must include CORS middleware allowing requests from the GitHub Pages domain:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://<username>.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Translation Standards (NEW)

This section defines the translation workflow, tooling, and quality assurance process for Urdu translations.

### (a) Translation Tooling: Docusaurus i18n + Crowdin

- **Primary tooling:** Use Docusaurus built-in i18n framework with Crowdin integration for translation management.
- **Workflow:**
  1. English content is authored in Markdown within Docusaurus `docs/` directory.
  2. `docusaurus write-translations` extracts translatable strings.
  3. Crowdin syncs with the repository and presents strings for translation.
  4. Translated content is pulled back via Crowdin CLI or GitHub integration.
  5. Docusaurus builds both `/en/` and `/ur/` locale versions.
- **Automation:** GitHub Actions workflow triggers Crowdin sync on content changes to `main` branch.

### (b) Technical Terminology Glossary

The following technical terms must be handled consistently across all translations. Terms marked "Keep in English" should remain untranslated (with optional transliteration in parentheses for pronunciation).

| English Term | Urdu Handling | Notes |
|--------------|---------------|-------|
| ROS 2 | Keep in English | Standard acronym |
| URDF | Keep in English | Unified Robot Description Format |
| Gazebo | Keep in English | Proper noun (simulator name) |
| NVIDIA Isaac | Keep in English | Proper noun |
| LiDAR | Keep in English | Standard acronym |
| SLAM / VSLAM | Keep in English | Standard acronym |
| Docker | Keep in English | Proper noun |
| API | Keep in English | Standard acronym |
| Python | Keep in English | Proper noun |
| Node (ROS) | Keep in English | Technical term |
| Topic (ROS) | Keep in English | Technical term |
| Service (ROS) | Keep in English | Technical term |
| Humanoid | ہیومنائیڈ (transliteration) | May use English in technical contexts |
| Robot | روبوٹ | Common Urdu adoption |
| Simulation | سمیولیشن | Common Urdu adoption |
| Artificial Intelligence | مصنوعی ذہانت | Standard Urdu term |
| Machine Learning | مشین لرننگ | Transliteration preferred |
| Neural Network | نیورل نیٹ ورک | Transliteration preferred |
| Capstone Project | حتمی منصوبہ | Or keep "Capstone" with transliteration |
| Prerequisites | لازمی شرائط | Standard Urdu |
| Tutorial | ٹیوٹوریل | Transliteration |
| Exercise | مشق | Standard Urdu |

**Glossary maintenance:** The glossary is maintained in `docs/i18n/glossary.md` and must be updated when new technical terms are introduced. Crowdin's glossary feature should mirror this file.

### (c) Human Review Requirements

The following chapters **require mandatory human review** by a native Urdu speaker with technical background before publication:

| Chapter | Reason for Mandatory Review |
|---------|----------------------------|
| Module 1: The Robotic Nervous System (ROS 2) | Foundation chapter; errors propagate to all subsequent understanding |
| Module 4: Vision-Language-Action (VLA) | Complex LLM + robotics integration; high risk of mistranslation |
| Capstone Project: The Autonomous Humanoid | Final assessment; must be unambiguous |

Other chapters should have human review as resources allow, prioritized by:
1. Chapters with safety-critical instructions (robot operation, hardware setup)
2. Chapters with complex multi-step procedures
3. Chapters with heavy code/command examples

### (d) Review Process

| Stage | Owner | Timeline | Deliverable |
|-------|-------|----------|-------------|
| **1. Machine Translation** | Automated (Crowdin) | Within 24 hours of English content merge | Draft Urdu translation in Crowdin |
| **2. Technical Review** | Assigned technical reviewer (must know ROS/robotics) | Within 5 business days | Corrections for technical accuracy |
| **3. Linguistic Review** | Native Urdu speaker (may be same as technical reviewer) | Within 5 business days (parallel or sequential) | Corrections for grammar, fluency, cultural appropriateness |
| **4. Correction Implementation** | Translator or maintainer | Within 3 business days | Updated translation in Crowdin |
| **5. Final Approval** | Chapter maintainer | Within 2 business days | Merge to `main`, deployed to site |

**Tracking corrections:**
- All review feedback is logged as Crowdin comments or linked GitHub issues.
- Corrections are tracked with labels: `translation`, `ur`, `module-X`.
- A translation quality dashboard (Crowdin analytics + GitHub issue metrics) is reviewed monthly.

**Reviewer qualifications:**
- Technical reviewer: Must have completed at least Module 1 of the course or equivalent ROS 2 experience.
- Linguistic reviewer: Native Urdu speaker with professional or academic writing experience.

**Escalation:** If reviewers disagree on terminology, escalate to the glossary maintainer. Glossary updates require a PR with justification.

---

## Success criteria (how we measure acceptance)

### Technical & deliverable

- ☐ **Site deployed:** Docusaurus site deployed on GitHub Pages and mirrors repository content automatically on each main branch merge.
- ☐ **RAG chatbot functional:** The embedded chatbot answers chapter questions with source snippets and returns a provenance link for ≥ 90% of factual queries within the indexed book content.
- ☐ **Scope-limited QA:** When user selects text and asks a question, the chatbot confines answers to that text in ≥ 95% of tests.
- ☐ **Auth & personalization:** Signup/signin via Better-Auth works; personalization settings are stored, applied to content rendering, and can be exported/deleted by the user.
- ☐ **Translation toggle:** The "Translate to Urdu" button provides a readable Urdu variant; a sample of chapters must pass human proofreading (native Urdu speaker) with ≤ 5% corrections.
- ☐ **Reproducibility tests pass:** All chapter smoke tests and simulation demos run successfully in CI (no manual intervention) on a clean environment.
- ☐ **Capstone demonstrator:** The capstone simulated workflow (voice command → LLM planner → ROS2 actions → navigation → object ID & manipulation in simulation) runs end-to-end in Isaac/Gazebo with provided scripts in the repo.
- ☐ **Security checks:** No secrets in repo; automated secret scanning and dependency vulnerability scans are configured and pass with no critical findings.
- ☐ **Licensing & attribution:** All third-party assets have explicit licenses and required attributions visible in the repo and book.

### Quality & educational impact

- ☐ **Clarity metric:** Pilot group (min. 10 learners with CS background) rates clarity ≥ 4/5 on core chapters.
- ☐ **Exercise effectiveness:** ≥ 80% of pilot learners can complete at least 3 referenced labs unaided after following instructions.
- ☐ **AI transparency:** All AI-authored sections include provenance notes; reviewers confirm provenance present for ≥ 100% of AI-edited sections.
- ☐ **User trust:** In user testing, the RAG chatbot responds "I don't know" appropriately (no unsupported confident answers) in ≥ 95% of no-evidence prompts.

---

## AI companion behavior rules (must-follow by any assistant used on this project)

- **Cite before claim:** Before making claims not trivially true, provide source links or mark the content as "requires verification."
- **No plausible-sounding fabrications:** If answer cannot be supported by the indexed content or clear sources, say "insufficient evidence" rather than guessing.
- **Ask clarifying Qs only when necessary:** If a user question is ambiguous and answering risks incorrect guidance (e.g., about real robot hardware safety), ask a brief clarifying question focused on safety or scope.
- **Label generated text:** Insert an unobtrusive provenance note where AI has generated or substantially rewritten text.
- **Respect the Constitution:** If a proposed edit or addition would violate any clause above (privacy, license, safety, reproducibility), refuse and explain which rule prevents it and propose an acceptable alternative.

---

## Governance & change control

- **Constitution changes:** Any change to this Constitution requires a documented proposal (issue + PR) and approval by at least two maintainers and a subject-matter reviewer (robotics or safety) before being merged.
- **Periodic review:** Review this Constitution at major milestones (first public release, after capstone pilot, annually) and record review outcomes in the repo.

---

## Appendix A: Personalization Specification (NEW)

This appendix defines the user background questions, personalization mapping, and interaction with translation.

### A.1 Background Questions at Signup

The following questions are presented during user signup via Better-Auth. All questions are optional but recommended for personalized experience.

| # | Question | Answer Options | Data Field |
|---|----------|----------------|------------|
| 1 | What is your programming experience level? | None / Beginner (< 1 year) / Intermediate (1-3 years) / Advanced (3+ years) | `programming_level` |
| 2 | Which programming languages are you comfortable with? (Select all) | Python / C++ / JavaScript / Rust / Other / None | `languages[]` |
| 3 | Have you worked with ROS (Robot Operating System) before? | Never heard of it / Heard of it but never used / Used ROS 1 / Used ROS 2 / Used both | `ros_experience` |
| 4 | What is your experience with Linux/Ubuntu? | None / Basic (file navigation, terminal) / Intermediate (package management, scripting) / Advanced (system administration) | `linux_level` |
| 5 | Do you have access to robotics hardware? | No hardware access / Arduino/microcontrollers only / Robot arm or mobile robot / Humanoid robot / Simulation only | `hardware_access` |
| 6 | What is your experience with 3D simulation tools? | None / Basic (viewed simulations) / Intermediate (modified existing) / Advanced (created from scratch) | `simulation_level` |
| 7 | Have you worked with machine learning or AI before? | No / Completed tutorials/courses / Built personal projects / Professional experience | `ml_experience` |
| 8 | What is your primary learning goal? | Career transition to robotics / Academic research / Hobby/personal interest / Enhance current robotics role / Building a specific project | `learning_goal` |
| 9 | How much time can you dedicate weekly? | < 5 hours / 5-10 hours / 10-20 hours / 20+ hours | `weekly_hours` |
| 10 | Preferred content language? | English / Urdu / Both (show toggle) | `preferred_language` |

### A.2 Personalization Mapping Table

Based on user responses, content is adapted as follows:

| User Profile | Content Adaptation |
|--------------|-------------------|
| `programming_level: None` | Show "Programming Fundamentals Primer" prerequisite before Module 1; include Python syntax explanations inline |
| `programming_level: Beginner` | Show condensed Python refresher; highlight syntax in code blocks with additional comments |
| `languages: []` does not include Python | Show "Python for Roboticists" quick-start guide before first code lab |
| `ros_experience: Never heard of it` OR `Heard of it but never used` | Show extended ROS 2 conceptual introduction in Module 1; include analogy-based explanations |
| `ros_experience: Used ROS 1` | Show "ROS 1 to ROS 2 Migration" callout boxes highlighting key differences |
| `linux_level: None` | Show "Linux Essentials for Robotics" prerequisite; include full terminal command explanations |
| `hardware_access: No hardware access` OR `Simulation only` | Emphasize simulation-first approach; hide hardware-specific optional sections by default |
| `hardware_access:` includes physical hardware | Show hardware setup guides; include calibration and safety checklists |
| `simulation_level: None` | Show extended Gazebo/Unity introduction with step-by-step first simulation |
| `ml_experience: No` | Show "AI/ML Fundamentals" primer before Module 3 and Module 4 |
| `learning_goal: Career transition` | Show career-oriented callouts: industry applications, portfolio tips, interview prep notes |
| `learning_goal: Academic research` | Show research-oriented callouts: paper references, experimental methodology notes, citation guidance |
| `weekly_hours: < 5 hours` | Suggest "Essential Path" (core content only); mark optional deep-dives clearly |
| `weekly_hours: 20+ hours` | Suggest "Comprehensive Path" including all optional sections and bonus exercises |

### A.3 Personalization vs. Translation Order (Revised)

**Rule:** Personalization is applied **before** translation.

**Simplified translation scope:** To avoid combinatorial explosion:
1. **Core path only:** Urdu translations are required only for the "Intermediate" personalization variant (default path).
2. **Primers as separate pages:** Beginner primers (Python, Linux, etc.) are standalone pages with their own Urdu translations, not inline variants.
3. **Machine translation fallback:** Advanced-only callouts may use machine translation with a visible badge: "🤖 Auto-translated".

**Translation correction metric (clarified):**
- A "correction" = any change to meaning, technical accuracy, or grammar (not stylistic preference).
- Threshold: ≤ 5 corrections per 1,000 words in human review.
- Tracked in Crowdin issue log with category tags.

**Workflow:**
1. User requests a chapter.
2. Backend retrieves user's personalization profile from Neon Postgres.
3. Content variant is selected/assembled based on profile (e.g., include Python primer, hide hardware sections).
4. If user's `preferred_language` is Urdu OR user clicks "Translate to Urdu":
   - Personalized content is matched to pre-translated Urdu variants where available.
   - For dynamically assembled content (e.g., inserted primers), fallback to machine translation with a notice: "This section was auto-translated and may contain errors."
5. Rendered page is returned.

**Implication:** Core chapters must have Urdu translations for all personalization variants (beginner, intermediate, advanced paths). This is tracked in the translation status dashboard.

### A.4 Data Storage Schema (Neon Postgres)

```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_provider_id VARCHAR(255) UNIQUE NOT NULL,  -- Better-Auth user ID
    programming_level VARCHAR(50),
    languages TEXT[],  -- Array of language strings
    ros_experience VARCHAR(50),
    linux_level VARCHAR(50),
    hardware_access VARCHAR(50),
    simulation_level VARCHAR(50),
    ml_experience VARCHAR(50),
    learning_goal VARCHAR(100),
    weekly_hours VARCHAR(20),
    preferred_language VARCHAR(10) DEFAULT 'en',
    personalization_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    consent_given_at TIMESTAMP,
    data_retention_until TIMESTAMP  -- Set to created_at + 2 years by default
);

-- Index for fast lookups
CREATE INDEX idx_user_profiles_auth_id ON user_profiles(auth_provider_id);
```

### A.5 User Rights Implementation

| Right | Implementation |
|-------|----------------|
| **View data** | GET `/api/user/profile` returns full profile JSON |
| **Modify data** | PATCH `/api/user/profile` updates any field |
| **Export data** | GET `/api/user/export` returns profile + activity log as JSON download |
| **Delete data** | DELETE `/api/user/profile` removes all user data within 24 hours; confirmation email sent |
| **Disable personalization** | PATCH `/api/user/profile` with `personalization_enabled: false`; content reverts to default |

---

*End of Constitution*