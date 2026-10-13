---
name: Safe form tests
description: Safety boundary for tests of contact and newsletter flows.
---

Use isolated in-memory storage and mocked email delivery for automated form tests, even when the workspace has database or email configuration.

**Why:** These tests create administrators, subscribers, and contact messages. Merely setting the test environment does not guarantee production service selection is bypassed.

**How to apply:** Mock the database-loading boundary before importing routes and explicitly select test storage. Use a cookie-preserving client for CSRF tests. Never test successful sends against live services as a routine validation step.
