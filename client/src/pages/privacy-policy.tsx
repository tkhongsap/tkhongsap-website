import { Link } from "wouter";
import PolicyLayout, { PolicySection } from "@/components/policy-layout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" path="/privacy-policy" description="Privacy notice for tkhongsap.io and Totrakool Khongsap’s internal BNIC connector evaluation, including separate website, BNIC and Microsoft responsibilities.">
      <PolicySection id="scope-operator" title="Scope and responsible operator">
        <p>Totrakool (Ta) Khongsap, using the name tkhongsap, operates the personal website tkhongsap.io. This notice covers the website and his use of the BNIC test connector for an internal, read-only user acceptance testing (UAT) evaluation.</p>
        <p>Ta configures and evaluates the test connector; he is not identified as the owner or operator of BNIC’s underlying server or database. This notice is not issued on behalf of BNIC or Microsoft and does not replace their policies or internal requirements.</p>
      </PolicySection>
      <PolicySection id="website-data" title="Website collection and purposes">
        <p>The contact form collects your name, email address and message, and stores these with a timestamp in the website’s database for handling enquiries. It does not forward submissions by email. The contact page also provides a direct email link.</p>
        <p>The newsletter feature records an email address, optional name, subscription status, confirmation and unsubscribe tokens, and timestamps to manage subscriptions and intended email delivery. Its code supports delivery, open and click tracking. Whether tracking is active in deployed email messages has not been confirmed.</p>
        <p>Unsubscribing changes the subscription status; it does not delete the stored record. Session cookies support form security. Server code records API operational logs and supports optional debug logging; these may contain submitted or returned information. Active log settings and retention remain unconfirmed.</p>
      </PolicySection>
      <PolicySection id="connector-processing" title="Internal connector evaluation">
        <p>The connector is used for authorized internal testing of read-only Redshift queries and reviewed business knowledge through Microsoft Copilot. Authentication uses OAuth, and access is limited by the authenticated account’s permissions. Microsoft Copilot receives query results when the connector is used.</p>
        <p>The public website is separate from this data flow and provides no interface for accessing or displaying BNIC query results. Do not send BNIC data, credentials or query results through this website or its contact form.</p>
        <p>BNIC’s server and database administrators are the appropriate source for information about their systems’ processing and controls. Microsoft’s Copilot-side processing is governed by the applicable Microsoft service terms and the organization’s arrangements. Ta does not control or make promises about either provider’s processing through this notice.</p>
      </PolicySection>
      <PolicySection id="third-parties" title="Website providers and analytics">
        <p>Replit hosts the website. A PostgreSQL connection is configured through the project’s database settings and is used by the website code for contact and newsletter records. The code uses a Neon-compatible database client; that library alone does not establish a separate Neon hosting contract.</p>
        <p>The contact page’s Email link opens your email application addressed to the listed Gmail address. Messages sent using that link are handled by your email provider and the destination Gmail service; this is separate from the website’s database-backed contact form.</p>
        <p>SendGrid email-delivery support is installed, but the inspected project settings contain neither the SendGrid API key nor the email-service selector needed to enable it. Development uses mock email delivery, which does not enable public newsletter subscriptions. These findings do not verify successful newsletter delivery or the settings of an earlier published build.</p>
        <p>When email delivery is not configured, new newsletter subscriptions and confirmation-email requests are unavailable and are not recorded. Existing newsletter records are retained; no email delivery is claimed.</p>
        <p>The website includes Google Analytics code, but its measurement ID is a placeholder rather than a configured analytics property. This is not evidence that all analytics collection or transfers to Google are absent. Actual deployed script behavior, analytics processing and email tracking remain unconfirmed.</p>
      </PolicySection>
      <PolicySection id="retention" title="Retention and deletion">
        <p>Retention periods and deletion procedures for website messages, newsletter records, tracking records and logs are unconfirmed. No fixed deletion period is promised.</p>
        <p>BNIC server logging, caching, retention and the exact access-revocation process are also unconfirmed. This notice does not promise that queries, results or other information are never stored, or describe Microsoft’s retention settings as verified. These details must be obtained from the relevant BNIC administrators and Microsoft service documentation or administrators.</p>
      </PolicySection>
      <PolicySection id="security" title="Security">
        <p>The website uses session cookies and request-verification tokens to protect form submissions. The connector uses OAuth and the authenticated account’s permissions. These controls do not guarantee security; no independent audit of BNIC or Microsoft systems is represented by this notice.</p>
      </PolicySection>
      <PolicySection id="requests-revocation" title="Privacy requests and access revocation">
        <p>Use the <Link href="/contact">contact page</Link> for website enquiries, privacy requests or questions about Ta’s connector evaluation. For direct email, use its Email link; the form stores messages on the website rather than sending email. Include only the information needed to describe your request, not BNIC data or credentials.</p>
        <p>For access to BNIC systems or revocation of connector permissions, consult the responsible BNIC or Microsoft administrator. The exact procedure has not been confirmed. Contacting Ta does not itself revoke access or delete data held by BNIC or Microsoft. No response deadline or unverified deletion process is promised.</p>
      </PolicySection>
      <PolicySection id="privacy-review" title="Limits and related terms">
        <p>This notice distinguishes verified website behavior, owner-confirmed evaluation practices and the unknowns identified above. It does not certify Microsoft connector acceptance, legal compliance or successful Copilot retrieval. Read the accompanying <Link href="/terms-of-use">Terms of Use</Link>.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
