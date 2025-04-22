# Tech Stack Document

This document outlines the choices behind the technologies used in the ContextCraft platform in plain, everyday language. It explains how the different components work together to give you a performant, secure, and enjoyable experience while generating software project documentation. Below, you’ll find sections covering the frontend, backend, deployment methods, third‐party integrations, and security/performance considerations.

## Frontend Technologies

The frontend is what you see and interact with. We have chosen robust, modern tools that make the interface fast, responsive, and easy to use. Here’s what we use:

*   **Next.js 14 (App Router):** Provides a powerful framework for building dynamic, server-side rendered pages. It makes navigation and resource loading seamless.
*   **TypeScript:** Adds safety by checking types as you code. This means fewer errors and more confidence that everything will work as expected.
*   **Tailwind CSS (with custom theme):** A utility-first approach to styling that makes it easy to enforce a consistent look and feel, including a dark mode with excellent contrast.
*   **shadcn UI:** Provides pre-built, accessible UI components that work nicely with Tailwind. It speeds up development while keeping the design clean and consistent.
*   **Zustand (with persist):** A simple and lightweight state management tool that saves user preferences and other state details locally.
*   **lucide-react:** A set of vector icons that are both easy on the eyes and help guide users through the application interface.

By combining these tools, we create an engaging and user-friendly interface that not only looks modern but also behaves reliably across a variety of devices.

## Backend Technologies

The backend handles data, logic, and the heavy lifting—invisible to the user but essential for the platform to work. Our choices here ensure that data is managed securely and efficiently:

*   **Supabase:** Serves as our database and backend service. It uses Postgres with advanced features like row‑level security, daily backups, and storage; this keeps your data safe and accessible only to you.
*   **Edge Functions in TypeScript:** These functions are run at the network edge, meaning they respond quickly to requests (such as generating documents) and are written in a modern language that reduces errors.
*   **APIs and Versioning:** Our backend uses clearly defined APIs to create, update, and manage project documentation. Version control for documents means whenever a new version is generated or updated, a snapshot is saved so you can always revert if needed.

This tech selection makes sure that all your project information is correctly handled, secure, and always up-to-date with the latest changes.

## Infrastructure and Deployment

Infrastructure is about making sure the application runs smoothly and is available whenever you need it. We’ve chosen reliable and modern tools to take care of this:

*   **Hosting on Modern Cloud Platforms:** Likely hosted on platforms like Vercel, which are well-integrated with Next.js and ensure that deployments are fast and reliable.
*   **CI/CD Pipelines and Version Control:** Using Git version control along with continuous integration/delivery pipelines means that updates can be automatically tested and deployed, keeping the platform stable and secure.
*   **Local Development with pnpm:** The recommended developer command is "pnpm i && pnpm dev", which makes setup straightforward and consistent across environments.

These choices give us the ability to scale the application efficiently while reducing downtime and quickening update cycles.

## Third-Party Integrations

We’ve integrated several external services to extend the functionality of ContextCraft beyond its core capabilities. Here are the key players:

*   **Clerk Auth:** Manages authentication, including email/password and social logins with multi-factor authentication. This keeps your account secure effortlessly.

*   **AI Providers:**

    *   *Claude 3.7 Sonnet*: Anthropic’s high-quality model.
    *   *GPT o3-mini*: OpenAI’s refined reasoning model.
    *   *Gemini 2.5 Pro*: Google’s model for tackling complex problems. These options give flexibility in choosing which AI model best suits the document generation needed, balancing quality and cost.

*   **Windsurf:** A modern IDE that integrates AI coding capabilities, which can support users who want to export or further interact with the generated code.

*   **CodeGuideDev:** Provides refined prompts and starter kits that help enhance the quality and structure of the generated documentation.

By including these integrations, ContextCraft leverages best-in-class services to enrich the platform with authentication, smart document generation, and an integrated development experience.

## Security and Performance Considerations

Keeping your data safe and the app running smoothly is at the heart of our design. Here’s how we achieve this:

*   **Security Measures:**

    *   **Multi-Factor Authentication (MFA):** Enabled via Clerk, ensuring that even if a password is compromised, your account remains secure.
    *   **HTTPS Everywhere & Secure Cookies:** These measures protect your data in transit and keep your session secure.
    *   **Row-Level Security in Supabase:** Ensures that every user only sees their own data, and strict audit logging records all major actions.
    *   **Secrets Management:** API keys and other sensitive pieces of information are kept in environment variables, never exposing them to the client.

*   **Performance Optimizations:**

    *   **Edge Functions:** Running code closer to the user reduces response times, making the app snappy and responsive.
    *   **Efficient Rendering with Next.js:** Leveraging server-side rendering and incremental static regeneration keeps pages fast to load.
    *   **Testing with Vitest and React Testing Library:** Ensures that every component works correctly, providing a smooth user experience without unexpected hiccups.

With these measures in place, we ensure that both your data stays safe and the platform operates at high efficiency, even as usage scales up.

## Conclusion and Overall Tech Stack Summary

To wrap up, here’s a recap of the key technology choices and how they fit into our mission:

*   **Frontend:** Built with Next.js 14, TypeScript, Tailwind CSS, shadcn UI, Zustand, and lucide-react, forming a modern, cohesive, and responsive user interface that adapts well to both desktop and mobile environments.
*   **Backend:** Powered by Supabase and Edge Functions in TypeScript, ensuring your data is handled securely and efficiently with robust APIs and clear version control for your generated documents.
*   **Infrastructure:** Modern cloud hosting, CI/CD pipelines, and version control guarantee a reliable and scalable application deployment cycle.
*   **Third-Party Services:** Integrations like Clerk Auth, multiple AI models (Claude, GPT o3-mini, Gemini), Windsurf, and CodeGuideDev enrich and extend the capabilities of ContextCraft.
*   **Security & Performance:** With MFA, HTTPS, strict row-level security, and performance optimizations (edge functions, efficient SSR, comprehensive testing), we deliver a trustworthy and high-speed experience.

Each technology has been chosen to support ContextCraft’s core mission: automating the generation of essential project documentation while ensuring that the process is secure, quick, and user-friendly. This thoughtful integration of modern tools creates a strong foundation for a platform that meets both technical and user needs.

Enjoy exploring ContextCraft, knowing that every layer of our tech stack has been designed with care for your security, performance, and overall user experience.
