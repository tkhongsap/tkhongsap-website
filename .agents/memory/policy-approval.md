---
name: Policy approval boundary
description: Distinguish developer metadata from confirmed connector operations when preparing legal pages.
---

The website operator is configuring the BNIC connector for an internal, read-only UAT evaluation, not acting as owner or operator of BNIC’s server or database. Cover the website and the operator’s use of the test connector while distinguishing their responsibilities.

**Why:** The owner explicitly confirmed this boundary. The connector implementation is outside this repository; website code cannot substantiate BNIC or Microsoft storage practices or connector acceptance.

The owner approved wording that explicitly retains unknown practices and describes the contact form as database-only delivery. Approval of wording is not permission to publish.

**Why:** The owner selected “Approve wording; keep unpublished” after reviewing the notices and the contact-delivery distinction.

**How to apply:** The owner confirms OAuth, access limited by the authenticated account’s permissions, authorized read-only Redshift queries and reviewed business knowledge through Microsoft Copilot; Copilot receives query results. The public website must not receive or display BNIC data, credentials or query results. Logging, caching, retention, email tracking, deletion procedures and exact revocation are unconfirmed: do not invent them or promise nothing is stored. Show revised wording and remaining unknowns for review before publication. Keep local implementation, publication and Microsoft verification distinct; do not change analytics/storage behavior as part of policy work.
