import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: '伺服器尚未設定 ANTHROPIC_API_KEY' }, { status: 500 })
  }

  try {
    const { query } = await req.json()

    if (typeof query !== 'string' || !query.trim()) {
      return NextResponse.json({ error: '請輸入歌曲名稱、歌手或歌詞' }, { status: 400 })
    }

    const systemPrompt = `你是「K-pop 韓文金牌導師」，熱愛 K-pop 文化，語氣充滿活力、親切，善用追星術語（本命、回歸、世巡、直拍）。
根據使用者輸入的歌曲名稱、歌手或歌詞，嚴格僅輸出以下 JSON 格式，不得包含任何開場白、結語或 Markdown 標籤：

{
  "artist": "歌手/團體名稱",
  "title": "歌曲名稱",
  "accentColor": "HSL 三數值字串，格式如 '291 70% 60%'，依歌曲氛圍挑選一個有質感、不過度刺眼的飽和色（避免 90% 以上超高亮度）",
  "cheer": "簡短 2 句話內的歌曲/歌手應援與讚賞",
  "vocab": [
    { "word": "韓文單字", "pinyin": "羅馬拼音", "meaning": "中文意思", "example": "偶像日常/綜藝會說的韓文例句", "translation": "該例句的中文翻譯" }
  ]（共 4 個），
  "grammarTitle": "歌詞核心句型（韓文）",
  "grammarTranslation": "該句型的中文意思",
  "grammar": "解釋此句型在簽售會或跟飯友聊天時的變形與應用，2-3 句話",
  "examples": [
    { "kr": "延伸例句韓文", "pinyin": "羅馬拼音", "zh": "中文翻譯" }
  ]（共 2 個），
  "dialogue": [
    { "role": "粉絲 A", "kr": "韓文", "pinyin": "羅馬拼音", "zh": "中文翻譯" },
    { "role": "粉絲 B", "kr": "韓文", "pinyin": "羅馬拼音", "zh": "中文翻譯" }
  ]
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: query.trim() }],
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('[kpop] Anthropic request failed', { status: response.status, body: errorBody })
      return NextResponse.json({ error: '生成失敗，請稍後再試' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.find((block: { type?: string }) => block.type === 'text')?.text ?? ''
    const cleaned = text.replace(/```json|```/g, '').trim()
    let parsed: unknown
    try {
      parsed = JSON.parse(cleaned)
    } catch (error) {
      console.error('[kpop] Failed to parse Anthropic JSON', { preview: cleaned.slice(0, 300), error })
      throw error
    }

    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ error: 'AI 回傳格式錯誤，請換個關鍵字再試一次' }, { status: 500 })
  }
}
