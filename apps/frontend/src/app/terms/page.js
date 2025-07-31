import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function TermsOfServicePage() {
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
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using SolarOps ("the Service"), you accept and agree to be bound by
                the terms and provision of this agreement. If you do not agree to abide by the
                above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily use SolarOps for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>modify or copy the materials;</li>
                <li>
                  use the materials for any commercial purpose, or for any public display
                  (commercial or non-commercial);
                </li>
                <li>
                  attempt to decompile or reverse engineer any software contained in SolarOps;
                </li>
                <li>remove any copyright or other proprietary notations from the materials.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="mb-4">
                To use certain features of the Service, you must register for an account. You agree
                to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>provide accurate, current, and complete information during registration;</li>
                <li>maintain and promptly update your account information;</li>
                <li>
                  maintain the security of your password and accept all risks of unauthorized
                  access;
                </li>
                <li>notify us immediately if you discover or suspect any security breaches.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Service Description</h2>
              <p className="mb-4">
                SolarOps provides automated solar project management services including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Permit research and requirement gathering</li>
                <li>Property and parcel data collection</li>
                <li>Solar system design generation</li>
                <li>Proposal creation and management</li>
              </ul>
              <p className="mb-4">
                The Service relies on third-party data sources and automated processes. While we
                strive for accuracy, we cannot guarantee that all information provided is complete,
                accurate, or up-to-date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Verifying all permit requirements with local authorities</li>
                <li>Ensuring compliance with all applicable laws and regulations</li>
                <li>Reviewing and confirming all system designs and proposals before use</li>
                <li>
                  Maintaining appropriate licenses and certifications for solar installation work
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                The Service and its original content, features, and functionality are and will
                remain the exclusive property of SolarOps and its licensors. The Service is
                protected by copyright, trademark, and other laws. Our trademarks and trade dress
                may not be used in connection with any product or service without our prior written
                consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
              <p className="mb-4">
                Your use of the Service is also governed by our{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . Please review our Privacy Policy, which also governs the Site and informs users of
                our data collection practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
              <p className="mb-4">
                The information on SolarOps is provided on an "as is" basis. To the fullest extent
                permitted by law, SolarOps:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  excludes all representations and warranties relating to this website and its
                  contents;
                </li>
                <li>
                  excludes all liability for damages arising out of or in connection with your use
                  of this website.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitations</h2>
              <p className="mb-4">
                In no event shall SolarOps or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business
                interruption) arising out of the use or inability to use SolarOps, even if SolarOps
                or a SolarOps authorized representative has been notified orally or in writing of
                the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or
                liability, for any reason whatsoever, including without limitation if you breach the
                Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed and construed in accordance with the laws of the
                United States, without regard to its conflict of law provisions. Our failure to
                enforce any right or provision of these Terms will not be considered a waiver of
                those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at
                any time. If a revision is material, we will try to provide at least 30 days notice
                prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <address className="not-italic">
                SolarOps
                <br />
                Email: legal@solarops.com
                <br />
                Address: [Your Company Address]
              </address>
            </section>
          </div>
        </div>
      </div>
    </div>);
}
