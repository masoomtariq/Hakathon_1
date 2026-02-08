import React, { useState } from 'react';
import type { ChatMessage, ChatState } from './ChatWidget.types';
import styles from './styles.module.css';

export const ChatWidget: React.FC = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isOpen: false,
    isLoading: false,
  });
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    setInput('');

    // Simulate assistant response (placeholder)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a placeholder response. The RAG chatbot will be integrated in the next phase.',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    }, 500);
  };

  return (
    <>
      <button
        className={styles.bubble}
        onClick={toggleChat}
        aria-label="Open chat assistant"
        title="Chat Assistant"
      >
        💬
      </button>

      {state.isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <h3>Learning Assistant</h3>
            <button
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {state.messages.length === 0 && (
              <div className={styles.placeholder}>
                <p>👋 Hi! I'm your learning assistant.</p>
                <p>Ask me questions about the content, and I'll help you understand better.</p>
              </div>
            )}
            {state.messages.map(msg => (
              <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
                <div className={styles.content}>{msg.content}</div>
                {msg.citations && (
                  <div className={styles.citations}>
                    {msg.citations.map((cite, idx) => (
                      <a key={idx} href={cite.url} className={styles.citation}>
                        📖 {cite.chapter}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {state.isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.loading}>Thinking...</div>
              </div>
            )}
          </div>

          <form className={styles.input} onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={state.isLoading}
            />
            <button type="submit" disabled={state.isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
