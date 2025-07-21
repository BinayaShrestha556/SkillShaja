import { generateContent } from "@/lib/ai";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return new Response(JSON.stringify({ error: "Invalid message" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Simulate AI response
    const reply = await generateContent(message);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
