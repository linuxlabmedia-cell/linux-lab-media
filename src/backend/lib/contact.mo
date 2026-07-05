import Time "mo:core/Time";
import List "mo:core/List";
import Types "../types/contact";
import EmailClient "mo:caffeineai-email/emailClient";
import Int "mo:core/Int";

module {
  public func submitContact(
    submissions : List.List<Types.ContactSubmission>,
    state : { var nextContactId : Nat },
    name : Text,
    email : Text,
    phone : Text,
    businessType : Text,
    projectDescription : Text
  ) : Types.ContactSubmission {
    let id = state.nextContactId;
    state.nextContactId += 1;
    let submission : Types.ContactSubmission = {
      id;
      name;
      email;
      phone;
      businessType;
      projectDescription;
      submittedAt = Time.now();
    };
    submissions.add(submission);
    submission;
  };

  public func getAll(submissions : List.List<Types.ContactSubmission>) : [Types.ContactSubmission] {
    submissions.toArray();
  };

  public func sendNotificationEmail(submission : Types.ContactSubmission) : async () {
    let htmlBody = "<h2>New Consultation Request - Linux Lab Media</h2>"
      # "<p><strong>Name:</strong> " # submission.name # "</p>"
      # "<p><strong>Email:</strong> " # submission.email # "</p>"
      # "<p><strong>Phone:</strong> " # submission.phone # "</p>"
      # "<p><strong>Business Type:</strong> " # submission.businessType # "</p>"
      # "<p><strong>Project Description:</strong> " # submission.projectDescription # "</p>"
      # "<p><strong>Submitted At:</strong> " # submission.submittedAt.toText() # "</p>";

    let result = await EmailClient.sendServiceEmail(
      "linuxlabmedia",
      ["linuxlabmedia@gmail.com"],
      "New Consultation Request - Linux Lab Media",
      htmlBody
    );

    ignore result;
  };
};
