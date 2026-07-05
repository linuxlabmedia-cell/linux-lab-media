import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import List "mo:core/List";
import ContactTypes "types/contact";
import ChatTypes "types/chat";
import PortalTypes "types/portal";
import LeadTypes "types/lead";
import ContactApi "mixins/contact-api";
import ChatApi "mixins/chat-api";
import PortalApi "mixins/portal-api";
import LeadApi "mixins/lead-api";

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

  // Ad lead-gen quiz state
  let leadSubmissions : List.List<LeadTypes.LeadSubmission>;
  let leadState : { var nextLeadId : Nat };

  include MixinViews();
  include ContactApi(contactSubmissions, contactState);
  include ChatApi(chatSessions, chatMessages, chatState);
  include PortalApi(projects, projectComments, portalState);
  include LeadApi(leadSubmissions, leadState);
};
