import { createActor } from "@/backend";
import type { ChatMessage, ChatSessionPublic } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, MessageSquare, RefreshCw, Send, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function formatTime(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TeamChatPage() {
  const { loginStatus, login } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const isAuthenticated = loginStatus === "success";

  const [sessions, setSessions] = useState<ChatSessionPublic[]>([]);
  const [selectedSession, setSelectedSession] =
    useState<ChatSessionPublic | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const sessionsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchSessions = useCallback(async () => {
    if (!actor) return;
    try {
      const data = await actor.getActiveChatSessions();
      setSessions(
        [...data].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)),
      );
    } catch {
      // silent
    }
  }, [actor]);

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
        // silent
      }
    },
    [actor, scrollToBottom],
  );

  useEffect(() => {
    if (!isAuthenticated || !actor) return;
    fetchSessions();
    sessionsRef.current = setInterval(fetchSessions, 5000);
    return () => {
      if (sessionsRef.current) clearInterval(sessionsRef.current);
    };
  }, [isAuthenticated, actor, fetchSessions]);

  useEffect(() => {
    if (!selectedSession || !actor) return;
    fetchMessages(selectedSession.id);
    messagesRef.current = setInterval(
      () => fetchMessages(selectedSession.id),
      3000,
    );
    return () => {
      if (messagesRef.current) clearInterval(messagesRef.current);
    };
  }, [selectedSession, actor, fetchMessages]);

  const handleSend = async () => {
    if (!actor || !selectedSession || !messageInput.trim() || sending) return;
    const content = messageInput.trim();
    setMessageInput("");
    setSending(true);
    try {
      const senderType = { team: null } as unknown as Parameters<
        typeof actor.sendChatMessage
      >[1];
      await actor.sendChatMessage(selectedSession.id, senderType, content);
      await fetchMessages(selectedSession.id);
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4"
        data-ocid="teamchat.page"
      >
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#E53935]/20 border border-[#E53935]/40 flex items-center justify-center mx-auto mb-6">
            <LogIn size={28} className="text-[#E53935]" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white mb-3">
            Team Chat Dashboard
          </h1>
          <p className="text-[#CFCFCF] mb-8 text-sm leading-relaxed">
            Log in with Internet Identity to access the team chat dashboard and
            respond to visitor messages.
          </p>
          <button
            type="button"
            onClick={login}
            className="bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
            data-ocid="teamchat.login_button"
          >
            Login with Internet Identity
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] flex flex-col"
      data-ocid="teamchat.page"
    >
      {/* Header */}
      <div className="bg-[#121212] border-b border-white/10 px-4 py-4 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#E53935]/20 flex items-center justify-center">
          <MessageSquare size={16} className="text-[#E53935]" />
        </div>
        <div>
          <h1 className="text-white font-bold font-display">Team Chat</h1>
          <p className="text-[#CFCFCF] text-xs">
            Linux Lab Media — Live Support Dashboard
          </p>
        </div>
        <button
          type="button"
          onClick={fetchSessions}
          className="ml-auto text-[#CFCFCF] hover:text-white transition-colors p-2"
          aria-label="Refresh sessions"
          data-ocid="teamchat.refresh_button"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sessions List */}
        <div
          className="w-64 lg:w-72 bg-[#121212] border-r border-white/10 flex flex-col flex-shrink-0 overflow-hidden"
          data-ocid="teamchat.sessions_panel"
        >
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-[#E53935]" />
              <span className="text-[#CFCFCF] text-xs font-semibold uppercase tracking-wider">
                Active Visitors
              </span>
              <span className="ml-auto text-[#E53935] text-xs font-bold">
                {sessions.length}
              </span>
            </div>
          </div>

          {isFetching ? (
            <div
              className="flex-1 flex items-center justify-center"
              data-ocid="teamchat.loading_state"
            >
              <p className="text-[#CFCFCF] text-xs">Loading...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2 px-4"
              data-ocid="teamchat.sessions.empty_state"
            >
              <MessageSquare size={24} className="text-[#CFCFCF]/40" />
              <p className="text-[#CFCFCF] text-xs text-center">
                No active chat sessions yet.
              </p>
            </div>
          ) : (
            <div
              className="flex-1 overflow-y-auto"
              data-ocid="teamchat.sessions_list"
            >
              {sessions.map((session, i) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => {
                    setSelectedSession(session);
                    setMessages([]);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-white/5 transition-colors ${
                    selectedSession?.id === session.id
                      ? "bg-[#E53935]/10 border-l-2 border-l-[#E53935]"
                      : "hover:bg-white/5"
                  }`}
                  data-ocid={`teamchat.session.${i + 1}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#E53935]/20 border border-[#E53935]/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#E53935] text-xs font-bold">
                        {session.visitorName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {session.visitorName}
                      </p>
                      <p className="text-[#CFCFCF] text-xs">
                        {session.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          data-ocid="teamchat.chat_panel"
        >
          {!selectedSession ? (
            <div
              className="flex-1 flex flex-col items-center justify-center gap-3"
              data-ocid="teamchat.chat.empty_state"
            >
              <MessageSquare size={32} className="text-[#CFCFCF]/30" />
              <p className="text-[#CFCFCF] text-sm">
                Select a visitor session to start responding
              </p>
            </div>
          ) : (
            <>
              {/* Session Header */}
              <div className="px-4 py-3 bg-[#121212] border-b border-white/10 flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#E53935]/20 border border-[#E53935]/30 flex items-center justify-center">
                  <span className="text-[#E53935] text-xs font-bold">
                    {selectedSession.visitorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {selectedSession.visitorName}
                  </p>
                  <p className="text-[#CFCFCF] text-xs">
                    Session #{selectedSession.id.slice(-8)}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[#CFCFCF] text-xs">Live</span>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                data-ocid="teamchat.messages_list"
              >
                {messages.length === 0 && (
                  <div
                    className="flex-1 flex items-center justify-center"
                    data-ocid="teamchat.messages.empty_state"
                  >
                    <p className="text-[#CFCFCF] text-sm">
                      No messages yet. Waiting for visitor...
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => {
                  const isTeam =
                    typeof msg.senderType === "object"
                      ? "team" in msg.senderType
                      : msg.senderType === "team";
                  return (
                    <div
                      key={String(msg.id)}
                      className={`flex flex-col gap-1 ${
                        isTeam ? "items-end" : "items-start"
                      }`}
                      data-ocid={`teamchat.message.${i + 1}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                          isTeam
                            ? "bg-[#E53935] text-white rounded-br-sm"
                            : "bg-[#1E1E1E] text-[#CFCFCF] rounded-bl-sm border border-white/5"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[#CFCFCF]/50 text-xs px-1">
                        {isTeam ? "Team" : selectedSession.visitorName} ·{" "}
                        {formatTime(msg.sentAt)}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10 bg-[#121212] flex-shrink-0">
                <input
                  type="text"
                  className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#CFCFCF] focus:outline-none focus:border-[#E53935] transition-colors min-w-0"
                  placeholder={`Reply to ${selectedSession.visitorName}...`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  data-ocid="teamchat.reply_input"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!messageInput.trim() || sending}
                  className="w-10 h-10 rounded-xl bg-[#E53935] hover:bg-[#FF3D3D] disabled:opacity-50 flex items-center justify-center text-white transition-colors flex-shrink-0"
                  aria-label="Send reply"
                  data-ocid="teamchat.send_button"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
