# Product Requirements Document (PRD)

## Project Title
Physical AI & Humanoid Robotics — Docusaurus Book with Embedded RAG Chatbot

## One‑Line Summary
A published Docusaurus textbook on Physical AI & Humanoid Robotics deployed to GitHub Pages with a personalized learning experience (signup/signin via Better‑Auth), an integrated RAG (Retrieval‑Augmented Generation) chatbot that answers questions about the book (including using user‑selected text only), per‑chapter personalization and one‑click Urdu translation, and a modern, reproducible backend stack (FastAPI, OpenAI Agents/ChatKit SDKs, Neon Serverless Postgres, Qdrant Cloud Free Tier).

---

## Objectives & Goals
- **Primary goal:** Deliver a self‑hosted, production‑quality educational textbook with an integrated intelligent assistant that helps learners interact with content and learn faster.
- **Secondary goals:**
  - Support user personalization by collecting software & hardware background at signup.
  - Allow logged users to translate chapter content to Urdu with a single button.
  - Provide a RAG chatbot that can answer using the whole book or strictly from **user‑selected text** when requested.
  - Ensure the system is free‑tier friendly and reproducible (developer docs, infra as code, CI/CD pipeline for GitHub Pages).

---

## Key Stakeholders
- **Product owner:** Masoom Tariq (student/instructor).
- **Students / Learners:** Undergraduate/graduate CS students taking the Physical AI course.
- **Authors / Instructors:** Technical writers and instructors of the course material.
- **Developers:** Fullstack devs implementing the Docusaurus site, backend, chatbot, and infra.
- **DevOps / Maintainers:** Person(s) responsible for CI/CD, repo, and cloud resources.

---

## Target Users & Personas
1. **CS Student (Beginner in Robotics)**
   - Wants guided explanations, translations, and easy Q&A referencing the chapters.
2. **CS Student (Hardware/Embedded Background)**
   - Prefers more hardware-focused examples and code snippets; benefits from personalization to surface relevant modules.
3. **Instructor / TA**
   - Uses the book as course material, highlights, and expects citation/answer fidelity.
4. **Researcher / Advanced Student**
   - Wants deep links to simulation APIs (ROS2, Isaac), downloadable code, and reproducible experiments.

---

## High‑Level Features
1. **Docusaurus Book**
   - Structured chapters and modules matching the Course Details (ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, Capstone).
   - Per‑chapter metadata: difficulty, prerequisites, duration, code repo links, exercises.
2. **Authentication (Better‑Auth)**
   - Signup & Signin flows integrated via Better‑Auth.
   - During signup: ask concise background questions (software languages, years of programming, experience with ROS, simulation, ML/LLMs, hardware familiarity, primary OS/hardware available).
   - Persist user profile in Neon Serverless Postgres.
3. **Personalization Engine**
   - Tailors which sections/highlights/reading paths appear by default depending on the user profile.
   - Suggested exercises and learning paths per user.
4. **RAG Chatbot (Embedded)**
   - UI: Using the OpenAI chatkit, widget embedded in the Docusaurus site (floating chat bubble and chapter‑scoped assistant).
   - Backend: FastAPI endpoints to handle ingestion, retrieval, and agent orchestration.
   - Vector DB: Qdrant Cloud Free Tier; Document store: Neon Serverless Postgres for user profiles, annotations, and access logs.
   - LLM orchestration: LangChain to run RAG and planning steps; local prompt templates for domain specificity.
   - Feature: **Answer from selected text only** — when the user highlights text and requests 'Answer from selection', the system restricts retrieval/citation to that selection and returns answers with citations to the exact selection.
5. **Per‑chapter Urdu Translation**
   - A one‑click button at chapter start that renders a translated version of the chapter into Urdu (client‑side or server‑backed translation depending on choice) while preserving code blocks and LaTeX.
   - Maintain English original as togglable.
6. **CI/CD & Deployment**
   - GitHub Pages deployment of Docusaurus site.
   - Backend hosted on a small container/Serverless platform or VPS (instructions for a free/low cost flow) and infra defined in IaC (Terraform or GitHub Actions workflows).
7. **Privacy, Security & Access Control**
   - Users’ PII stored securely in Neon Postgres with encryption at rest (cloud provider default) and access controls.
   - Chat logs, selected text, and embeddings stored and GDPR‑aware (ability to delete user data on request).
8. **Monitoring & Analytics**
   - Basic telemetry: active users, chat queries, questions answered from selections, translation clicks, error rates.

---

## Detailed Functional Requirements
### A. Docusaurus Book
- FR‑A1: Chapters representing modules (ROS 2, Gazebo/Unity, Isaac, VLA, Capstone).
- FR‑A2: Each chapter page includes: a ‘Personalize’ button, ‘Translate to Urdu’ button, code examples (downloadable), figures, and a floating chat bubble.
- FR‑A3: Client side supports highlight selection and a context menu action: “Ask assistant about this selection”.

