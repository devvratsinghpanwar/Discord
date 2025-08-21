
# Discord Clone - Real-Time Chat Platform

>A full-stack, real-time chat and voice/video communication platform inspired by Discord, built with Next.js, TypeScript, Prisma, PostgreSQL, Clerk authentication, LiveKit, Socket.IO, and TailwindCSS.


## Table of Contents
- [Project Introduction](#project-introduction)
- [Tech Stack](#tech-stack)
- [High-Level Design](#high-level-design)
- [Low-Level Design](#low-level-design)
- [How to Run the Project Locally](#how-to-run-the-project-locally)
- [Additional Information](#additional-information)

---

## Project Introduction

This project is a modern, full-featured Discord clone that enables users to create servers, join channels, send messages, and communicate via text, audio, and video in real time. It supports:

- **User authentication** (sign up/in) via Clerk
- **Server and channel management** (create, join, invite, delete)
- **Text chat** with message history, file uploads, and emoji support
- **Direct messaging** between users
- **Audio and video rooms** powered by LiveKit
- **Real-time updates** using Socket.IO
- **Responsive, modern UI** with dark/light mode

**Target Audience:**
- Developers, teams, and communities seeking a customizable, self-hosted Discord-like platform.
- Anyone interested in learning about real-time web apps, Next.js, or scalable chat architectures.

---

## Tech Stack

- **Frontend:**
	- [Next.js](https://nextjs.org/) ^14.2.9 (App Router, SSR, API routes)
	- [React](https://react.dev/) ^18.3.1
	- [TypeScript](https://www.typescriptlang.org/) ^5
	- [TailwindCSS](https://tailwindcss.com/) ^3.4.10 + [tailwindcss-animate](https://github.com/joe-bell/tailwindcss-animate)
	- [Radix UI](https://www.radix-ui.com/) components
	- [shadcn/ui](https://ui.shadcn.com/) for UI primitives
	- [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

- **Backend:**
	- [Next.js API routes]
	- [Prisma ORM](https://www.prisma.io/) ^5.19.1
	- [PostgreSQL](https://www.postgresql.org/) (via Neon serverless)
	- [Socket.IO](https://socket.io/) ^4.8.0 (real-time messaging)
	- [LiveKit](https://livekit.io/) (audio/video rooms)
	- [UploadThing](https://uploadthing.com/) (file uploads)

- **Authentication:**
	- [Clerk](https://clerk.com/) ^4.31.4

- **Other Libraries:**
	- [Zod](https://zod.dev/) (validation)
	- [React Hook Form](https://react-hook-form.com/)
	- [React Query](https://tanstack.com/query)
	- [Lucide React](https://lucide.dev/) (icons)
	- [date-fns](https://date-fns.org/)
	- [uuid](https://www.npmjs.com/package/uuid)

---

## High-Level Design

### Architecture Overview

- **Frontend (Next.js App Router):**
	- Renders all pages and layouts, handles routing, and provides a responsive UI.
	- Uses React context providers for theme, modal, socket, and query state.
	- Integrates Clerk for authentication and user management.

- **Backend (API Routes):**
	- Handles CRUD operations for servers, channels, messages, and direct messages.
	- Uses Prisma ORM to interact with a PostgreSQL database (Neon serverless).
	- Real-time communication via Socket.IO (for chat) and LiveKit (for audio/video rooms).
	- File uploads managed via UploadThing.

- **Database (Prisma + PostgreSQL):**
	- Models: Profile, Server, Member, Channel, Message, Conversation, DirectMessage
	- Supports server/channel membership, roles, message history, and more.

### Component Relationships

- **App Structure:**
	- `/app` - Next.js app directory (layouts, routes, API endpoints)
	- `/components` - UI and logic components (chat, modals, navigation, providers)
	- `/lib` - Utility functions, database, and authentication helpers
	- `/hooks` - Custom React hooks for chat, modals, sockets, etc.
	- `/prisma` - Prisma schema and migrations

---

## Low-Level Design

### Key Modules & Files

- **Authentication:**
	- `lib/current-profile.ts`, `lib/initial-profile.ts`, `middleware.ts` - Integrate Clerk for user sessions and protect routes.

- **Database Models:**
	- `prisma/schema.prisma` - Defines Profile, Server, Member, Channel, Message, Conversation, DirectMessage, and enums for roles/types.

- **API Endpoints:**
	- `app/api/servers/route.ts` - Create servers
	- `app/api/channels/route.ts` - Create channels
	- `app/api/messages/route.ts` - Fetch/send messages
	- `app/api/direct-messages/route.ts` - Fetch/send DMs
	- `app/api/livekit/route.ts` - Generate LiveKit tokens for audio/video
	- `app/api/uploadthing/` - File upload endpoints

- **Real-Time Communication:**
	- `components/providers/socket-provider.tsx` - Socket.IO client context
	- `app/api/socket/` - Socket.IO server endpoints

- **UI Components:**
	- `components/chat/` - Chat input, messages, header, etc.
	- `components/media-room.tsx` - Audio/video room UI (LiveKit)
	- `components/navigation/` - Sidebar, navigation items
	- `components/modals/` - Modal dialogs for server/channel actions

- **Utilities & Hooks:**
	- `lib/db.ts` - Prisma client instance
	- `lib/utils.ts` - Utility helpers (e.g., className merging)
	- `hooks/` - Custom hooks for chat, modals, sockets

### Design Patterns & Data Structures

- **Context Providers** for global state (theme, modal, socket, query)
- **Prisma ORM** for type-safe database access
- **React Hooks** for modular logic
- **Role-based access control** for server/channel permissions
- **Cursor-based pagination** for chat history

---

## How to Run the Project Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) database (or Neon serverless)
- [Clerk](https://clerk.com/) account for authentication
- [LiveKit](https://livekit.io/) account for audio/video rooms

### Installation Steps
1. **Clone the repository:**
	 ```bash
	 git clone <your-repo-url>
	 cd discord
	 ```
2. **Install dependencies:**
	 ```bash
	 npm install
	 # or
	 yarn install
	 # or
	 pnpm install
	 ```
3. **Set up environment variables:**
	 - Copy `.env.example` to `.env.local` and fill in the required values:
		 - `DATABASE_URL` (PostgreSQL connection string)
		 - `CLERK_*` (Clerk API keys)
		 - `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `NEXT_PUBLIC_LIVEKIT_URL` (LiveKit)
		 - Any other required variables

4. **Run database migrations:**
	 ```bash
	 npx prisma migrate dev
	 ```

5. **Start the development server:**
	 ```bash
	 npm run dev
	 # or
	 yarn dev
	 # or
	 pnpm dev
	 ```
	 Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: Testing
- No formal test suite is included, but you can test functionality by creating servers, channels, sending messages, and joining audio/video rooms.

---

## Additional Information

- **Troubleshooting:**
	- Ensure all environment variables are set correctly.
	- Database must be running and accessible.
	- Clerk and LiveKit credentials must be valid.
	- If you encounter CORS or connection issues with Socket.IO or LiveKit, check your URLs and environment config.

- **Customization:**
	- UI components are built with shadcn/ui and TailwindCSS for easy theming.
	- Add or modify features by editing components or API routes.

- **Deployment:**
	- Can be deployed to [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL.
	- Set all environment variables in your deployment dashboard.

- **Contributing:**
	- PRs and issues are welcome! Please follow best practices and open an issue for major changes.

---

## License

This project is for educational and demonstration purposes. Please check individual package licenses for production use.
