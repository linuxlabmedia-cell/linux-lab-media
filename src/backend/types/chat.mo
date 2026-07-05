module {
  public type SenderType = { #visitor; #team };

  public type ChatMessage = {
    id : Nat;
    sessionId : Text;
    senderType : SenderType;
    content : Text;
    sentAt : Int;
  };

  public type ChatSession = {
    id : Text;
    visitorName : Text;
    createdAt : Int;
    var isActive : Bool;
  };

  public type ChatSessionPublic = {
    id : Text;
    visitorName : Text;
    createdAt : Int;
    isActive : Bool;
  };
};
