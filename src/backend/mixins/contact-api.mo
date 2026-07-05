import ContactTypes "../types/contact";
import List "mo:core/List";
import ContactLib "../lib/contact";

mixin (submissions : List.List<ContactTypes.ContactSubmission>, state : { var nextContactId : Nat }) {
  public shared func submitContactForm(
    name : Text,
    email : Text,
    phone : Text,
    businessType : Text,
    projectDescription : Text
  ) : async ContactTypes.ContactSubmission {
    let submission = ContactLib.submitContact(submissions, state, name, email, phone, businessType, projectDescription);
    await ContactLib.sendNotificationEmail(submission);
    submission;
  };

  public query func getContactSubmissions() : async [ContactTypes.ContactSubmission] {
    ContactLib.getAll(submissions);
  };
};
