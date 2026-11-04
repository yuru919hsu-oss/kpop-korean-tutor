# K-pop 韓文金牌導師 — 用追星學韓文的 AI 學習網站

[English](README.md) | [繁體中文](README_zh.md)

🔗 **[線上展示 / Live Demo](https://k-pop-two.vercel.app/)**

<!-- ✏️ TODO：放一張網站截圖，例如 docs/screenshot.png，再把下一行的註解拿掉 -->
<!-- ![screenshot](docs/screenshot.png) -->

輸入一首 K-pop 歌曲或歌手，AI 會即時產生這首歌的韓文學習卡：核心單字、句型解析、情境對話，還能聽韓文發音。使用 Next.js 打造，初版由 v0 產生，並串接 Anthropic API 生成內容。

> 📄 完整產品規格請見 **[spec.md](spec.md)**

---

## 🚀 主要功能

- **AI 搜尋生成學習卡**：輸入任何歌名、歌手或歌詞，即時產生學習內容。
- **熱門歌曲快速體驗**：內建 TXT、aespa、SEVENTEEN 三首歌，不需輸入即可試玩。
- **本日核心單字**：每首歌 4 個單字，含羅馬拼音、中文意思、例句與翻譯。
- **句型解析**：說明歌曲中的實用句型，並可展開更多例句。
- **對話模擬 / 角色扮演**：粉絲間的情境對話，逐句顯示並朗讀。
- **韓文發音播放**：使用瀏覽器內建語音合成（`ko-KR`）。
- **動態主題色**：每首歌有專屬的強調色與光暈。
- **響應式與無障礙**：支援手機與桌機，有 `aria-label` 並尊重 `prefers-reduced-motion`。

## 🧰 技術棧

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion · lucide-react · Anthropic API · Vercel

## 📂 專案結構

```
├── app/
│   ├── api/kpop/route.ts    # AI 生成 API（呼叫 Anthropic Messages API）
│   ├── layout.tsx           # 根版面：字型、metadata、Analytics
│   ├── page.tsx             # 主頁面：UI、互動邏輯、預設歌曲資料
│   └── globals.css          # 設計 token 與玻璃質感樣式
├── components/ui/button.tsx # shadcn/ui 按鈕
├── lib/utils.ts             # cn() 工具函式
└── spec.md                  # 產品規格書 (PRD)
```

## ⚙️ 運作方式

```
瀏覽器 ──POST /api/kpop──▶ Next.js Route Handler ──▶ Anthropic API
   ▲                              │（System Prompt 規定只回傳指定 JSON）
   └────────── 解析後的學習卡 JSON ◀┘
```

API 金鑰只存在伺服器端環境變數，不會暴露給瀏覽器。詳細的資料結構、API 規格與 Prompt 設計請見 [spec.md](spec.md)。

## 🛠️ 本機執行

### 需求
- Node.js 20 以上（✏️ TODO：確認你使用的版本）
- pnpm
- Anthropic API 金鑰

### 步驟

```bash
git clone https://github.com/yuru919hsu-oss/kpop-korean-tutor.git
cd kpop-korean-tutor
pnpm install
```

在專案根目錄建立 `.env.local`：

```
ANTHROPIC_API_KEY=你的金鑰
```

啟動開發伺服器：

```bash
pnpm dev
```

開啟 http://localhost:3000。

> ⚠️ 請勿把 `.env.local` 上傳到 GitHub（專案的 `.gitignore` 已排除 `.env*`）。

## ⚠️ 已知限制

- 內容由 AI 生成，未經母語者審核，僅供學習參考。
- 目前 API 尚未做頻率限制。
- 完整清單請見 [spec.md 第 12 節](spec.md)。

## 🙋 關於這個專案

✏️ TODO：用 2–3 句話寫你為什麼做它、你在其中做了什麼（例如 prompt 設計、修正 AI 產出的問題、串接 API）。

## 📄 授權

✏️ TODO：選擇授權（例如 MIT），並在專案根目錄加入 `LICENSE` 檔案。
