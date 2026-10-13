import { Link } from "wouter";
import PolicyLayout, { PolicySection } from "@/components/policy-layout";

export default function TermsOfUse() {
  return (
    <PolicyLayout title="Terms of Use" path="/terms-of-use" description="Terms for tkhongsap.io and authorized internal BNIC connector UAT, covering read-only access, confidentiality and separate service responsibilities.">
      <PolicySection id="terms-scope" title="Website and internal connector">
        <p>These terms cover the tkhongsap.io website operated by Totrakool (Ta) Khongsap, using the name tkhongsap, and his use of the BNIC connector for an internal, read-only user acceptance testing (UAT) evaluation.</p>
        <p>Ta configures and evaluates the connector; he is not the owner or operator of BNIC’s underlying server or database. These terms do not replace BNIC’s internal requirements, grant rights over BNIC information, or change Microsoft’s applicable service terms.</p>
      </PolicySection>
      <PolicySection id="authorized-use" title="Authorized internal use">
        <p>The evaluation is limited to authorized internal testing of read-only Redshift queries and reviewed business knowledge through Microsoft Copilot. Authentication uses OAuth, and access is limited by the authenticated account’s existing permissions. Microsoft Copilot receives query results during use.</p>
        <p>Use the connector only within that authorized scope. Do not attempt to write, update or delete source data. Access to this public website does not grant connector access, create a BNIC account or expand existing permissions.</p>
      </PolicySection>
      <PolicySection id="prohibited-use" title="Acceptable use">
        <ul className="list-disc pl-5 space-y-2">
          <li>Do not circumvent access controls or attempt to retrieve information without authorization.</li>
          <li>Do not share retrieved information with unauthorized people or services.</li>
          <li>Do not abuse the website or connector, disrupt their operation, or misuse access for unauthorized purposes.</li>
          <li>Do not submit BNIC data, credentials or query results to this public website, including through its contact form.</li>
        </ul>
      </PolicySection>
      <PolicySection id="confidentiality" title="Confidentiality">
        <p>Protect confidential information and handle it under applicable BNIC rules and existing permissions. Permission to retrieve information is not permission to disclose it elsewhere. The public website is separate from the connector and provides no interface for accessing or displaying BNIC results.</p>
      </PolicySection>
      <PolicySection id="verification" title="Independent verification of results">
        <p>Verify results against relevant sources before relying on them or making decisions. Retrieved information and AI-generated responses may be incomplete, outdated or inaccurate. Read-only access does not make results authoritative. This evaluation is not a guarantee of production readiness.</p>
      </PolicySection>
      <PolicySection id="limitations" title="Service limitations">
        <p>Website and evaluation availability, uninterrupted access, accuracy, completeness and suitability for a particular purpose are not guaranteed. Neither these pages nor the evaluation promise Microsoft approval, endorsement, legal compliance or successful connector retrieval.</p>
        <p>BNIC and Microsoft systems remain under their respective responsibilities. Ta cannot guarantee their security, availability or data handling. Server logging, caching, retention and exact revocation procedures are unconfirmed; do not assume that nothing is stored.</p>
      </PolicySection>
      <PolicySection id="suspension" title="Suspension and stopping the evaluation">
        <p>Ta may stop his participation in the evaluation or restrict use of the website for misuse, security concerns or operational reasons. Suspected misuse of BNIC or Microsoft access should be reported to the responsible administrators.</p>
        <p>Changes to BNIC or Microsoft permissions must be handled through their authorized administrators and processes. Ta’s decision to stop testing does not itself revoke those permissions or delete data. The exact access-revocation process remains unconfirmed.</p>
      </PolicySection>
      <PolicySection id="terms-contact" title="Contact, privacy, and changes">
        <p>Use the <Link href="/contact">contact page</Link> for website enquiries or questions about Ta’s evaluation. Its Email link provides direct email; its form stores messages on the website and does not forward them by email. Do not include BNIC data, credentials or results. No response deadline is promised.</p>
        <p>Read the <Link href="/privacy-policy">Privacy Policy</Link> for data-handling details and known limits. Revisions will be reflected on these pages with an updated date.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
