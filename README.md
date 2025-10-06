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

The app fetches users from the **Random User Generator API**:

```
https://randomuser.me/api/?page={page}&results={pageSize}&seed=lafe
```

This public API provides:

- ✅ Realistic user data with profile pictures
- ✅ Built-in pagination support
- ✅ No authentication required
- ✅ Consistent results (using a seed parameter)

If you want to use a different API:

1. Update the API URL in `app/page.tsx` (line 22-23)
2. Adjust the data transformation logic to match your API's response structure
3. Update the TypeScript interfaces in `types/user.ts` as needed

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
