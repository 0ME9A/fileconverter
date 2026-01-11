import type { Metadata } from "next";
import { Cookie, Settings, Eye, Shield } from "lucide-react";
import { companyInfo } from "../_src/data/site-data";
import HomeButton from "@/components/ui/home-button";

export const metadata: Metadata = {
  title: "Cookie Policy | FileConverter",
  description:
    "Learn about how FileConverter uses cookies and manages your preferences.",
};

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-muted/30 border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Minimal Cookie Usage</h3>
                <p className="text-sm text-muted-foreground">
                  FileConverter uses only essential cookies necessary for the
                  website to function properly. We do not use tracking or
                  advertising cookies.
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Cookies are small text files stored on your device by your web
                browser. They help websites remember information about your
                visit, making your experience more convenient.
              </p>
              <p>
                FileConverter uses cookies and browser local storage minimally
                and only for essential functionality.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">
                Types of Cookies We Use
              </h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h3>Essential Cookies (Always Active)</h3>
              <p>
                These cookies are necessary for the website to function and
                cannot be disabled:
              </p>
              <ul>
                <li>
                  <strong>Theme Preference:</strong> Stores your light/dark mode
                  selection
                </li>
                <li>
                  <strong>Conversion Settings:</strong> Remembers your preferred
                  conversion options (quality, compression, etc.)
                </li>
                <li>
                  <strong>Session Management:</strong> Maintains your session
                  state while using the tools
                </li>
              </ul>

              <h3>Cookies We DO NOT Use</h3>
              <ul>
                <li>Analytics or tracking cookies</li>
                <li>Advertising or marketing cookies</li>
                <li>Third-party cookies</li>
                <li>Cross-site tracking cookies</li>
                <li>Social media cookies</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Local Storage</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>In addition to cookies, we use browser local storage for:</p>
              <ul>
                <li>Saving your Master conversion settings preferences</li>
                <li>
                  Caching conversion history for your convenience (stored only
                  on your device)
                </li>
                <li>Remembering your selected options between sessions</li>
              </ul>
              <p>
                All local storage data remains on your device and is never
                transmitted to our servers or any third parties.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Your Cookie Choices</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>You have control over cookies on your device:</p>

              <h3>Browser Settings</h3>
              <p>Most browsers allow you to:</p>
              <ul>
                <li>View and delete cookies</li>
                <li>Block all cookies</li>
                <li>Block third-party cookies</li>
                <li>Clear cookies when closing the browser</li>
              </ul>

              <h3>Impact of Disabling Cookies</h3>
              <p>
                If you disable cookies, some features may not work properly:
              </p>
              <ul>
                <li>Your theme preference won&apos;t be remembered</li>
                <li>Conversion settings will reset each session</li>
                <li>
                  You&apos;ll need to reconfigure options each time you visit
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Cookies</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                FileConverter does not use any third-party cookies. We do not
                integrate with analytics services, advertising networks, or
                social media platforms that would place cookies on your device.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cookie Retention</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>Our essential cookies are:</p>
              <ul>
                <li>
                  <strong>Persistent:</strong> Remain on your device until you
                  delete them or they expire
                </li>
                <li>
                  <strong>Long-lasting:</strong> Set to expire after 1 year of
                  inactivity
                </li>
                <li>
                  <strong>Deletable:</strong> Can be removed at any time through
                  your browser settings
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Updates to This Policy</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                We may update this Cookie Policy to reflect changes in
                technology or legal requirements. Any changes will be posted on
                this page with an updated revision date.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                If you have questions about our use of cookies, please contact:
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
        </div>
      </div>
    </div>
  );
}
