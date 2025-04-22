---

# .windsurfrules

## Project Overview
- **Type:** windsurf_file
- **Description:** ContextCraft automates software project documentation creation using AI to eliminate hallucinations, context loss, and error loops. The platform generates six baseline documents including a high-priority PRD and Implementation Plan.
- **Primary Goal:** Automate and streamline the creation of accurate, context-rich project documentation while enforcing strict version and security controls.

## Project Structure
### Framework-Specific Routing
- **Directory Rules:**
  - Next.js 14 (App Router): Use the `app/` directory with nested route folders, e.g., `app/[route]/page.tsx` following App Router conventions.
  - Example: The new project wizard is structured under `app/dashboard/new-project/` with subroutes like `select-ai/page.tsx`, `questionnaire/page.tsx`, and `create-docs/page.tsx`.

### Core Directories
- **Versioned Structure:**
  - app/ : Contains Next.js 14 specific routing (e.g., API routes in `app/api` with Route Handlers).
  - components/ : Houses reusable UI components (e.g., Sidebar, Header, StarterKitCard, TipCard, etc.).
  - lib/ : Contains libraries and utilities (e.g., wrappers for OpenAI, prompt templates, Supabase configuration).
  - actions/ : Server-side action handlers, such as `generateDocs.ts` calling Edge Functions.
  - tests/ : Includes Vitest and React Testing Library tests (e.g., `ToolCard.test.tsx`).

### Key Files
- **Stack-Versioned Patterns:**
  - app/dashboard/layout.tsx: Implements Next.js 14 root layout for the dashboard.
  - app/dashboard/new-project/page.tsx: Entry point for the New Project Wizard (Step 1).
  - app/api/generate-docs/route.ts: Defines API route for generating documents via Edge Functions.

## Tech Stack Rules
- **Version Enforcement:**
  - next@14: Must use the App Router pattern in the `app/` directory; avoid using legacy Pages Router (`pages/*.tsx`).
  - typescript@latest: Enforce strict typing across the project.
  - tailwindcss (custom theme): Utilize the provided theme extension for branding consistency.

## PRD Compliance
- **Non-Negotiable:**
  - "Automate software project documentation creation using AI to eliminate hallucinations, context loss, and error loops." This mandate drives the AI integration, secure data handling, and rigorous version control throughout the application.

## App Flow Integration
- **Stack-Aligned Flow:**
  - Example: Next.js 14 Project Creation Wizard Flow → The multi-step process located under `app/dashboard/new-project/` guides users from project details to document creation using server actions and Next.js’s native routing.