import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
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

  type ValidationRequest = {
    employeeId : Text;
    benefitSchemeName : Text;
    requestedAmount : Nat;
    timestamp : Int;
  };

  type ValidationResponse = {
    isEligible : Bool;
    message : Text;
    approvedAmount : Nat;
    reason : ?Text;
  };

  var employees : Map.Map<Text, EmployeeRecord> = Map.empty<Text, EmployeeRecord>();
  var benefitSchemes : Map.Map<Text, BenefitScheme> = Map.empty<Text, BenefitScheme>();

  public shared ({ caller }) func addEmployee(employee : EmployeeRecord) : async () {
    employees.add(employee.employee_id, employee);
  };

  public shared ({ caller }) func addBenefitScheme(scheme : BenefitScheme) : async () {
    benefitSchemes.add(scheme.name, scheme);
  };

  public shared ({ caller }) func validateEligibility(request : ValidationRequest) : async ValidationResponse {
    switch (employees.get(request.employeeId)) {
      case (null) {
        Runtime.trap("Employee with given ID does not exist");
      };
      case (?employee) {
        if (employee.status != "Active") {
          return {
            isEligible = false;
            message = "Employee is not active";
            approvedAmount = 0;
            reason = ?"Employee status is not 'Active'";
          };
        };
        switch (benefitSchemes.get(request.benefitSchemeName)) {
          case (null) {
            Runtime.trap("Requested benefit scheme does not exist");
          };
          case (?scheme) {
            if (employee.department != scheme.eligibilityDepartment) {
              return {
                isEligible = false;
                message = "Department does not match eligibility criteria";
                approvedAmount = 0;
                reason = ?("Required: " # scheme.eligibilityDepartment # ", Provided: " # employee.department);
              };
            };
            if (employee.designation != scheme.eligibilityDesignation) {
              return {
                isEligible = false;
                message = "Designation does not match eligibility criteria";
                approvedAmount = 0;
                reason = ?("Required: " # scheme.eligibilityDesignation # ", Provided: " # employee.designation);
              };
            };
            if (employee.salary < scheme.salaryRangeMin or employee.salary > scheme.salaryRangeMax) {
              return {
                isEligible = false;
                message = "Salary does not match eligibility range";
                approvedAmount = 0;
                reason = ?("Range: " # scheme.salaryRangeMin.toText() # " - " # scheme.salaryRangeMax.toText() # ", Provided: " # employee.salary.toText());
              };
            };
            {
              isEligible = true;
              message = "Employee is eligible for the benefit scheme";
              approvedAmount = request.requestedAmount;
              reason = null;
            };
          };
        };
      };
    };
  };

  public query ({ caller }) func getEmployee(employeeId : Text) : async ?EmployeeRecord {
    employees.get(employeeId);
  };

  public query ({ caller }) func getBenefitScheme(schemeName : Text) : async ?BenefitScheme {
    benefitSchemes.get(schemeName);
  };
};

