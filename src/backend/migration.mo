import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

module {
  type CitizenID = Text;
  type CitizenIdHash = Blob;
  type Amount = Nat;
  type Scheme = Text;
  type RegionCode = Text;

  type EligibilityRecord = {
    incomeTier : Nat;
    schemeEligibility : Scheme;
    schemeAmount : Amount;
    lastClaimTime : Int;
    regionCode : RegionCode;
    accountStatus : Bool;
    aadhaarLinked : Bool;
    claimCount : Nat;
  };

  type OldActor = {
    balance : Nat;
    eligible : Map.Map<CitizenIdHash, EligibilityRecord>;
    paid : Set.Set<CitizenIdHash>;
    systemActive : Bool;
  };

  type EmployeeRecord = {
    employee_id : Text;
    name : Text;
    email : Text;
    phone : Text;
    department : Text;
    designation : Text;
    date_of_joining : Text; // "DD-MM-YYYY"
    salary : Nat;
    location : Text;
    status : Text; // "Active" or "Inactive"
  };

  type BenefitScheme = {
    name : Text;
    eligibilityDepartment : Text;
    eligibilityDesignation : Text;
    salaryRangeMin : Nat;
    salaryRangeMax : Nat;
    benefitType : Text;
  };

  type NewActor = {
    employees : Map.Map<Text, EmployeeRecord>;
    benefitSchemes : Map.Map<Text, BenefitScheme>;
  };

  public func run(_old : OldActor) : NewActor {
    {
      employees = Map.empty<Text, EmployeeRecord>();
      benefitSchemes = Map.empty<Text, BenefitScheme>();
    };
  };
};
