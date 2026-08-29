import { useState } from "react";

export default function AIChat({ context }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I'm your DossierFlow investigation assistant. I can analyze the current case, entities, relationships, sources, notes, and timeline. What do you want to investigate?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setInput("");

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Summarize this case",
    "What are the strongest connections?",
    "Are there gaps in the evidence?",
    "What should I investigate next?",
  ];

  return (
    <div
      style={{
        width: 360,
        height: "100%",
        background: "#fffbf7",
        borderLeft: "1px solid #E4DDD3",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #E4DDD3",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#4a332a",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
          }}
        >
          ✦
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: "#4a332a",
            }}
          >
            DOSSIERFLOW AI
          </div>

          <div
            style={{
              fontSize: 10,
              color: "#8a8179",
              marginTop: 2,
              fontFamily: "monospace",
            }}
          >
            CASE-AWARE INVESTIGATOR
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 14,
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                maxWidth: "88%",
                padding: "10px 12px",
                borderRadius: 8,
                background:
                  message.role === "user" ? "#4a332a" : "#f2ece5",
                color: message.role === "user" ? "#fff" : "#4a332a",
                fontSize: 12.5,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              fontSize: 12,
              color: "#8a8179",
              padding: 8,
            }}
          >
            AI is analyzing the case…
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div
        style={{
          padding: "0 12px 8px",
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setInput(suggestion)}
            style={{
              border: "1px solid #D5CCC0",
              background: "#FAF7F2",
              borderRadius: 5,
              padding: "5px 7px",
              fontSize: 10,
              cursor: "pointer",
              color: "#4a332a",
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #E4DDD3",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                askAI();
              }
            }}
            placeholder="Ask about this investigation…"
            rows={2}
            style={{
              flex: 1,
              resize: "none",
              border: "1px solid #D5CCC0",
              borderRadius: 6,
              padding: 9,
              fontFamily: "inherit",
              fontSize: 12,
              outline: "none",
              background: "#fff",
            }}
          />

          <button
            onClick={askAI}
            disabled={loading}
            style={{
              width: 42,
              border: "none",
              borderRadius: 6,
              background: "#4a332a",
              color: "#fff",
              cursor: loading ? "wait" : "pointer",
              fontSize: 16,
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}