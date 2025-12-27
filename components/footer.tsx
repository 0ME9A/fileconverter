/* eslint-disable @next/next/no-img-element */
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={"/logos/text-logo-c.png"}
                alt="FileConverter"
                className="h-6"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online file conversion tools. Fast, secure, and completely
              private. All processing happens in your browser.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://github.com/0me9a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/omegastrikes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/baliram-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Conversion Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/webp-converter"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Image to WebP
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/50">
                  Image to JPG (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/50">
                  Image to PNG (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/50">
                  Image Compression (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/50">
                  Batch Resize (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#tools"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:heyome9a@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>© {currentYear} FileConverter. All rights reserved.</p>
              <p className="hidden md:block">•</p>
              <p className="text-center">
                Made with privacy and performance in mind
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/sitemap.xml"
                className="hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
              <span>•</span>
              <Link
                href="/robots.txt"
                className="hover:text-foreground transition-colors"
              >
                Robots
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>100% Client-Side Processing</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>No File Uploads</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>No Data Collection</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
