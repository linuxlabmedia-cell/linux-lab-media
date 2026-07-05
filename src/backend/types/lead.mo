module {
  public type LeadSubmission = {
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
};
