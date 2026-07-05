import { createActor } from "@/backend";
import type { ChatMessage, ChatSessionPublic, SenderType } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "llm_chat_session_id";
const SESSION_NAME_KEY = "llm_chat_visitor_name";

function getStoredSession(): { id: string; name: string } | null {
  const id = localStorage.getItem(SESSION_KEY);
  const name = localStorage.getItem(SESSION_NAME_KEY);
  if (id && name) return { id, name };
  return null;
}

function storeSession(session: ChatSessionPublic) {
  localStorage.setItem(SESSION_KEY, session.id);
  localStorage.setItem(SESSION_NAME_KEY, session.visitorName);
}

export default function ChatWidget() {
  const { actor, isFetching } = useActor(createActor);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<{ id: string; name: string } | null>(
    getStoredSession,
  );
  const [nameInput, setNameInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [creating, setCreating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const fetchMessages = useCallback(
    async (sessionId: string) => {
      if (!actor) return;
      try {
        const msgs = await actor.getChatMessages(sessionId);
        setMessages(
          [...msgs].sort((a, b) => Number(a.sentAt) - Number(b.sentAt)),
        );
        scrollToBottom();
      } catch {
        // silently ignore poll errors
      }
    },
    [actor, scrollToBottom],
  );

  useEffect(() => {
    if (!open || !session || !actor) return;
    fetchMessages(session.id);
    pollRef.current = setInterval(() => fetchMessages(session.id), 3000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [open, session, actor, fetchMessages]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, scrollToBottom]);

  const handleCreateSession = async () => {
    if (!actor || !nameInput.trim() || creating) return;
    setCreating(true);
    try {
      const newSession = await actor.createChatSession(nameInput.trim());
      storeSession(newSession);
      setSession({ id: newSession.id, name: newSession.visitorName });
    } catch {
      // handle error
    } finally {
      setCreating(false);
    }
  };

  const handleSend = async () => {
    if (!actor || !session || !messageInput.trim() || sending) return;
    const content = messageInput.trim();
    setMessageInput("");
    setSending(true);
    try {
      const senderType = { visitor: null } as unknown as SenderType;
      await actor.sendChatMessage(session.id, senderType, content);
      await fetchMessages(session.id);
    } catch {
      // handle error
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreateSession();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" data-ocid="chat.widget">
      {/* Chat Panel */}
      {open && (
        <div
          className="mb-4 w-80 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "480px" }}
          data-ocid="chat.dialog"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#121212] border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-white font-semibold text-sm">
                Chat with Us
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#CFCFCF] hover:text-white transition-colors p-1"
              aria-label="Close chat"
              data-ocid="chat.close_button"
            >
              <X size={16} />
            </button>
          </div>

          {isFetching ? (
            <div className="flex-1 flex items-center justify-center">
              <div
                className="text-[#CFCFCF] text-sm"
                data-ocid="chat.loading_state"
              >
                Connecting...
              </div>
            </div>
          ) : !session ? (
            /* Name Entry Form */
            <div
              className="flex-1 flex flex-col items-center justify-center px-6 gap-4"
              data-ocid="chat.name_form"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#E53935]/20 border border-[#E53935]/40 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle size={20} className="text-[#E53935]" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">
                  Start a Conversation
                </p>
                <p className="text-[#CFCFCF] text-xs leading-relaxed">
                  Enter your name so our team can greet you properly.
                </p>
              </div>
              <input
                type="text"
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-[#CFCFCF] focus:outline-none focus:border-[#E53935] transition-colors"
                placeholder="Your name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleNameKeyDown}
                data-ocid="chat.name_input"
              />
              <button
                type="button"
                onClick={handleCreateSession}
                disabled={!nameInput.trim() || creating}
                className="w-full bg-[#E53935] hover:bg-[#FF3D3D] disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
                data-ocid="chat.start_button"
              >
                {creating ? "Starting..." : "Start Chat"}
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
                data-ocid="chat.message_list"
              >
                {messages.length === 0 && (
                  <div
                    className="flex-1 flex items-center justify-center"
                    data-ocid="chat.empty_state"
                  >
                    <p className="text-[#CFCFCF] text-xs text-center">
                      Hi {session.name}! Our team will be with you shortly.
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => {
                  const isVisitor =
                    typeof msg.senderType === "object"
                      ? "visitor" in msg.senderType
                      : msg.senderType === "visitor";
                  return (
                    <div
                      key={String(msg.id)}
                      className={`flex ${isVisitor ? "justify-end" : "justify-start"}`}
                      data-ocid={`chat.message.${i + 1}`}
                    >
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                          isVisitor
                            ? "bg-[#E53935] text-white rounded-br-sm"
                            : "bg-[#1E1E1E] text-[#CFCFCF] rounded-bl-sm border border-white/5"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10 bg-[#121212] flex-shrink-0">
                <input
                  type="text"
                  className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-[#CFCFCF] focus:outline-none focus:border-[#E53935] transition-colors min-w-0"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  data-ocid="chat.message_input"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!messageInput.trim() || sending}
                  className="w-8 h-8 rounded-lg bg-[#E53935] hover:bg-[#FF3D3D] disabled:opacity-50 flex items-center justify-center text-white transition-colors flex-shrink-0"
                  aria-label="Send message"
                  data-ocid="chat.send_button"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-[#E53935] hover:bg-[#FF3D3D] shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all duration-200"
        aria-label={open ? "Close chat" : "Open chat"}
        data-ocid="chat.toggle_button"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
