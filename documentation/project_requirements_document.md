# Project Requirements Document (PRD) for ContextCraft

## 1. Project Overview

ContextCraft is a web platform designed to automate the creation of essential software project documentation using advanced AI models. The system is built to eliminate common issues such as AI hallucinations, context loss, and error loops by generating six key documents—from the Product Requirements Document (PRD) to the Implementation Plan—using the Context Boundary Method. The platform focuses on a desktop-first experience with full responsiveness for mobile and tablet devices, ensuring that technical and nontechnical users alike receive clear, actionable documentation for their software projects.

The project is being built to empower developers and product managers with a straightforward, guided process for creating consistent and reliable documentation. By combining a well-structured multi-step wizard, robust role-based access control (Admin, Standard User, and Guest), and integrations with top AI providers (GPT‑4, Claude, Gemini among others), ContextCraft aims to improve project planning, collaboration, and technical clarity. Success will be measured by the quality and accuracy of generated documents, positive user feedback on usability, and the reduction of manual workload in document creation.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   A web platform that is desktop-first yet responsive on mobile and tablets.

*   Multi-step project creation wizard:

    *   Project Details (name, description, key features).
    *   AI Tools selection (with selectable cards and a global counter).
    *   Questionnaire phase with accordion sections and a progress bar.
    *   Document Generation step that triggers an asynchronous process via Supabase Edge Functions.

*   Generation of six core documentation types: PRD (highest priority), Application Flow, Tech Stack summary, Backend Structure, Frontend Guidelines, and Implementation Plan.

*   Real‑time dashboard displaying metrics like minutes and tokens saved plus a list of recent projects.

*   Role‑based access control with three roles (Admin, Standard User, Guest) enforced via Supabase Row-Level Security and Clerk Auth.

*   Revision history for every document generation or edit, with the ability to restore previous versions.

*   Integration with AI models (OpenAI GPT‑4 as default, fallback to GPT‑3.5; selectable models such as Anthropic Claude and Google Gemini) and with tools like CodeGuide.dev.

*   Basic onboarding with an interactive tour, guided wizard modals, and a pre-populated demo project.

*   UI elements based on Next.js 14 (App Router) and modern design standards (using Tailwind CSS + shadcn UI).

**Out-of-Scope:**

*   Advanced analytics beyond basic real‑time metrics.
*   Complex diff views for the revision history, beyond simple restoration.
*   Native mobile apps or fully custom mobile frameworks (responsiveness will be provided via web design).
*   Deep export functionalities (the planned export to IDEs such as Cursor/Windsurf is planned but not in the initial release).
*   Advanced collaboration features (multi-user editing or team sharing) beyond a single user’s CRUD operations on their own projects.
*   Extensive third-party integrations beyond those clearly defined in the current roadmap.

## 3. User Flow

A new user who visits ContextCraft will first encounter a clean, intuitive sign-up screen and a guided onboarding tour that explains the primary layout and core functions of the platform. After signing up—using email/password or social login through Clerk—the user sees an interactive dashboard that displays real‑time metrics such as minutes and tokens saved. The dashboard features a fixed sidebar for quick access to starter kits and global actions like theme toggling and logout, as well as a floating action panel for additional interactions. A demo project is available for exploration by guests or first-time users to get a feel for the documentation process.

Once a user decides to create a new project, they enter a multi-step wizard. The journey starts with entering basic project details such as name, description, and key features. Next, the user can choose from various AI tools and complete a comprehensive questionnaire that helps capture the full context of their project. After confirming that the provided data is complete, they trigger the documentation generation manually. The asynchronous process displays a progress indicator, and when complete, the generated documentation appears in markdown accordion panels with an option to download a ZIP file. Throughout this flow, prompts are provided for clarity, and version control ensures that every document generation or edit is recorded for future restoration if needed.

## 4. Core Features

*   **Authentication & Role Management:**

    *   Support for Admin, Standard User, and Guest roles.
    *   Role-based access enforced using Clerk Auth and Supabase Row-Level Security.
    *   Optional Multi-Factor Authentication (MFA) for enhanced account security.

*   **Dashboard:**

    *   Displays real-time metrics (minutes saved, tokens saved).
    *   Shows a list of recent projects and quick-access navigation options.
    *   Fixed sidebar and floating action panel for streamlined navigation.

*   **New Project Wizard:**

    *   Multi-step process covering:

        *   Project Details input (name, description, key features).
        *   AI Tools selection via a tabbed grid with selectable cards.
        *   Questionnaire section with expandable panels and progress bar.
        *   Document generation step with asynchronous API calls.

    *   Starter kits sidebar for inspiration and technical guidance.

