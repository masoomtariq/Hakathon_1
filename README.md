# Physical AI & Humanoid Robotics — Interactive Docusaurus Book


A modern, open-source educational textbook for learning robotics, AI, and physical systems.

## Quick Start

### Prerequisites

- Node.js 18+ or npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/masoomtariq/Hakathon_1.git
cd Hakathon_1

# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000`.

### Build & Deploy

```bash
# Build for production
npm run build

# Serve production build locally
npm serve

# Deploy to GitHub Pages (automatic via GitHub Actions)
git commit -m "Content update [deploy]"
git push origin main
```

**Note:** Deployments are triggered by commit messages containing `[deploy]` or `[build]` tags.

## Project Structure

```
Hakathon_1/
├── docs/                    # Markdown documentation
│   ├── intro.md
│   ├── ros-2/              # ROS 2 module
│   ├── gazebo-unity/       # Gazebo & Unity module
│   ├── isaac/              # NVIDIA Isaac module
│   ├── vla/                # Vision Language Models module
│   └── capstone/           # Capstone project module
├── src/                    # TypeScript React components
│   ├── components/
│   │   ├── ChatWidget/     # Chatbot UI (placeholder)
│   │   └── ...
│   ├── css/                # Global styles & theme
│   └── pages/              # Homepage & custom pages
├── static/
│   ├── fonts/              # Self-hosted web fonts
│   └── img/                # Images & logos
├── i18n/                   # Internationalization
│   └── ur/                 # Urdu translations
├── docusaurus.config.ts    # Docusaurus configuration
├── sidebars.ts             # Navigation structure
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Features

### 📚 Five Core Modules

1. **ROS 2 Fundamentals** — Robot Operating System 2
2. **Gazebo & Unity Simulation** — Physics simulation & visualization
3. **NVIDIA Isaac Robotics** — Digital twins & hardware acceleration
4. **Vision Language Models** — Multimodal AI for robotics
5. **Capstone Project** — Integration & application

### 🌐 Internationalization

- **English** — Default language (LTR)
- **Urdu** — Full translations with RTL support

Switch languages via the header dropdown.

### 🔍 Search

Press `Ctrl+K` (or `Cmd+K` on Mac) to open the local search function. Supports searching in both English and Urdu.

### 💬 AI Assistant

Floating chat widget (bottom-right) for asking questions about course content. Currently a placeholder; RAG integration coming in Phase 2.

### 🎨 Theme

- **Dark mode (default)** — Optimized for long study sessions
- **Light mode** — Alternative for bright environments
- Preference persisted in browser

### ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support
- High contrast colors

### 🚀 Performance

- Lighthouse score ≥ 90
- Fast page loads with optimized fonts
- Responsive design (mobile-first)

## Font Management

### Self-Hosted Fonts

The project uses self-hosted web fonts for privacy and reliability:

- **Inter** (variable) — UI & body text
- **JetBrains Mono** — Code blocks
- **Noto Nastaliq Urdu** — Urdu text (lazy-loaded)

All fonts are included in `static/fonts/` with SIL OFL licenses documented in `LICENSES/fonts.md`.

### CDN Fallback (Development Only)

For quick demos, fonts can be loaded from Google Fonts (see CSS comments). **Production deployments use self-hosted fonts only.**

## Development

### TypeScript Configuration

Strict type checking enabled. Run:

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Adding Content

1. Create a new `.md` file in `docs/`
2. Add frontmatter with metadata:
   ```yaml
   ---
   chapter_id: unique-id
   difficulty: Beginner | Intermediate | Advanced
   duration: "45 minutes"
   prerequisites: ["chapter-id-1", "chapter-id-2"]
   tags: [tag1, tag2]
   ---
   ```
3. Update sidebar structure in `sidebars.ts`

### Translating to Urdu

1. Create corresponding file in `i18n/ur/docusaurus-plugin-content-docs/current/`
2. Translate content while preserving code blocks and LaTeX
3. Use `.urdu` CSS class for Urdu-specific styling

## Deployment

### GitHub Pages Configuration

The project is configured to deploy to `masoomtariq.github.io/Hakathon_1` via GitHub Actions.

**Deployment Trigger:**
- Push to `main` branch with commit message containing `[deploy]` or `[build]`

**Build Failure Handling:**
- If current build fails, the last successful build is deployed
- Notification sent via GitHub Actions logs

**Workflow File:** `.github/workflows/deploy-on-commit.yml`

## Configuration

### `docusaurus.config.ts`

Key settings:

```typescript
baseUrl: '/Hakathon_1/',
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'ur'],
},
```

### `sidebars.ts`

Define documentation structure with nested chapters and sections.

### `src/css/custom.css`

Theme colors, fonts, and CSS variables for dark/light modes.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-contribution`)
3. Make your changes
4. Commit with clear messages (use `[deploy]` for publishing)
5. Push and create a Pull Request

## License

Content & code: MIT  
Fonts: SIL Open Font License (OFL 1.1)

See `LICENSE` and `LICENSES/fonts.md` for details.

## Support

- 📖 [Docusaurus Documentation](https://docusaurus.io/)
- 🤖 [ROS 2 Documentation](https://docs.ros.org/en/humble/)
- 🎮 [Gazebo Documentation](https://gazebosim.org/)
- 🚀 [NVIDIA Isaac Documentation](https://docs.omniverse.nvidia.com/isaac/)

## Contact

**Maintainer:** Masoom Tariq  
**GitHub:** [@masoomtariq](https://github.com/masoomtariq)

---

**Last Updated:** February 2026