### B. Authentication & Profile
- FR‑B1: Integrate Better‑Auth SDK for signup/signin.
- FR‑B2: Collect profile attributes at signup: programming languages, years experience, ROS experience, simulation experience, ML/LLM familiarity, hardware (GPU? Jetson? PC?), preferred language.
- FR‑B3: Store user profile in Neon Postgres and return a JWT for session management.

### C. Personalization
- FR‑C1: Based on stored profile, mark recommended chapters and show customized intro blurbs.
- FR‑C2: Allow users to update profile in account settings; changes update personalization immediately.

### D. RAG Chatbot
- FR‑D1: Ingest: Book content must be chunked and indexed into Qdrant with metadata (chapter id, section id, original HTML/text, anchor links).
- FR‑D2: Retrieval: Chatbot should query Qdrant and retrieve top‑K passages for context.
- FR‑D3: Generation: Use LangChain to run RAG: supply retrieved passages + user query to the LLM; return structured reply with inline citations referencing chapter/section anchors.
- FR‑D4: Selection Mode: When user selects text and requests answer-from-selection, retrieval must be disabled and the LLM only fed that selected text as the knowledge source.
- FR‑D5: Citation: Every assistant answer must include a citation to the chapter & an anchor link (if available). A confidence score / source list should be shown.
- FR‑D6: Safety: Do not allow hallucinated references — if LLM is unsure, respond “I don’t know” and offer to show relevant passages.

### E. Translation
- FR‑E1: ‘Translate to Urdu’ button uses a translation service or OpenAI translation model; code and LaTeX must remain unmodified.
- FR‑E2: Translations cached per chapter to reduce cost; allow users to suggest corrections (crowd edit or report translation issue).

### F. Admin & Authoring
- FR‑F1: CLI/tooling for authors to push new content: `npm run build`, `npm run deploy`, and a pipeline that auto‑indexes content to Qdrant on publish.
- FR‑F2: Admin UI for reindexing, viewing embeddings, forcing cache refresh.

---

## Non‑Functional Requirements
- NFR‑1: Availability — site should be available 99% for the course duration (given GitHub Pages static front end and small backend SLAs).
- NFR‑2: Performance — chatbot response latency (retrieval + LLM) target: < 4s for cached queries; cold queries may be higher.
- NFR‑3: Scalability — design supports growth from a few hundred to several thousand learners (ensure Qdrant/Neon plan notes).
- NFR‑4: Security — follow OWASP best practices for web apps and secure storage for tokens; secrets stored in GitHub Secrets.
- NFR‑5: Cost Efficiency — prioritize free‑tier and low‑cost choices (Qdrant free tier, Neon serverless free tier) and provide fallbacks.

---

## System Architecture (High Level)
- **Frontend (Docusaurus):** static site with React components for chat widget, personalization UI, translation toggle, and highlight capture.
- **Auth (Better‑Auth):** external provider; frontend uses their JS SDK to authenticate and receives JWT.
- **Backend (FastAPI):** endpoints for chat orchestration, indexing, user profile sync, translation API proxy, and admin actions.
- **Vector DB (Qdrant Cloud):** stores embeddings and metadata for book chunks.
- **Primary DB (Neon Serverless Postgres):** user profiles, audit logs, chat metadata, translation cache.
- **LLM Layer (OpenAI Agents/ChatKit):** orchestrates retrieval + generation; can be proxied through the FastAPI backend to inject domain prompts and guardrails.

Flow (chat request):
1. User opens chat widget or highlights text and clicks "Ask".
2. Frontend sends request to FastAPI with JWT and user context; if selection mode, attach selected text.
3. FastAPI determines retrieval approach: query Qdrant or use selected text.
4. FastAPI calls OpenAI Agents/ChatKit with retrieval results + prompt template.
5. LLM returns answer; FastAPI attaches citations and returns to frontend.
6. Frontend displays answer with anchor links and optional "show source passage" toggle.

---

## Data Model (simplified)
- **users** (Neon): id, email, name, profile_json, created_at
- **user_profiles**: user_id, languages, years_experience, ros_experience_level, simulation_experience_level, hardware_details
- **docs_chunks** (Qdrant metadata): chunk_id, chapter_id, section_id, text, html_anchor, embedding_id
- **chat_sessions**: session_id, user_id, started_at
- **chat_messages**: message_id, session_id, role, text, sources, created_at
- **translations_cache**: chapter_id, language, translated_html, last_updated

---

