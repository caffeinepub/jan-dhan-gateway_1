# Specification

## Summary
**Goal:** Transform Jan-Dhan Gateway into an Employee Benefits Gateway using the uploaded employee dataset with ~500 employee records.

**Planned changes:**
- Generate new CSV dataset file at frontend/public/assets/jan_dhan_registry_2000.csv with approximately 500 employee records (employee_id, name, email, phone, department, designation, date_of_joining, salary, location, status)
- Update backend data model in backend/main.mo to support employee registry fields instead of citizen records
- Replace Citizen_ID input with employee_id in transaction form and update scheme selection to employee-relevant benefits (Salary Advance, Medical Reimbursement, Travel Allowance)
- Update Gate 1 eligibility validation to check employee_id existence, Active status, department/designation match, and salary range for benefit types
- Update transaction history display to show employee-specific details (employee_id, name, department, designation, benefit type, status)
- Rebrand application throughout UI from "Jan-Dhan Gateway" to "Employee Benefits Gateway" with employee-focused terminology

**User-visible outcome:** Users can process employee benefit requests through a three-gate validation system, checking employee eligibility based on department, designation, status, and salary against the uploaded employee dataset of ~500 records.
