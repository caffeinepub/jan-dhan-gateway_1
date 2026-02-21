import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type CitizenID = Text;
  type CitizenIdHash = Blob;
  type Amount = Nat;
  type Scheme = Text;
  type RegionCode = Text;

  type EligibilityRecord = {
    incomeTier : Nat;
    schemeEligibility : Scheme;
    schemeAmount : Amount;
    lastClaimTime : Time.Time;
    regionCode : RegionCode;
    accountStatus : Bool;
    aadhaarLinked : Bool;
    claimCount : Nat;
  };

  let balance = 1_000_000;
  let systemActive = true;
  var eligible : Map.Map<CitizenIdHash, EligibilityRecord> = Map.empty<CitizenIdHash, EligibilityRecord>();
  var paid = Set.empty<CitizenIdHash>();

  func isCelebrated(_ : CitizenID) : Bool {
    true;
  };

  public shared ({ caller }) func requestMoney(_ : CitizenID) : async () {};
};