## API Surface (selected endpoints)
- `POST /api/auth/callback` — handle Better‑Auth token exchange (frontend direct use may be possible).
- `GET /api/profile` — returns user profile.
- `PATCH /api/profile` — update stored profile.
- `POST /api/chat/query` — main chat endpoint (body: query, mode: full|selection, selected_text?, context_chapter?).
- `POST /api/index/reindex` — admin reindexing trigger.
- `GET /api/translation/chapter/{chapter_id}?lang=ur` — fetch cached or on‑the‑fly translation.

---

## Acceptance Criteria
- AC‑1: A Docusaurus site with all course modules is live on GitHub Pages and accessible.
- AC‑2: User signup/signin works via Better‑Auth and profile data is persisted in Neon Postgres.
- AC‑3: The embedded chat widget answers factual questions about the book with citations.
- AC‑4: Selection mode works: when a user selects text and requests an answer-from-selection, responses are produced only from that selected text and include exact anchor citations.
- AC‑5: ‘Translate to Urdu’ toggles the chapter into Urdu while preserving code and math notations; translations are cached.
- AC‑6: Documentation: authoring workflow, indexing process, environment setup, and deployment steps are documented in repo README.

---

## Milestones & Suggested Timeline (Example)
> *Note: timeline is example — tailor to available resources.*
- **Week 0** — Project kickoff, tech choices, repo scaffolding (Docusaurus template).
- **Week 1–2** — Write skeleton chapters, integrate Better‑Auth signup flow, store profiles in Neon.
- **Week 3** — Build FastAPI skeleton, basic chat endpoint wired to a mock retriever.
- **Week 4** — Chunk and index book content into Qdrant; implement retrieval pipeline.
- **Week 5** — Integrate OpenAI Agents/ChatKit; wire real RAG responses with citations.
- **Week 6** — Selection mode binding (frontend highlight → backend selection-only flow).
- **Week 7** — Implement Urdu translation, caching, and UI toggle.
- **Week 8** — Authoring tooling, CI/CD, automated indexing on publish.
- **Week 9** — Testing, load checks, privacy review, docs.
- **Week 10** — Final polish and public launch.

---

## Risks & Mitigations
- **Risk:** LLM hallucinations producing false citations.
  - **Mitigation:** Force citation of retrieved passages only; if selection mode, do not query external knowledge; inject guardrail templates telling model to answer with "I don't know" when unsupported.
- **Risk:** Free tier limits (Qdrant / Neon) may be exceeded under load.
  - **Mitigation:** Document upgrade path and add rate limits; cache popular queries and translations.
- **Risk:** Translation fidelity (technical terms) — Urdu translations may be inaccurate.
  - **Mitigation:** Allow crowd corrections, flagging, and maintain an editorial translation review process.
- **Risk:** Security around 3rd‑party auth tokens.
  - **Mitigation:** Minimal storage of sensitive tokens; use provider recommended flows; secure secrets in repo settings.

---

## Quality & Testing
- Unit tests for backend functions, especially retrieval and selection mode.
- Integration tests for chat flow with mock Qdrant.
- End-to-end tests for signup → profile → personalization → chat.
- Manual QA on translation pages to verify code blocks and LaTeX retention.

---

## Metrics for Success
- Number of active learners (weekly/monthly).
- Average chat queries per user and percent of queries answered with citations.
- Time to first reply from chatbot.
- Translation usage rate and user feedback score for Urdu content.

---

## Appendix
### Signup background questions (suggested)
- Which programming languages are you comfortable with? (checkbox)
- How many years of general programming experience do you have? (0–1, 1–2, 2–4, 4+)
- Have you used ROS (ROS 1 or ROS 2)? (None / Beginner / Intermediate / Advanced)
- Have you used simulators (Gazebo/Unity/NVIDIA Isaac)? (None / Some / Experienced)
- Do you have access to hardware for robotics? (No / Raspberry Pi / Jetson / Desktop w/ GPU / Other)
- What is your preferred language? (English/Urdu/Other)

### Authoring & Indexing Checklist
1. Write chapter in markdown compatible with Docusaurus and include metadata block (chapter_id, difficulty, tags).
2. Run `npm run build` to generate static HTML.
3. Run `scripts/chunktotext` to chunk HTML into text chunks and annotate anchors.
4. Run indexing script to push embeddings to Qdrant.
5. Deploy to GitHub Pages.

---

## Next Steps (suggested)
1. Confirm tech choices (OpenAI SDK vs direct API usage; translation provider; whether translations are server‑side or client‑side).
2. Create an MVP plan that implements: Docusaurus skeleton + Better‑Auth signup + a chat widget that answers from indexed content (no selection mode).  
3. Iterate selection mode and Urdu translation in a second sprint.


*End of PRD.*

