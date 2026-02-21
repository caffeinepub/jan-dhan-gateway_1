# Specification

## Summary
**Goal:** Build a fraud-proof benefit distribution system with hash-based identity validation, immutable ledger, three-gate verification protocol, and admin controls to prevent duplicate claims and ensure budget integrity.

**Planned changes:**
- Create backend data model for Jan-Dhan Registry with 9 fields (Citizen_ID, Income_Tier, Scheme_Eligibility, Scheme_Amount, Last_Claim_Date, Region_Code, Account_Status, Aadhaar_Linked, Claim_Count) and CSV import for ~2000 records
- Implement SHA-256 hash-based ID validator to detect duplicate claims and block replay attempts
- Build immutable hash-linked ledger recording all transactions with chain verification and tampering detection
- Implement Gate 1 (Eligibility): validate citizen exists, account active, Aadhaar linked, scheme match, and claim count ≤3
- Implement Gate 2 (Budget): enforce ₹10,00,000 INR budget with deduction on approval, rejection on insufficient balance, auto-lock at zero
- Implement Gate 3 (Frequency): block claims within 30 days of last claim date
- Create automatic system lock mechanism for tampering detection, budget exhaustion, hash mismatch, or manual pause
- Build admin kill-switch dashboard showing system status, emergency pause button, budget remaining, and transaction count
- Create transaction processing interface for submitting claims with Citizen_ID and scheme selection, displaying three-gate validation results and approval/rejection status
- Design beautiful, professional, responsive UI emphasizing security features for both transaction processing and admin dashboard

**User-visible outcome:** Users can submit benefit claims through an intuitive interface that validates eligibility, budget, and frequency in real-time. Admins can monitor system health, view remaining budget, track transactions, and emergency-pause the system. All transactions are cryptographically secured in an immutable ledger with automatic fraud detection and system lockdown.
