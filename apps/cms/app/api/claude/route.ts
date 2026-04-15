import { NextRequest, NextResponse } from "next/server";

const CHAR_LIMITS: Record<string, number> = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
  facebook: 63206,
  tiktok: 2200,
};

// ── Mock fallbacks ────────────────────────────────────────────────────────────

function mockAdapt(content: string, platforms: string[]) {
  const adapted: Record<string, string> = {};
  for (const p of platforms) {
    if (p === "twitter") {
      const base = content.slice(0, 240);
      adapted[p] = base + " #Edinburgh #NightLife";
    } else if (p === "linkedin") {
      adapted[p] =
        `Exciting news from Rob Roy & Konfusion:\n\n${content}\n\nWe'd love to see you join us. Follow our page for more updates.`;
    } else if (p === "tiktok") {
      adapted[p] =
        `${content.slice(0, 150)} 🎉✨ #fyp #nightlife #Edinburgh #viral`;
    } else if (p === "instagram") {
      adapted[p] =
        `${content}\n\n📍 Edinburgh City Centre\n💬 Tag a friend who needs to see this!\n\n#Edinburgh #NightLife #RobRoy #Konfusion #ScottishNightlife`;
    } else {
      adapted[p] = content;
    }
    // Respect char limits
    if (adapted[p].length > CHAR_LIMITS[p]) {
      adapted[p] = adapted[p].slice(0, CHAR_LIMITS[p] - 3) + "...";
    }
  }
  return adapted;
}

function mockSuggest(topic: string, tone: string) {
  return [
    {
      caption: `🎉 ${topic} — Edinburgh's most talked-about night is back! Join us for an unforgettable evening of music, drinks, and incredible vibes. Doors open 9PM.`,
      hashtags: ["#Edinburgh", "#NightLife", "#RobRoy", "#Konfusion", "#Weekend"],
      tone,
      estimatedReach: 7400,
    },
    {
      caption: `✨ This is your sign to make plans. ${topic} at Rob Roy & Konfusion — because you deserve a great night out. Limited tickets at the door.`,
      hashtags: ["#Edinburgh", "#GoOut", "#NightOut", "#Cocktails", "#DanceFloor"],
      tone,
      estimatedReach: 5900,
    },
    {
      caption: `Ready for the best ${topic.toLowerCase()} experience Edinburgh has to offer? 🔥 We've got the lineup, the cocktails, and the energy. See you there!`,
      hashtags: ["#Edinburgh", "#NightLife", "#LateNight", "#Music", "#Vibes"],
      tone,
      estimatedReach: 8200,
    },
  ];
}

function mockOptimize(text: string) {
  return {
    optimized: text
      .replace(/\./g, "! ")
      .trim()
      .slice(0, 250),
    tips: [
      "Add 2–3 relevant hashtags to increase discoverability by up to 40%",
      "Posts with emojis get 25% more engagement — consider adding one",
      "Mention a specific time or date to create urgency",
      "Ask a question to boost comments and engagement rate",
    ],
  };
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mode, content, platforms, topic, tone, text } = body;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Return mock data
    if (mode === "adapt") {
      return NextResponse.json({ adapted: mockAdapt(content, platforms) });
    }
    if (mode === "suggest") {
      return NextResponse.json({ suggestions: mockSuggest(topic, tone) });
    }
    if (mode === "optimize") {
      return NextResponse.json(mockOptimize(text));
    }
    return NextResponse.json({ error: "Unknown mode" }, { status: 400 });
  }

  // Real Claude API
  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

    let prompt = "";
    if (mode === "adapt") {
      const limits = platforms
        .map((p: string) => `${p}: ${CHAR_LIMITS[p] ?? 2000} chars`)
        .join(", ");
      prompt = `You are a social media expert. Adapt the following content for each platform, respecting their character limits (${limits}).
Return ONLY a JSON object with keys being platform names and values being the adapted text.
No markdown, no explanation — raw JSON only.

Content: """${content}"""

Platforms: ${platforms.join(", ")}`;
    } else if (mode === "suggest") {
      prompt = `You are a social media expert for a nightclub in Edinburgh called Rob Roy & Konfusion.
Generate 3 social media post ideas for the topic: "${topic}" with a ${tone} tone.
Return ONLY a JSON array of objects with shape: { caption, hashtags (array), tone, estimatedReach (number) }.
No markdown, raw JSON only.`;
    } else if (mode === "optimize") {
      prompt = `You are a social media expert. Improve the following post for maximum engagement.
Return ONLY a JSON object: { optimized: string, tips: string[] } — no markdown.

Post: """${text}"""`;
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (message.content[0] as { text: string }).text.trim();
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned);

    if (mode === "adapt") return NextResponse.json({ adapted: parsed });
    if (mode === "suggest") return NextResponse.json({ suggestions: parsed });
    if (mode === "optimize") return NextResponse.json(parsed);
  } catch (err) {
    console.error("Claude API error, falling back to mock:", err);
    // Fall through to mock
    if (mode === "adapt") {
      return NextResponse.json({ adapted: mockAdapt(content, platforms) });
    }
    if (mode === "suggest") {
      return NextResponse.json({ suggestions: mockSuggest(topic, tone) });
    }
    if (mode === "optimize") {
      return NextResponse.json(mockOptimize(text));
    }
  }

  return NextResponse.json({ error: "Unknown mode" }, { status: 400 });
}
