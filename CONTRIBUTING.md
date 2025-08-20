# Contributing to Copy Cleanse

Thank you for your interest in contributing to Copy Cleanse! 🎉 We welcome contributions from developers of all skill levels.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Svelte 5 Guidelines](#svelte-5-guidelines)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Types of Contributions

We welcome several types of contributions:

- 🐛 **Bug fixes**
- ✨ **Feature enhancements**
- 📚 **Documentation improvements**
- 🎨 **UI/UX improvements**
- 🔧 **Performance optimizations**
- 🧪 **Test improvements**
- 🌐 **Accessibility improvements**

### Before You Start

1. Check if there's already an [issue](https://github.com/rogadev/copy-cleanse/issues) for what you want to work on
2. If not, create an issue to discuss your proposed changes
3. Wait for maintainer feedback before starting work on large changes

## Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/copy-cleanse.git
   cd copy-cleanse
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Start the development server**:
   ```bash
   pnpm dev
   ```
5. **Open your browser** to `http://localhost:5173`

## Project Structure

```
src/
├── routes/                 # SvelteKit routes
│   └── +page.svelte       # Main application page
├── lib/
│   ├── components/        # Reusable Svelte components
│   │   └── HighlightedText.svelte
│   └── utils/             # Utility functions
│       └── textCleaner.ts # Core text cleaning logic
└── app.html               # HTML template
```

## Svelte 5 Guidelines

This project uses **Svelte 5** with its modern syntax. Please follow these patterns:

### ✅ Modern Svelte 5 Syntax

```svelte
<script>
	// Use $state() for reactive state
	let count = $state(0);

	// Use $derived() for computed values
	let doubled = $derived(count * 2);

	// Use $props() for component props
	let { name, age = 25 } = $props();

	// Use $effect() for side effects
	$effect(() => {
		console.log('Count changed:', count);
	});
</script>

<!-- Use new event handler syntax -->
<button onclick={() => count++}>Click me</button>
```

### ❌ Avoid Legacy Syntax

```svelte
<script>
  // Don't use these deprecated patterns:
  export let name;           // Use $props() instead
  $: doubled = count * 2;    // Use $derived() instead
  let count = 0;             // Use $state() for reactive state
</script>

<!-- Don't use old event syntax -->
<button on:click={...}>    <!-- Use onclick={...} instead -->
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-dark-mode`
- `fix/text-processing-bug`
- `docs/update-contributing-guide`
- `style/improve-mobile-layout`

### Commit Messages

Follow conventional commit format:

```
type(scope): description

Examples:
feat(ui): add dark mode toggle
fix(cleaner): handle edge case in whitespace detection
docs(readme): update installation instructions
style(button): improve hover animations
```

## Submitting Changes

1. **Create a new branch** for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** locally:

   ```bash
   pnpm dev
   pnpm lint
   pnpm check
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Steps to test the changes

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Add proper type annotations
- Avoid `any` types when possible

### Code Style

- Follow the existing Prettier configuration
- Use ESLint rules for consistency
- Run `pnpm format` before committing

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic class names when creating custom styles

### Performance

- Keep bundle size minimal
- Optimize images and assets
- Use lazy loading when appropriate
- Test on different devices and browsers

## Testing

Currently, the project focuses on manual testing:

1. **Test your changes** in multiple browsers
2. **Test on mobile devices**
3. **Test with various text inputs**
4. **Verify accessibility** with screen readers
5. **Check performance** with large text inputs

Future: We plan to add automated testing. Contributions welcome!

## Documentation

- Update relevant documentation for any changes
- Add comments for complex logic
- Update the README if needed
- Consider adding examples for new features

## Questions?

- 💬 **Discussions**: [GitHub Discussions](https://github.com/rogadev/copy-cleanse/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/rogadev/copy-cleanse/issues)

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Future CONTRIBUTORS.md file
- Release notes for significant contributions

Thank you for contributing! 🚀
