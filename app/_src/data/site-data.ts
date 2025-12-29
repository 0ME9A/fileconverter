import { TCompanyInfo } from "../ts";

// Company info
export const companyInfo: TCompanyInfo = {
  name: "File Converter",
  fullName: "File Converter",
  website: "www.fileconverter.ome9a.com",
  slogan: "Made with privacy and performance in mind",
  about:
    "Free online file conversion tools. Fast, secure, and completely private. All processing happens in your browser.",
  address: {
    headOffice: {
      building: "",
      near: "",
      pinCode: "803101",
      city: "Bihar sharif",
      state: "Bihar",
      country: "India",
      fullAddress: "Bihar sharif, Bihar, India – 803101",
      googleMap: "",
    },
  },
  phone: {
    primary: {
      code: "+91",
      number: "8271393343",
    },
  },
  email: {
    primary: "heyome9a@gmail.com",
  },
  officeTime: {
    time: {
      open: ["10:00 AM", "06:00 PM"],
      close: ["06:00 PM", "10:00 AM"],
    },
    day: {
      open: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      close: ["Sunday"],
    },
  },
  fcra: "",
  cin: "",
  ngoId: "",
  registered: "",
  copyRights: `© ${new Date().getFullYear()} FileConverter. All rights reserved.`,
};
