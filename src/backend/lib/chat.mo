import Time "mo:core/Time";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Types "../types/chat";

module {
  public func createSession(
    sessions : List.List<Types.ChatSession>,
    state : { var nextSessionCounter : Nat; var nextMessageId : Nat },
    visitorName : Text
  ) : Types.ChatSessionPublic {
    let id = state.nextSessionCounter.toText();
    state.nextSessionCounter += 1;
    let now = Time.now();
    let session : Types.ChatSession = {
      id;
      visitorName;
      createdAt = now;
      var isActive = true;
    };
    sessions.add(session);
    { id; visitorName; createdAt = now; isActive = true };
  };

  public func sendMessage(
    messages : List.List<Types.ChatMessage>,
    state : { var nextSessionCounter : Nat; var nextMessageId : Nat },
    sessionId : Text,
    senderType : Types.SenderType,
    content : Text
  ) : Types.ChatMessage {
    let id = state.nextMessageId;
    state.nextMessageId += 1;
    let msg : Types.ChatMessage = {
      id;
      sessionId;
      senderType;
      content;
      sentAt = Time.now();
    };
    messages.add(msg);
    msg;
  };

  public func getMessages(
    messages : List.List<Types.ChatMessage>,
    sessionId : Text
  ) : [Types.ChatMessage] {
    messages.filter(func(m : Types.ChatMessage) : Bool { m.sessionId == sessionId }).toArray();
  };

  public func getActiveSessions(sessions : List.List<Types.ChatSession>) : [Types.ChatSessionPublic] {
    sessions.map<Types.ChatSession, Types.ChatSessionPublic>(
      func(s : Types.ChatSession) : Types.ChatSessionPublic {
        { id = s.id; visitorName = s.visitorName; createdAt = s.createdAt; isActive = s.isActive };
      }
    ).toArray();
  };
};
