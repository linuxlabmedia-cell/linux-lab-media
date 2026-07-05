module {
  public type ProjectStatus = {
    #pending;
    #inProgress;
    #review;
    #complete;
  };

  public type Project = {
    id : Nat;
    clientId : Principal;
    title : Text;
    description : Text;
    var status : ProjectStatus;
    createdAt : Int;
  };

  public type ProjectPublic = {
    id : Nat;
    clientId : Principal;
    title : Text;
    description : Text;
    status : ProjectStatus;
    createdAt : Int;
  };

  public type CommentType = { #review; #request; #comment };

  public type ProjectComment = {
    id : Nat;
    projectId : Nat;
    clientId : Principal;
    commentType : CommentType;
    content : Text;
    postedAt : Int;
  };
};
