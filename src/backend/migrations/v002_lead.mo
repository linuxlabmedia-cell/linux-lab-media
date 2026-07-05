import List "mo:core/List";

module {
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

  type LeadSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    challenge : Text;
    businessType : Text;
    budgetRange : Text;
    utmSource : Text;
    utmMedium : Text;
    utmCampaign : Text;
    utmContent : Text;
    submittedAt : Int;
  };

  type OldActor = {
    contactSubmissions : List.List<ContactSubmission>;
    contactState : { var nextContactId : Nat };
    chatSessions : List.List<ChatSession>;
    chatMessages : List.List<ChatMessage>;
    chatState : { var nextSessionCounter : Nat; var nextMessageId : Nat };
    projects : List.List<Project>;
    projectComments : List.List<ProjectComment>;
    portalState : { var nextProjectId : Nat; var nextCommentId : Nat };
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
    leadSubmissions : List.List<LeadSubmission>;
    leadState : { var nextLeadId : Nat };
  };

  public func migration(old : OldActor) : NewActor {
    {
      contactSubmissions = old.contactSubmissions;
      contactState = old.contactState;
      chatSessions = old.chatSessions;
      chatMessages = old.chatMessages;
      chatState = old.chatState;
      projects = old.projects;
      projectComments = old.projectComments;
      portalState = old.portalState;
      leadSubmissions = List.empty<LeadSubmission>();
      leadState = { var nextLeadId = 0 };
    };
  };
};
