import ChatTypes "../types/chat";
import List "mo:core/List";
import ChatLib "../lib/chat";

mixin (
  sessions : List.List<ChatTypes.ChatSession>,
  messages : List.List<ChatTypes.ChatMessage>,
  chatState : { var nextSessionCounter : Nat; var nextMessageId : Nat }
) {
  public shared func createChatSession(
    visitorName : Text
  ) : async ChatTypes.ChatSessionPublic {
    ChatLib.createSession(sessions, chatState, visitorName);
  };

  public shared func sendChatMessage(
    sessionId : Text,
    senderType : ChatTypes.SenderType,
    content : Text
  ) : async ChatTypes.ChatMessage {
    ChatLib.sendMessage(messages, chatState, sessionId, senderType, content);
  };

  public query func getChatMessages(sessionId : Text) : async [ChatTypes.ChatMessage] {
    ChatLib.getMessages(messages, sessionId);
  };

  public query func getActiveChatSessions() : async [ChatTypes.ChatSessionPublic] {
    ChatLib.getActiveSessions(sessions);
  };
};
