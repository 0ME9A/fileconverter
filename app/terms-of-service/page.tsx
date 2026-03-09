import type { Metadata } from "next";
import { FileText, CheckCircle, AlertCircle, Scale } from "lucide-react";
import { companyInfo } from "../_src/data/site-data";
import HomeButton from "@/components/ui/home-button";

export const metadata: Metadata = {
  title: "Terms of Service | FileConverter - Simple & Transparent",
  description:
    "Read our Terms of Service to understand how to use FileConverter's free online tools responsibly and transparently.",
  keywords: [
    "terms of service",
    "user agreement",
    "legal information",
    "website usage terms",
  ],
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <HomeButton />

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-muted/30 border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Agreement to Terms</h3>
                <p className="text-sm text-muted-foreground">
                  By accessing and using FileConverter, you agree to be bound by
                  these Terms of Service and all applicable laws and
                  regulations.
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Use License</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Permission is granted to use FileConverter for personal and
                commercial purposes, subject to the following restrictions:
              </p>
              <ul>
                <li>
                  You may not modify or copy the website code without permission
                </li>
                <li>
                  You may not use FileConverter for any illegal or unauthorized
                  purpose
                </li>
                <li>
                  You may not attempt to reverse engineer any part of the
                  service
                </li>
                <li>You may not remove any copyright or proprietary notices</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Service Description</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                FileConverter provides free online file conversion tools that
                operate entirely in your web browser.
              </p>
              <h3>Service Features:</h3>
              <ul>
                <li>Client-side file processing (no uploads)</li>
                <li>Multiple file format conversions</li>
                <li>Batch processing capabilities</li>
                <li>Advanced conversion options</li>
              </ul>
              <p>
                We strive to maintain service availability but do not guarantee
                uninterrupted access.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Disclaimer</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                FileConverter is provided &quot;as is&quot; without warranties
                of any kind, either express or implied, including but not
                limited to:
              </p>
              <ul>
                <li>Accuracy or quality of converted files</li>
                <li>Compatibility with all file formats</li>
                <li>Uninterrupted or error-free service</li>
                <li>Fitness for a particular purpose</li>
              </ul>
              <p>
                We recommend always keeping backups of your original files. We
                are not responsible for any data loss or file corruption.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">User Responsibilities</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>As a user of FileConverter, you agree to:</p>
              <ul>
                <li>
                  Use the service in compliance with all applicable laws and
                  regulations
                </li>
                <li>Not upload or process files containing illegal content</li>
                <li>
                  Not attempt to disrupt or harm the service or other users
                </li>
                <li>
                  Respect intellectual property rights when converting files
                </li>
                <li>
                  Use reasonable judgment regarding file size and browser
                  capabilities
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The FileConverter website, including its design, code, logo, and
                content, is protected by copyright and other intellectual
                property laws.
              </p>
              <p>
                You retain all rights to files you process using FileConverter.
                We claim no ownership or rights to your files.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                FileConverter and its operators shall not be liable for any
                damages arising from the use or inability to use the service,
                including but not limited to:
              </p>
              <ul>
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of data or files</li>
                <li>Business interruption</li>
                <li>Loss of profits</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Service Modifications</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>We reserve the right to:</p>
              <ul>
                <li>
                  Modify or discontinue the service at any time without notice
                </li>
                <li>Change these Terms of Service with or without notice</li>
                <li>Refuse service to anyone for any reason</li>
              </ul>
              <p>
                Continued use of FileConverter after changes constitutes
                acceptance of the modified terms.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Governing Law</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                These Terms of Service shall be governed by and construed in
                accordance with applicable laws, without regard to conflict of
                law provisions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>For questions about these Terms of Service, please contact:</p>
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
