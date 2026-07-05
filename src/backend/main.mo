import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import List "mo:core/List";
import ContactTypes "types/contact";
import ChatTypes "types/chat";
import PortalTypes "types/portal";
import ContactApi "mixins/contact-api";
import ChatApi "mixins/chat-api";
import PortalApi "mixins/portal-api";

actor {
  // Contact form state
  let contactSubmissions : List.List<ContactTypes.ContactSubmission>;
  let contactState : { var nextContactId : Nat };

  // Chat state
  let chatSessions : List.List<ChatTypes.ChatSession>;
  let chatMessages : List.List<ChatTypes.ChatMessage>;
  let chatState : { var nextSessionCounter : Nat; var nextMessageId : Nat };

  // Client portal state
  let projects : List.List<PortalTypes.Project>;
  let projectComments : List.List<PortalTypes.ProjectComment>;
  let portalState : { var nextProjectId : Nat; var nextCommentId : Nat };

  include MixinViews();
  include ContactApi(contactSubmissions, contactState);
  include ChatApi(chatSessions, chatMessages, chatState);
  include PortalApi(projects, projectComments, portalState);
};
