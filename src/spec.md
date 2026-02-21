# Specification

## Summary
**Goal:** Generate a CSV dataset with 2000 synthetic records matching the jan_dhan_registry_advanced schema and make it downloadable from the application.

**Planned changes:**
- Generate a CSV file with 2000 synthetic records containing columns: Citizen_ID (12-digit), Income_Tier, Scheme_Eligibility, Scheme_Amount, Last_Claim_Date (DD-MM-YYYY), Region_Code, Account_Status, Aadhaar_Linked, and Claim_Count
- Include data variety with different income tiers, multiple scheme types (Pension, Health, Education), various region codes, Active/Inactive accounts, TRUE/FALSE Aadhaar linkage, and claim counts from 0 to 5
- Place the generated CSV file in frontend/public/assets/ directory as jan_dhan_registry_2000.csv
- Add a visible download link or button in the application UI to allow users to download the dataset

**User-visible outcome:** Users can download a CSV file containing 2000 synthetic Jan Dhan registry records directly from the application interface.
