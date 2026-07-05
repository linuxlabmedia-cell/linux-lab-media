import LeadTypes "../types/lead";
import List "mo:core/List";
import LeadLib "../lib/lead";

mixin (submissions : List.List<LeadTypes.LeadSubmission>, state : { var nextLeadId : Nat }) {
  public shared func submitLeadForm(
    name : Text,
    email : Text,
    phone : Text,
    challenge : Text,
    businessType : Text,
    budgetRange : Text,
    utmSource : Text,
    utmMedium : Text,
    utmCampaign : Text,
    utmContent : Text
  ) : async LeadTypes.LeadSubmission {
    let submission = LeadLib.submitLead(submissions, state, name, email, phone, challenge, businessType, budgetRange, utmSource, utmMedium, utmCampaign, utmContent);
    await LeadLib.sendNotificationEmail(submission);
    submission;
  };

  public query func getLeadSubmissions() : async [LeadTypes.LeadSubmission] {
    LeadLib.getAll(submissions);
  };
};
