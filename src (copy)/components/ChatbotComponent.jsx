import { useState } from "react";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I am your assistant. Ask me anything!" },
  ]);

  const [input, setInput] = useState("");

  const getBotReply = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes("hello")) return "Hello! How can I help you?";
    if (msg.includes("product")) return "You can browse products on the home page.";
    if (msg.includes("price")) return "Prices are shown under each product.";
    if (msg.includes("buy")) return "Click 'Purchase Now' to place an order.";
    if (msg.includes("help")) return "I'm here to assist you!";

    return "Sorry, I didn't understand that 🤔";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getBotReply(input) };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">🤖 Chatbot Assistant</h3>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#0d6efd" : "#e5e5e5",
              color: msg.sender === "user" ? "white" : "black",
              padding: "8px",
              margin: "5px",
              borderRadius: "10px",
              maxWidth: "70%",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="d-flex mt-3">
        <input
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary ms-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;