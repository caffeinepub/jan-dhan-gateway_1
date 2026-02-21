# Specification

## Summary
**Goal:** Reduce the CSV dataset from 2000 to approximately 500 records while maintaining the existing schema and data variety.

**Planned changes:**
- Regenerate the jan_dhan_registry_2000.csv file with approximately 500 records instead of 2000
- Preserve all existing columns: Citizen_ID, Income_Tier, Scheme_Eligibility, Scheme_Amount, Last_Claim_Date, Region_Code, Account_Status, Aadhaar_Linked, Claim_Count
- Maintain data variety across all categorical fields (income tiers, scheme types, region codes, account statuses, Aadhaar linkage, claim counts)

**User-visible outcome:** Users will work with a smaller, more manageable dataset of approximately 500 records while retaining the same data structure and variety for testing and demonstration purposes.
