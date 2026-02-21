import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ValidationRequest {
    benefitSchemeName: string;
    employeeId: string;
    requestedAmount: bigint;
    timestamp: bigint;
}
export interface BenefitScheme {
    name: string;
    salaryRangeMax: bigint;
    salaryRangeMin: bigint;
    eligibilityDepartment: string;
    eligibilityDesignation: string;
    benefitType: string;
}
export interface EmployeeRecord {
    status: string;
    salary: bigint;
    name: string;
    designation: string;
    date_of_joining: string;
    email: string;
    phone: string;
    department: string;
    location: string;
    employee_id: string;
}
export interface ValidationResponse {
    isEligible: boolean;
    message: string;
    approvedAmount: bigint;
    reason?: string;
}
export interface backendInterface {
    addBenefitScheme(scheme: BenefitScheme): Promise<void>;
    addEmployee(employee: EmployeeRecord): Promise<void>;
    getBenefitScheme(schemeName: string): Promise<BenefitScheme | null>;
    getEmployee(employeeId: string): Promise<EmployeeRecord | null>;
    validateEligibility(request: ValidationRequest): Promise<ValidationResponse>;
}
