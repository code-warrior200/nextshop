# Contributing to NiceShop

Thank you for your interest in contributing to NiceShop! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/nextshop.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your commit message"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Code Style

- Use TypeScript for all new files
- Follow the existing code structure
- Use functional components with hooks
- Add proper TypeScript types
- Use Tailwind CSS for styling
- Follow the shadcn/ui component patterns

## Component Guidelines

### Creating New Components

1. Place UI components in `components/ui/`
2. Place feature components in `app/components/`
3. Export components properly
4. Add TypeScript interfaces for props
5. Include JSDoc comments for complex functions

### Example Component Structure

```typescript
"use client"; // if needed

import { ComponentProps } from "@/types";

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

## Animation Guidelines

- Use Framer Motion for animations
- Keep animations subtle and performant
- Use consistent timing functions
- Test animations on slower devices

## State Management

- Use Zustand for global state
- Keep state updates immutable
- Use proper TypeScript types for state

## Testing

Before submitting a PR:
- Test on multiple browsers
- Test responsive design
- Check console for errors
- Verify TypeScript types
- Run the linter

## Commit Messages

Use clear, descriptive commit messages:
- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor component`
- `test: Add tests`
- `chore: Update dependencies`

## Pull Request Process

1. Update the README.md if needed
2. Update documentation for new features
3. Ensure all tests pass
4. Get at least one code review
5. Squash commits if needed

## Questions?

Feel free to open an issue for any questions or concerns.

Thank you for contributing! 🎉

