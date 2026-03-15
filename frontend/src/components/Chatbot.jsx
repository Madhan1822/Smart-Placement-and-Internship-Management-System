import { useState } from "react";
import axios from "axios";

const Chatbot = () => {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 Ask me anything about placements!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    try {

      const res = await axios.post(
        "https://smart-placement-and-internship.onrender.com/api/chats/chat",
        { message: input }
      );

      const botMessage = { from: "bot", text: res.data.reply };

      setMessages(prev => [...prev, botMessage]);

    } catch {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "Server error. Try again." }
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#7c3aed",
          color: "white",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 999
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999
          }}
        >

          <div
            style={{
              background: "#7c3aed",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
          >
            Placement Assistant
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.from === "user" ? "right" : "left",
                  marginBottom: "8px"
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              style={{ flex: 1, padding: "8px", border: "none" }}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask something..."
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#7c3aed",
                color: "white",
                border: "none",
                padding: "8px 12px"
              }}
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default Chatbot;