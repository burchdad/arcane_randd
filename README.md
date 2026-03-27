# Arcane R&D

High-end futuristic marketing site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Structure

- `app/` contains the App Router layout, homepage, and global styles.
- `components/layout/` contains the sticky navbar and dynamic footer.
- `components/sections/` contains homepage sections for hero, projects, capabilities, and access.
- `components/ui/` contains reusable layout and glassmorphism primitives.
- `components/motion/` and `lib/motion.ts` contain reusable animation helpers.

## Notes

The site uses a black-and-gold luxury visual system with responsive sections, soft glows, glass panels, and scroll-based navbar behavior.