*   **Documentation Generation:**

    *   Automated, manual-triggered generation of six key documents.
    *   Integration with AI models (GPT‑4, GPT‑3.5 fallback, Claude, Gemini).
    *   Use of a “Context Boundary Method” to ensure AI outputs remain relevant.
    *   Markdown display of generated documents with accordion panels and ZIP download option.

*   **Revision History:**

    *   Automatic version control for every document generation or update.
    *   History panel with timestamps and change summaries.
    *   Capability to restore a previous version of any document.

*   **Onboarding & Tutorial:**

    *   Interactive guided tours using tooltips and wizard modals.
    *   Pre-loaded demo project to showcase capabilities.
    *   Contextual help icons and easy-to-understand prompts throughout the UI.

## 5. Tech Stack & Tools

*   **Frontend:**

    *   Next.js 14 with App Router.
    *   TypeScript for type-safe coding.
    *   Tailwind CSS (with a custom theme as defined in the branding guidelines).
    *   shadcn UI components for consistent UI elements.
    *   Zustand for state management with persistence.
    *   lucide-react for icons.

*   **Backend:**

    *   Supabase for the database (Postgres), storage, and row-level security.
    *   Supabase Edge Functions written in TypeScript to handle documentation generation.
    *   Clerk Auth for authentication (including MFA support).

*   **Testing:**

    *   Vitest and React Testing Library for frontend testing.
    *   Sample tests such as for the ToolCard component.

*   **AI & External Tools:**

    *   Integration with OpenAI GPT‑4 (default) with fallback to GPT‑3.5.
    *   Support for alternative AI models: Claude 3.7 Sonnet and Gemini 2.5 Pro.
    *   Integration with CodeGuide.dev for refined prompts and starter kits.
    *   IDE integration planning for Windsurf (export as .mdc files) and Cursor.

## 6. Non-Functional Requirements

*   **Performance:**

    *   Fast load times: target initial load within 1-2 seconds for desktop.
    *   Responsive and interactive UI with minimal delay during user interactions.
    *   Asynchronous calls for document generation should provide responsive feedback via loaders or progress bars.

*   **Security:**

    *   HTTPS enforced across the platform and secure cookies with same-site lax policies.
    *   Encryption in transit (SSL/TLS) and at rest (managed by Supabase).
    *   Robust audit logging of user actions (e.g., in an audit_logs table).
    *   MFA is fully integrated for Admin accounts and encouraged for Standard Users.

*   **Compliance & Usability:**

    *   All colors meet WCAG AA standards for accessibility.
    *   GDPR-compatible data retention, export, and deletion procedures.
    *   Simple and clear UI that uses everyday language and intuitive icons.
    *   Graceful error handling and user notifications for any backend or API issues.

## 7. Constraints & Assumptions

*   The platform relies on API availability from multiple AI providers (OpenAI, Anthropic, Google) with usage limits and cost considerations.
*   All sensitive keys and secrets are managed as server-side environment variables and never exposed to the client.
*   Assumes the use of Clerk Auth and Supabase for primary authentication and database services respectively; any changes in these services may necessitate code adjustments.
*   The mobile experience, while fully responsive, is not the core focus; some complex editing functions might be simplified on smaller devices.
*   Initial release will focus on core functionality; advanced features (like detailed diff views in revision history or auto-regeneration in background) are planned for later phases.
*   Role-based data isolation is enforced through Supabase’s row-level security; this assumes standard deployment and configuration practices.

## 8. Known Issues & Potential Pitfalls

*   AI API rate limits and token usage costs can quickly add up if generation is triggered too frequently. Mitigation includes caching of recent results and enforcing manual triggers.
*   Integration with multiple AI providers might lead to differences in output style; clear configuration and prompt engineering is required to standardize output.
*   Asynchronous document generation may result in delays if network issues occur or if the AI provider faces high demand. Implementing proper loading states and user notifications is essential.
*   Complex multi-step wizards and responsive layouts increase the complexity of the UI; thorough testing (using Vitest and React Testing Library) and regular user feedback sessions will help mitigate usability issues.
*   Security challenges such as managing MFA, session handling, and audit logging must be carefully implemented and regularly reviewed for compliance and vulnerability.
*   Handling different document sizes and ensuring no context truncation in AI calls may require additional logic to split or summarize input if tokens exceed model limits.

Run locally: pnpm i && pnpm dev
