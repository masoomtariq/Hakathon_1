# Textbook for Physical AI & Humanoid Robotics Constitution

## Core Principles

### I. Truth-first & verifiable
All factual claims, technical instructions, and performance numbers must be verifiable with reproducible steps, links to primary sources, or runnable code/simulations.

### II. Safety & ethics by design
Prioritize safe robot behaviours, data privacy, user consent, and avoid instructions that enable unsafe or harmful real-world robot operation without appropriate safeguards.

### III. Reproducibility
Every code example, simulation, dataset, and experiment must include the exact commands, dependency pins, and data pointers needed to reproduce results.

### IV. Clarity for practitioners
Content targets learners with a Computer Science / engineering background — explanations should be succinct, unambiguous, and include worked examples and diagrams where they aid comprehension.

### V. User-centric personalization
Personalization (via signup) must improve learning — content variants, difficulty, and suggested exercises adapt to declared software/hardware background.

### VI. Open and traceable AI assistance
Any content generated or edited by AI tools must be labeled, include provenance (what tool & prompt), and link or cite sources used by the AI.

### VII. Accessibility & multilingualism
The site and core content must be accessible (screen-reader friendly, semantic HTML) and provide high-quality Urdu translations alongside English.

### VIII. Modularity & maintainability
Chapters, code, datasets, and deployment scripts must be modular and tested so future contributors can update pieces safely.

### IX. Practicality & hands-on orientation
Emphasize runnable labs and capstone outcomes (the Autonomous Humanoid simulated workflow) over purely theoretical exposition.

## Key standards (rules that apply to every artifact)

### Content & citation

Source traceability: Every non-trivial factual claim or procedure must point to one or more sources (paper, docs, repo, dataset) or include a reproducible experiment.

Citation style: Use a consistent citation format across the book (recommendation: APA for text + clickable links in the web version).

Originality: No plagiarism — any reused text or images must have explicit permission or a license; attribute and license third-party materials clearly.

AI-authorship label: If any section/paragraph/code was generated or substantially revised by an AI tool, add a short provenance note: tool name, prompt summary, and the sources the tool used.

### Code, simulations & notebooks

Pin dependencies: All code and simulation environments must provide version-pinned requirements (e.g., requirements.txt, pyproject.toml, Dockerfile) and a minimal test script that runs headless.

Reproducible environments: Provide Docker images or devcontainer / GitHub Actions workflows so readers can reproduce examples locally or in CI.

Test coverage: Key tutorials and examples must include automated smoke tests (e.g., unit/integration test that the notebook/script executes without errors).

Simulation assets license & size: All simulation models (URDFs, meshes, textures) must include a license and be sized/packaged so they are practical to host on GitHub Pages or via a small CDN.

### RAG chatbot & data

Provenance for answers: The RAG bot must provide source snippets (with clickable links or slide/section references) for every factual answer and indicate confidence.

Scope control: The bot must honor user-selected text scope: if the user selects text and asks a question, answers should be limited to that selection unless the user asks to broaden scope.

No hallucinations policy: If the system cannot find good evidence in the indexed content, it must respond with “I don’t know / insufficient evidence” and optionally offer suggested search terms.

Indexing hygiene: Only index the book’s approved content; do not index private user data or unrelated repositories. Keep an index update log and retention policy for embeddings.

## Security, privacy & auth

Minimal data collection: Ask only necessary background questions at signup (software/hardware experience) and store only what’s needed for personalization.

Clear consent & privacy notice: At signup show a concise privacy summary (what is stored, why, retention, how to delete).

Secure secrets & keys: All API keys (OpenAI, Qdrant, Neon, Better-Auth) must be stored in secrets managers; never commit keys to the repository.

Auth integration standard: Use Better-Auth for signup/signin. Personalization data mapping must be auditable and revocable by users.

## UX & translation

One-click chapter translation: The “Translate to Urdu” button must translate the chapter content with quality control: machine translation + human proofreading notes (if available).

Personalization toggle: Logged users see a personalization toggle at start of each chapter; default is non-personalized until user agrees.

Accessibility: Follow WCAG 2.1 AA baseline for web content (semantic headings, alt text, keyboard navigation).

## Licensing & contributions

Content license: Default recommendation: Creative Commons (e.g., CC BY-SA) for the textbook content; code examples under MIT or Apache 2.0. State license clearly in repo root.

Contribution rules: All pull requests must include an issue reference, a short description, any relevant tests, and pass CI checks before merge. Use code review and require at least one approver.

## Constraints (hard boundaries)

Deployment target: Primary web build is Docusaurus → deployed to GitHub Pages. The production site must fit within GitHub Pages constraints (single repo, static site build).

RAG infra limits: Design the RAG system to operate within free/low-cost tiers (Qdrant Cloud Free, Neon Serverless free tier). If scaling beyond free tiers is required, create a clear upgrade path and cost estimate.

Data retention & export: Personalization data retention must be ≤ 2 years by default; allow immediate export/delete upon user request. (Adjust to comply with applicable laws.)

Chapter length & structure: Each chapter should be between 1,500–6,000 words (web friendly), include at least: learning objectives, prerequisites, step-by-step lab, and 3–5 exercises.

Minimum reproducible artifacts per chapter: each technical chapter must include:

a runnable example (script, notebook, or Docker image),

dependency file with pins,

CI smoke test.

CI requirement: All merges to the main branch require passing CI (build + smoke tests + link checker).

Security/PII prohibition: Never publish raw user-declared personal identifiers (email, full name, exact location) in the public book or index them into the RAG vector store.

## Success criteria (how we measure acceptance)

### Technical & deliverable

Site deployed: Docusaurus site deployed on GitHub Pages and mirrors repository content automatically on each main branch merge.

RAG chatbot functional: The embedded chatbot answers chapter questions with source snippets and returns a provenance link for ≥ 90% of factual queries within the indexed book content.

Scope-limited QA: When user selects text and asks a question, the chatbot confines answers to that text in ≥ 95% of tests.

Auth & personalization: Signup/signin via Better-Auth works; personalization settings are stored, applied to content rendering, and can be exported/deleted by the user.

Translation toggle: The “Translate to Urdu” button provides a readable Urdu variant; a sample of chapters must pass human proofreading (native Urdu speaker) with ≤ 5% corrections.

Reproducibility tests pass: All chapter smoke tests and simulation demos run successfully in CI (no manual intervention) on a clean environment.

Capstone demonstrator: The capstone simulated workflow (voice command → LLM planner → ROS2 actions → navigation → object ID & manipulation in simulation) runs end-to-end in Isaac/Gazebo with provided scripts in the repo.

Security checks: No secrets in repo; automated secret scanning and dependency vulnerability scans are configured and pass with no critical findings.

Licensing & attribution: All third-party assets have explicit licenses and required attributions visible in the repo and book.

### Quality & educational impact

Clarity metric: Pilot group (min. 10 learners with CS background) rates clarity ≥ 4/5 on core chapters.

Exercise effectiveness: ≥ 80% of pilot learners can complete at least 3 referenced labs unaided after following instructions.

AI transparency: All AI-authored sections include provenance notes; reviewers confirm provenance present for ≥ 100% of AI-edited sections.

User trust: In user testing, the RAG chatbot responds “I don’t know” appropriately (no unsupported confident answers) in ≥ 95% of no-evidence prompts.

## Governance

Constitution supersedes all other practices; Amendments require documentation, approval, migration plan.

All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-01-26 | **Last Amended**: 2026-01-26
