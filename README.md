# AI Text Cleaner

Remove hidden markers and formatting inconsistencies from AI-generated text with this privacy-first, browser-based tool.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-clean.roga.dev-blue?style=for-the-badge)](https://clean.roga.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-orange?style=for-the-badge)](https://kit.svelte.dev/)

## 🎯 What it does

AI Text Cleaner detects and removes:

- Hidden whitespace characters (zero-width spaces, non-breaking spaces)
- Em dashes (—) that may identify AI-generated content
- Various Unicode spacing characters used as markers
- Invisible formatting inconsistencies

## ✨ Features

- **🚀 Lightning Fast**: Instant processing with real-time feedback
- **🔒 100% Private**: All processing happens in your browser - no data leaves your device
- **🎯 Precision Detection**: Advanced algorithms detect even subtle hidden markers
- **📱 Responsive Design**: Works beautifully on desktop and mobile
- **🎨 Modern UI**: Built with Tailwind CSS and Svelte 5
- **⚡ One-Step Cleaning**: Paste with **Ctrl+V** to instantly clean and copy text to your clipboard
- **🔍 Diff Review**: Click "View Changes" to compare your original and cleaned text

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/rogadev/clean.roga.dev.git
   cd clean.roga.dev
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or npm install
   # or yarn install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **TypeScript**: Full type safety
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: Static site (works on any hosting platform)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contributing Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Reporting Issues

Found a bug? Please [open an issue](https://github.com/rogadev/clean.roga.dev/issues) with:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for content creators who want clean, marker-free text
- Inspired by the need for privacy-first text processing tools
- Thanks to the open source community for the amazing tools that made this possible

## 📞 Support

- 🌐 **Website**: [clean.roga.dev](https://clean.roga.dev)
- 🐛 **Issues**: [GitHub Issues](https://github.com/rogadev/clean.roga.dev/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/rogadev/clean.roga.dev/discussions)

---

<div align="center">
Made with ❤️ for the open source community
</div>
