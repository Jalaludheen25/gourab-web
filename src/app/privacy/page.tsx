import { PageHero } from "@/components/sections/PageHero";
import { Prose } from "@/components/sections/Prose";
import { primaryEmail, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${site.legalName} handles the personal information you share through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy *notice.*"
        crumbs={[{ name: "Privacy", path: "/privacy" }]}
        size="compact"
      />
      <Prose>
        <p>
          This notice explains how {site.legalName} (&ldquo;Gourab&rdquo;, &ldquo;we&rdquo;) handles personal
          information shared through this website.
        </p>
        <h2>What we collect</h2>
        <p>
          When you send an enquiry we receive the details you enter: your name, email address, and optionally your
          company, phone number, project type and message. We do not use advertising trackers on this website.
        </p>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your enquiry and discuss your project.</li>
          <li>To keep a record of our correspondence with you.</li>
        </ul>
        <p>We do not sell your information or share it for marketing purposes.</p>
        <h2>Storage and retention</h2>
        <p>
          Enquiries are delivered to our team by email or through the form-handling service we use. We keep them only
          as long as needed to respond and to maintain business records.
        </p>
        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete the information you have shared by writing to{" "}
          <a href={`mailto:${primaryEmail.address}`}>{primaryEmail.address}</a>.
        </p>
        <h2>Contact</h2>
        <p>
          {site.legalName}, {site.location.city}, {site.location.country}. {site.license.authorityShort} Commercial
          Licence Nº {site.license.licenseNo}.
        </p>
      </Prose>
    </>
  );
}
