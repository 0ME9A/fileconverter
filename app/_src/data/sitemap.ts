import { RiGithubLine, RiTwitterXLine } from "react-icons/ri";
import { FiLinkedin } from "react-icons/fi";
import { TLink } from "../ts";

type TNavLinks = TLink & {
  subLinks: TLink[] | null;
};

export const navLinks: TNavLinks[] = [
  {
    id: "n1",
    label: "Home",
    href: "/",
    subLinks: null,
  },
  {
    id: "n2",
    label: "Tools",
    href: "/tools",
    subLinks: [
      {
        id: "s1",
        label: "Image to WebP",
        href: "/webp-converter",
      },
    ],
  },
  {
    id: "n3",
    label: "Features",
    href: "/features",
    subLinks: null,
  },
];

type TFooterLinks = {
  id: string;
  title: string;
  links: TLink[];
}[];
export const footerLinks: TFooterLinks = [
  {
    id: "conversion-tools",
    title: "Conversion Tools",
    links: [
      {
        id: "c1",
        label: "Image to WebP",
        href: "/webp-converter",
      },
      {
        id: "c2",
        label: "Image to JPG",
        href: "/jpg-converter",
      },
      {
        id: "c3",
        label: "Image to PNG",
        href: "/png-converter",
      },
      {
        id: "c4",
        label: "Image to ICO",
        href: "/ico-converter",
      },
      {
        id: "c5",
        label: "Batch Resize (Coming Soon)",
        href: "#",
        disabled: true,
      },
      {
        id: "c6",
        label: "View All Tools",
        href: "/tools",
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      {
        id: "r1",
        label: "Features",
        href: "/features",
      },
      {
        id: "r2",
        label: "About us",
        href: "/about",
      },
      {
        id: "r3",
        label: "FAQ",
        href: "/faq",
      },
      {
        id: "c4",
        label: "Contact us",
        href: "/contact",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal & Contact",
    links: [
      {
        id: "l1",
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        id: "l2",
        label: "Terms of Service",
        href: "/terms-of-service",
      },
      {
        id: "l3",
        label: "Cookie Policy",
        href: "/cookie-policy",
      },
    ],
  },
];

export const social: TLink[] = [
  {
    id: "s1",
    label: "GitHub",
    href: "https://github.com/0me9a",
    icon: RiGithubLine,
  },
  {
    id: "s2",
    label: "GitHub",
    href: "https://x.com/@omegastrikes",
    icon: RiTwitterXLine,
  },
  {
    id: "s3",
    label: "GitHub",
    href: "https://linkedin.com/in/baliram-singh",
    icon: FiLinkedin,
  },
];
