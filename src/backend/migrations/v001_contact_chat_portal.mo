import List "mo:core/List";

module {
  type OldActor = {};

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    businessType : Text;
    projectDescription : Text;
    submittedAt : Int;
  };

  type SenderType = { #visitor; #team };

  type ChatMessage = {
    id : Nat;
    sessionId : Text;
    senderType : SenderType;
    content : Text;
    sentAt : Int;
  };

  type ChatSession = {
    id : Text;
    visitorName : Text;
    createdAt : Int;
    var isActive : Bool;
  };

  type ProjectStatus = { #pending; #inProgress; #review; #complete };

  type Project = {
    id : Nat;
    clientId : Principal;
    title : Text;
    description : Text;
    var status : ProjectStatus;
    createdAt : Int;
  };

  type CommentType = { #review; #request; #comment };

  type ProjectComment = {
    id : Nat;
    projectId : Nat;
    clientId : Principal;
    commentType : CommentType;
    content : Text;
    postedAt : Int;
  };

  type NewActor = {
    contactSubmissions : List.List<ContactSubmission>;
    contactState : { var nextContactId : Nat };
    chatSessions : List.List<ChatSession>;
    chatMessages : List.List<ChatMessage>;
    chatState : { var nextSessionCounter : Nat; var nextMessageId : Nat };
    projects : List.List<Project>;
    projectComments : List.List<ProjectComment>;
    portalState : { var nextProjectId : Nat; var nextCommentId : Nat };
  };

  public func migration(_old : OldActor) : NewActor {
    {
      contactSubmissions = List.empty<ContactSubmission>();
      contactState = { var nextContactId = 0 };
      chatSessions = List.empty<ChatSession>();
      chatMessages = List.empty<ChatMessage>();
      chatState = { var nextSessionCounter = 0; var nextMessageId = 0 };
      projects = List.empty<Project>();
      projectComments = List.empty<ProjectComment>();
      portalState = { var nextProjectId = 0; var nextCommentId = 0 };
    };
  };
};
