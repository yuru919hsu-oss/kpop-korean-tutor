# K-pop Korean Tutor — Learn Korean Through Your Favorite K-pop Songs

[English](README.md) | [繁體中文](README_zh.md)

🔗 **[Live Demo](https://k-pop-two.vercel.app/)**

<!-- ✏️ TODO: add a screenshot, e.g. docs/screenshot.png, then uncomment the next line -->
<!-- ![screenshot](docs/screenshot.png) -->

Enter a K-pop song or artist and the app generates a Korean study card on the spot: core vocabulary, a grammar spotlight, and a practice dialogue, all with Korean audio playback. Built with Next.js; the first version was generated with v0, and the content is generated through the Anthropic API. The UI is in Traditional Chinese.

> 📄 Full product spec: **[spec.md](spec.md)** (written in Traditional Chinese)

---

## 🚀 Key Features

- **AI-generated study cards:** search any song, artist, or lyric to get fresh learning content.
- **Quick-start songs:** TXT, aespa, and SEVENTEEN are built in, no typing required.
- **Core vocabulary:** 4 words per song with romanization, meaning, and an example sentence plus translation.
- **Grammar spotlight:** a practical sentence pattern with extra example sentences in a modal.
- **Dialogue practice / role-play:** a short fan-to-fan conversation revealed line by line and read aloud.
- **Korean audio playback:** uses the browser's built-in Speech Synthesis (`ko-KR`).
- **Dynamic theme colors:** each song gets its own accent color and glow.
- **Responsive and accessible:** works on mobile and desktop, uses `aria-label`s, and respects `prefers-reduced-motion`.

## 🧰 Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion · lucide-react · Anthropic API · Vercel

## 📂 Project Structure

```
├── app/
│   ├── api/kpop/route.ts    # AI generation endpoint (calls the Anthropic Messages API)
│   ├── layout.tsx           # Root layout: fonts, metadata, Analytics
│   ├── page.tsx             # Main page: UI, interaction logic, built-in song data
│   └── globals.css          # Design tokens and glassmorphism styles
├── components/ui/button.tsx # shadcn/ui button
├── lib/utils.ts             # cn() helper
└── spec.md                  # Product spec (PRD)
```

## ⚙️ How It Works

```
Browser ──POST /api/kpop──▶ Next.js Route Handler ──▶ Anthropic API
   ▲                              │ (system prompt enforces a fixed JSON shape)
   └────────── parsed study card JSON ◀┘
```

The API key lives only in a server-side environment variable and is never exposed to the browser. See [spec.md](spec.md) for the data model, API spec, and prompt design.

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ (✏️ TODO: confirm the version you use)
- pnpm
- An Anthropic API key

### Run Locally

```bash
git clone <https://github.com/yuru919hsu-oss/kpop-korean-tutor.git>
cd <kpop-korean-tutor>
pnpm install
```

Create `.env.local` in the project root:

```
ANTHROPIC_API_KEY=your_key_here
```

Start the dev server:

```bash
pnpm dev
```

Open http://localhost:3000.

> ⚠️ Never commit `.env.local` (the included `.gitignore` already excludes `.env*`).

## ⚠️ Known Limitations

- Content is AI-generated and not reviewed by a native speaker; use it as a study aid only.
- The API endpoint has no rate limiting yet.
- See [spec.md, section 12](spec.md) for the full list.

## 🙋 About This Project

✏️ TODO: 2–3 sentences on why you built it and what you did (prompt design, fixing AI output issues, API integration).

## 📄 License

✏️ TODO: choose a license (e.g. MIT) and add a `LICENSE` file at the project root.
