import { IconType } from "react-icons/lib";
import { LucideIcon } from "lucide-react";

export type TFaq = {
  question: string;
  answer: string;
};

export type TLink = {
  id: string;
  label: string;
  href: string;
  icon?: IconType | LucideIcon;
  disabled?: boolean;
};

// company info

export type TEmailPrimary = string;

export type TPhonePrimary = {
  code: string;
  number: string;
};

export type TEmailConfig = {
  primary: TEmailPrimary;
  [key: string]: string; // support, pitches, etc.
};

export type TPhoneConfig = {
  primary: TPhonePrimary;
  [key: string]: TPhonePrimary; // support, sales, etc.
};

export type TAddress = {
  building: string;
  near: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
  googleMap?: string;
};

export type TCompanyInfo = {
  name: string;
  fullName: string;
  website: string;
  slogan?: string;
  about: string;
  address: {
    headOffice: TAddress;
  };
  phone: {
    primary: {
      code: string;
      number: string;
    };
  };
  email: TEmailConfig;
  officeTime: {
    time: {
      open: string[];
      close: string[];
    };
    day: {
      open: string[];
      close: string[];
    };
  };
  fcra: string;
  cin: string;
  ngoId: string;
  registered: string;
  copyRights: string;
};

// tools
export type TToolHighlight = {
  id: string;
  title: string;
  description: string;
  href?: string;
  status: "available" | "coming-soon";
  gradient: string;
  icon: LucideIcon;
};

// trust
export type TTrustItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

// features

export type TFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};
