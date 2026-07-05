import PortalTypes "../types/portal";
import List "mo:core/List";
import PortalLib "../lib/portal";

mixin (
  projects : List.List<PortalTypes.Project>,
  comments : List.List<PortalTypes.ProjectComment>,
  portalState : { var nextProjectId : Nat; var nextCommentId : Nat }
) {
  public shared func createProject(
    clientId : Principal,
    title : Text,
    description : Text,
    status : PortalTypes.ProjectStatus
  ) : async PortalTypes.ProjectPublic {
    PortalLib.createProject(projects, portalState, clientId, title, description, status);
  };

  public shared func updateProjectStatus(
    projectId : Nat,
    status : PortalTypes.ProjectStatus
  ) : async Bool {
    PortalLib.updateProjectStatus(projects, projectId, status);
  };

  public query func getProjects() : async [PortalTypes.ProjectPublic] {
    PortalLib.getAllProjects(projects);
  };

  public query func getClientProjects(clientId : Principal) : async [PortalTypes.ProjectPublic] {
    PortalLib.getClientProjects(projects, clientId);
  };

  public shared func addClientComment(
    projectId : Nat,
    clientId : Principal,
    commentType : PortalTypes.CommentType,
    content : Text
  ) : async PortalTypes.ProjectComment {
    PortalLib.addComment(comments, portalState, projectId, clientId, commentType, content);
  };

  public query func getProjectComments(projectId : Nat) : async [PortalTypes.ProjectComment] {
    PortalLib.getProjectComments(comments, projectId);
  };
};
