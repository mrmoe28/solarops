import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function PrivacyPolicyPage() {
    return (<div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to SolarOps. We respect your privacy and are committed to protecting your
                personal data. This privacy policy will inform you about how we look after your
                personal data when you visit our website and use our services, and tell you about
                your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">Identity Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>First name and last name</li>
                <li>Username or similar identifier</li>
                <li>Title and professional credentials</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Contact Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Email address</li>
                <li>Telephone numbers</li>
                <li>Business address</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Project Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Property addresses for solar projects</li>
                <li>Parcel information</li>
                <li>System design specifications</li>
                <li>Proposal details and pricing</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Technical Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Internet protocol (IP) address</li>
                <li>Browser type and version</li>
                <li>Time zone setting and location</li>
                <li>Operating system and platform</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-4">Usage Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Information about how you use our website and services</li>
                <li>Projects created and managed</li>
                <li>Features utilized</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we
                will use your personal data to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and manage your access to our services</li>
                <li>Process and complete solar project analyses</li>
                <li>Generate proposals and system designs</li>
                <li>Communicate with you about your projects</li>
                <li>Send important service updates and notifications</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We have put in place appropriate security measures to prevent your personal data
                from being accidentally lost, used or accessed in an unauthorized way, altered or
                disclosed. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
              <p className="mb-4">We may share your personal data with:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service providers who assist in operating our platform</li>
                <li>Third-party APIs for permit and parcel data (anonymized)</li>
                <li>Professional advisers including lawyers, bankers, auditors</li>
                <li>Regulatory authorities when required by law</li>
              </ul>
              <p className="mb-4">
                We require all third parties to respect the security of your personal data and to
                treat it in accordance with the law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p className="mb-4">
                We will only retain your personal data for as long as necessary to fulfill the
                purposes we collected it for, including for the purposes of satisfying any legal,
                accounting, or reporting requirements.
              </p>
              <p className="mb-4">
                Project data is retained for the duration of your account plus 90 days after account
                closure. You may request deletion of specific projects at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation
                to your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our service
                and hold certain information. You can instruct your browser to refuse all cookies or
                to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
              <p className="mb-4">
                Our service may contain links to other websites that are not operated by us. We have
                no control over and assume no responsibility for the content, privacy policies, or
                practices of any third-party sites or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
              <p className="mb-4">
                Our service is not intended for use by children under the age of 18. We do not
                knowingly collect personal information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the "Last
                updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please
                contact us at:
              </p>
              <address className="not-italic">
                SolarOps Privacy Team
                <br />
                Email: privacy@solarops.com
                <br />
                Address: [Your Company Address]
                <br />
                Phone: [Your Phone Number]
              </address>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. California Privacy Rights</h2>
              <p className="mb-4">
                If you are a California resident, you have additional rights under the California
                Consumer Privacy Act (CCPA) including the right to know what personal information we
                collect, the right to delete your information, and the right to opt-out of the sale
                of your personal information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>);
}
