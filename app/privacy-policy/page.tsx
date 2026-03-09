import type { Metadata } from "next";
import { Shield, Lock, Eye, Database, Cookie, Mail } from "lucide-react";
import { companyInfo } from "../_src/data/site-data";
import HomeButton from "@/components/ui/home-button";

export const metadata: Metadata = {
  title: "Privacy Policy | FileConverter - Your Data Stays Yours",
  description:
    "At FileConverter, your privacy is our priority. Learn how we protect your data with 100% client-side processing and zero file uploads.",
  keywords: [
    "privacy policy",
    "data protection",
    "no upload conversion",
    "secure image converter",
    "gdpr compliance",
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-muted/30 border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">
                  Your Privacy is Our Priority
                </h3>
                <p className="text-sm text-muted-foreground">
                  FileConverter processes all files directly in your browser. We
                  never upload, store, or access your files on our servers.
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Data Collection</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                We take your privacy seriously. FileConverter is designed with a
                privacy-first approach, and we collect minimal data necessary
                for the service to function.
              </p>
              <h3>What We Don&apos;t Collect:</h3>
              <ul>
                <li>Your uploaded files or converted files</li>
                <li>
                  Personal information such as name, email, or address (unless
                  you contact us)
                </li>
                <li>IP addresses for tracking purposes</li>
                <li>Browsing history or behavior tracking data</li>
              </ul>
              <h3>What We May Collect:</h3>
              <ul>
                <li>
                  Anonymous usage statistics (page views, conversion tool usage)
                </li>
                <li>
                  Browser type and operating system for compatibility
                  improvements
                </li>
                <li>
                  Cookies for essential functionality (theme preferences, etc.)
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">
                How Your Files Are Processed
              </h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                All file conversions happen entirely in your web browser using
                JavaScript APIs:
              </p>
              <ul>
                <li>Files never leave your device</li>
                <li>No uploads to any server</li>
                <li>Processing uses your device&apos;s computing power</li>
                <li>
                  Converted files are generated locally and remain on your
                  device
                </li>
              </ul>
              <p>
                This client-side approach ensures maximum privacy and security,
                as we have no technical ability to access your files.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">
                Cookies and Local Storage
              </h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>We use minimal cookies and browser storage for:</p>
              <ul>
                <li>Saving your theme preference (light/dark mode)</li>
                <li>Remembering your conversion settings</li>
                <li>
                  <strong>Storing your cookie consent preferences</strong>
                </li>
                <li>Essential functionality of the website</li>
              </ul>
              <p>
                We do not use cookies for tracking, advertising, or analytics
                purposes. You can manage your preferences via the notice banner
                upon your first visit or by clearing your browser cache.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                FileConverter does not use third-party analytics, advertising
                networks, or tracking services. We do not share your data with
                any third parties.
              </p>
              <p>
                Our website is hosted on Vercel, which may collect minimal
                server logs for security purposes.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Data Security</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Since we don&apos;t collect or store your files, there&apos;s no
                risk of data breaches involving your content.
              </p>
              <ul>
                <li>All connections to our website use HTTPS encryption</li>
                <li>Your files remain on your device at all times</li>
                <li>No server-side storage or processing</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Contact Us</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                If you have questions about this Privacy Policy, please contact
                us:
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${companyInfo.email.primary}`}
                  className="text-primary hover:underline"
                >
                  {companyInfo.email.primary}
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify users of any material changes by updating the &quot;Last
                updated&quot; date at the top of this page.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
