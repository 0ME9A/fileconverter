# FileConverter (i-Master) | Next-Gen In-Browser File Conversion

**FileConverter** is a high-performance, privacy-first file conversion and processing platform built with modern web technologies. Unlike traditional cloud converters, FileConverter performs all processing locally inside your browser using client-side APIs and WebAssembly — ensuring your files and data never touch a remote server.

---

## 🚀 Key Features

- 🔒 **100% Client-Side Privacy**: Zero server uploads. Your files never leave your device, ensuring maximum confidentiality and security.
- ⚡ **Instant Processing**: Bypass upload and download queues entirely. Conversion runs at the full speed of your local hardware.
- 🛠️ **Universal Tool Search**: Command-palette search (`Ctrl+K` or `/`) to quickly find and launch any conversion or editing tool.
- 📋 **How It Works Flow**: Intuitive, step-by-step guidance from dropping files to configuring settings and instant downloading.
- ⚖️ **Browser vs. Cloud Comparison**: Clear matrix illustrating the privacy, offline capability, speed, and unlimited size benefits over traditional cloud-based converters.
- 📊 **Real-Time Privacy Impact**: High-performance cached stats showing total files processed and privacy preserved worldwide.
- 🎨 **State-of-the-Art UI/UX**: Fluid GSAP scroll animations, sleek dark/light mode support, and modernized Tailwind CSS 4 styling.
- 📁 **Extensive Format Support**: WebP, PNG, JPG, ICO, PDF, SVG, AVIF, and more.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [`@gsap/react`](https://gsap.com/resources/React/) with ScrollTrigger
- **Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database / Analytics**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Validation**: [Zod](https://zod.dev/)

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v20.x or higher recommended)
- npm, pnpm, or yarn

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/0ME9A/fileconverter.git
   cd fileconverter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Build & Production

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📄 License

Built with ❤️ for privacy, performance, and open web standards.
