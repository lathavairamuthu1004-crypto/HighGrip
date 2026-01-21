import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./FloatingChat.css";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && user) {
      // Load previous messages for this user
      fetch(`http://localhost:5000/support/history/${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          console.log("Messages loaded:", data);
          if (Array.isArray(data)) {
            const formattedMessages = data.map((msg, idx) => ({
              id: msg._id || idx,
              text: msg.message,
              sender: msg.userName === user.name ? "user" : "admin",
              reply: msg.reply || null,
              timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));
            setMessages(formattedMessages);
            // Scroll to bottom after loading
            setTimeout(() => scrollToBottom(), 100);
          }
        })
        .catch(err => console.error("Failed to load messages:", err));
    }
  }, [isOpen, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to send a message");
      return;
    }

    if (!inputValue.trim()) {
      return;
    }

    const messageText = inputValue;
    setInputValue("");
    setIsLoading(true);

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      reply: null,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          message: messageText,
        }),
      });

      if (!res.ok) {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="floating-chat-container">
      {/* Chat Button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div>
              <h3>Chat with Support</h3>
              <p>We'll help you ASAP</p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <MessageCircle size={40} />
                <p>Start a conversation with our support team</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender}`}>
                    <div className="message-content">
                      <p>{msg.text}</p>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                    {msg.reply && (
                      <div className="message-reply">
                        <strong>Admin Reply:</strong>
                        <p>{msg.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              placeholder={user ? "Type your message..." : "Please login to chat"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!user || isLoading}
            />
            <button type="submit" disabled={!user || isLoading || !inputValue.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
