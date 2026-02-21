# User Directory - Next.js TypeScript & Tailwind

A modern replication of the React user directory app, rebuilt with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 Responsive user card grid layout
- 🎨 Styled with Tailwind CSS
- 📄 Pagination controls (previous/next)
- 🔢 Adjustable page size (1-6 users)
- 💪 Type-safe with TypeScript
- ⚡ Built with Next.js 15 App Router

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Configuration

The app now uses an internal API and shared server-side data layer:

- `GET /api/users?page={page}&pageSize={pageSize}` for paginated users
- `GET /api/avatars/{id}?name={fullName}` for generated avatar SVGs

Core implementation files:

- `lib/users.ts` shared data service used by SSR and API routes
- `app/api/users/route.ts` internal users endpoint
- `app/api/avatars/[id]/route.ts` internal avatar image endpoint
- `app/page.tsx` server-rendered page using `getUsersPage(...)` directly

Image strategy options for future iterations:

1. Keep generated SVG avatars (current): no external dependency, deterministic, very fast.
2. Store static image assets in `public/avatars/` and return those URLs from `lib/users.ts`.
3. Proxy an external image provider through your API route if you need photoreal profile images.

## Project Structure

```
new-interview-lafe/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page (user listing)
│   └── globals.css     # Global styles
├── components/
│   ├── Card.tsx        # User card component
│   └── Details.tsx     # Design specs component
├── hooks/
│   └── useWindowDimensions.ts  # Window size hook
└── types/
    └── user.ts         # TypeScript interfaces
```

## Key Differences from Original

- **Next.js App Router**: Uses the modern App Router instead of Create React App
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Utility-first CSS instead of separate CSS files
- **Client Components**: Uses "use client" directive for interactive components

## Design Specs

- Card Dimensions: 380px × 479px
- Card Shadow Color: rgba(0, 0, 0, 0.1)
- Card Shadow Hover: rgba(0, 0, 0, 0.26)
- Profile Picture: 180px diameter
- Buttons/Select: 180px × 60px
- Button Disabled Color: #aaaaaa

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
