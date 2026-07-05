import Time "mo:core/Time";
import List "mo:core/List";
import Types "../types/portal";

module {
  public func createProject(
    projects : List.List<Types.Project>,
    state : { var nextProjectId : Nat; var nextCommentId : Nat },
    clientId : Principal,
    title : Text,
    description : Text,
    status : Types.ProjectStatus
  ) : Types.ProjectPublic {
    let id = state.nextProjectId;
    state.nextProjectId += 1;
    let now = Time.now();
    let project : Types.Project = {
      id;
      clientId;
      title;
      description;
      var status;
      createdAt = now;
    };
    projects.add(project);
    { id; clientId; title; description; status; createdAt = now };
  };

  public func updateProjectStatus(
    projects : List.List<Types.Project>,
    projectId : Nat,
    status : Types.ProjectStatus
  ) : Bool {
    var found = false;
    projects.mapInPlace(
      func(p : Types.Project) : Types.Project {
        if (p.id == projectId) {
          found := true;
          p.status := status;
          p;
        } else { p };
      }
    );
    found;
  };

  public func getClientProjects(
    projects : List.List<Types.Project>,
    clientId : Principal
  ) : [Types.ProjectPublic] {
    projects.filter(func(p : Types.Project) : Bool { p.clientId == clientId })
      .map<Types.Project, Types.ProjectPublic>(
        func(p : Types.Project) : Types.ProjectPublic {
          { id = p.id; clientId = p.clientId; title = p.title; description = p.description; status = p.status; createdAt = p.createdAt };
        }
      ).toArray();
  };

  public func getAllProjects(projects : List.List<Types.Project>) : [Types.ProjectPublic] {
    projects.map<Types.Project, Types.ProjectPublic>(
      func(p : Types.Project) : Types.ProjectPublic {
        { id = p.id; clientId = p.clientId; title = p.title; description = p.description; status = p.status; createdAt = p.createdAt };
      }
    ).toArray();
  };

  public func addComment(
    comments : List.List<Types.ProjectComment>,
    state : { var nextProjectId : Nat; var nextCommentId : Nat },
    projectId : Nat,
    clientId : Principal,
    commentType : Types.CommentType,
    content : Text
  ) : Types.ProjectComment {
    let id = state.nextCommentId;
    state.nextCommentId += 1;
    let comment : Types.ProjectComment = {
      id;
      projectId;
      clientId;
      commentType;
      content;
      postedAt = Time.now();
    };
    comments.add(comment);
    comment;
  };

  public func getProjectComments(
    comments : List.List<Types.ProjectComment>,
    projectId : Nat
  ) : [Types.ProjectComment] {
    comments.filter(func(c : Types.ProjectComment) : Bool { c.projectId == projectId }).toArray();
  };
};
