# My Modern Blog: Project Architecture & Functional Document

## 🏗️ System Overview

The application is a high-performance, full-stack monorepo built using **Turborepo**. It features a modern **Next.js** frontend and a robust **NestJS** GraphQL API, designed for scalability and seamless content management.

### Core Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, TanStack Query, `jose` (JWT).
- **Backend**: NestJS, GraphQL (Code-first), Prisma ORM.
- **Database**: SQLite (Development) / PostgreSQL (Production ready).
- **Services**: Supabase (Image Storage & Auth Infrastructure).

---

## 💎 Key Features & System Engineering Approach

This project implements several advanced patterns that distinguish it as a production-ready, senior-level application:

1.  **State-of-the-Art Authentication**: Utilizing a specialized `proxy.ts` (middleware) layer and `jose` for lightweight, Edge-ready JWT verification. This ensures protected routes (like `/user/*`) are secured with minimal latency.
2.  **GraphQL Data Sourcing**: A unified GraphQL API ensures the frontend only fetches the data it needs, reducing payload sizes and providing a type-safe contract between systems.
3.  **Systematic Error Handling**: All critical server actions (Create, Update, Delete) are wrapped in specialized `try...catch` safety blocks. This prevents "NEXT_REDIRECT" UI artifacts and ensures the application degrades gracefully during network failures.
4.  **CORS & Security Hardening**: Strict CORS policies restricted to the `FRONTEND_URL` and secure, http-only session cookies with `sameSite: "lax"` protection.
5.  **Optimized SEO Architecture**: Integrated metadata management and semantic HTML structure across all pages (Home, About, Contact) to ensure maximum search engine visibility.
6.  **Minimalist Logic-Driven UI**: A curated color palette (Blue/White/Slate) focused on readability and a premium "glassmorphic" aesthetic.

---

## 🌊 User Journey & Logic Flow

### 1. The Entrance (Landing & Exploration)

- **Unified Hero Section**: Users land on a vibrant, typography-focused hero section highlighting the latest blog trends.
- **Dynamic Post Discovery**: Posts are sourced via GraphQL and rendered with optimized Next.js Image components for fast LCP (Largest Contentful Paint).

### 2. The Interaction (Social Layer)

- **Intelligent Interaction Redirection**: Guest users can see "Like" and "Comment" buttons, but interacting with them triggers a smart redirect to the sign-in page, preserving the user's intent.
- **Server-Side Enforcement**: All interactions are verified on the server-side to prevent unauthorized mutation attempts.

---

## 📊 Blog Data Architecture

### **1. Data Sourcing & Flow (`app/page.tsx`)**

The Home page is a **Server Component**, sourcing data before it even hits the browser.

- **`fetchPosts()`**: Connects to the NestJS API via a prioritized `fetchGraphQL` utility.
- **Environment Awareness**: The system dynamically switches between `NEXT_PUBLIC_API_URL` and local fallbacks, ensuring zero configuration changes between Dev and Vercel environments.
- **Session Hydration**: The layout uses `getSession()` to provide a seamless "Logged In" experience across all sub-pages without unnecessary client-side flashes.

---

## 🎨 Design & Aesthetic Standards

- **Color Palettes**: Uses a "Modern Clean" palette (Blue-600 for actions, Slate-700 for typography, and pure White for depth).
- **Micro-Animations**: Subtle `hover:scale-[101%]` and `transition-transform` effects on cards provide high-end tactile feedback.
- **Typography**: Focused on a balanced hierarchy using bold headings and high-contrast body text for a "magazine-style" reading experience.

---

> [!IMPORTANT]
> **Production Safety Rule**: Every mutation (Save Post, Update Post, Delete) is fortified with redirect error protection. This ensures that even in edge cases, the user never sees technical redirect messages, maintaining a premium brand experience.
