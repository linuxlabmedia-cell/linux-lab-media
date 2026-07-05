import Time "mo:core/Time";
import List "mo:core/List";
import Types "../types/lead";
import EmailClient "mo:caffeineai-email/emailClient";
import Int "mo:core/Int";

module {
  public func submitLead(
    submissions : List.List<Types.LeadSubmission>,
    state : { var nextLeadId : Nat },
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
  ) : Types.LeadSubmission {
    let id = state.nextLeadId;
    state.nextLeadId += 1;
    let submission : Types.LeadSubmission = {
      id;
      name;
      email;
      phone;
      challenge;
      businessType;
      budgetRange;
      utmSource;
      utmMedium;
      utmCampaign;
      utmContent;
      submittedAt = Time.now();
    };
    submissions.add(submission);
    submission;
  };

  public func getAll(submissions : List.List<Types.LeadSubmission>) : [Types.LeadSubmission] {
    submissions.toArray();
  };

  public func sendNotificationEmail(submission : Types.LeadSubmission) : async () {
    let htmlBody = "<h2>New Ad Lead - Linux Lab Media</h2>"
      # "<p><strong>Name:</strong> " # submission.name # "</p>"
      # "<p><strong>Email:</strong> " # submission.email # "</p>"
      # "<p><strong>Phone:</strong> " # submission.phone # "</p>"
      # "<p><strong>Biggest Challenge:</strong> " # submission.challenge # "</p>"
      # "<p><strong>Business Type:</strong> " # submission.businessType # "</p>"
      # "<p><strong>Budget Range:</strong> " # submission.budgetRange # "</p>"
      # "<p><strong>Ad Source:</strong> " # submission.utmSource # " / " # submission.utmMedium # " / " # submission.utmCampaign # " / " # submission.utmContent # "</p>"
      # "<p><strong>Submitted At:</strong> " # submission.submittedAt.toText() # "</p>";

    let result = await EmailClient.sendServiceEmail(
      "linuxlabmedia",
      ["linuxlabmedia@gmail.com"],
      "New Ad Lead - Linux Lab Media",
      htmlBody
    );

    ignore result;
  };
};
