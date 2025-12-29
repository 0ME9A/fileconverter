/* eslint-disable @next/next/no-img-element */
import { footerLinks, social } from "@/app/_src/data/sitemap";
import { companyInfo } from "@/app/_src/data/site-data";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function Footer() {
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
            <p className="text-sm text-muted-foreground">{companyInfo.about}</p>
            <div className="flex gap-3">
              {social.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={item.label}
                >
                  {item.icon && <item.icon size={20} />}
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((linkList) => (
            <div key={linkList.id}>
              <h3 className="font-semibold mb-4">{linkList.title}</h3>
              <ul className="space-y-2 text-sm">
                {linkList.links.map((link) => (
                  <li key={link.id}>
                    {link.disabled ? (
                      <span className="text-muted-foreground/50">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>{companyInfo.copyRights}</p>
              <p className="hidden md:block">•</p>
              <p className="text-center">{companyInfo.slogan}</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span>•</span>
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
