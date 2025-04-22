# Implementation plan

## Phase 1: Environment Setup

1. **Prevalidation:** Check if the current directory is already a project by verifying the existence of a `package.json` file. If it exists, skip bootstrapping a new project. *(PRD & Tech Stack: Core Tools)*

2. **Bootstrap Project:** Run the command:
   ```bash
   npx create-next-app contextcraft --typescript --tailwind --eslint --src-dir
   ```
   Then navigate into the project directory with:
   ```bash
   cd contextcraft
   ```
   *(Delivery Instructions)*

3. **Initialize shadcn UI:** Run the command:
   ```bash
   npx shadcn-ui@latest init
   ```
   *(Delivery Instructions)*

4. **IDE Integration (Windsurf):**
   - Open the Cascade assistant in Windsurf.
   - Tap the hammer (MCP) icon and select **Configure** to open the configuration file.
   - Add the following configuration based on your OS:
     - **macOS:**
       ```json
       { "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
       ```
     - **Windows:**
       ```json
       { "mcpServers": { "supabase": { "command": "cmd", "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
       ```
   - **Display the link:** Show the user this link so they can obtain the connection string: [https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp](https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp). Replace `<connection-string>` once provided.
   - Save the configuration and tap **Refresh** in the Cascade assistant. *(Tech Stack: Supabase Integration, Windsurf Instructions)*

5. **Environment Variables:** Create a `.env.local` file in the project root and add the necessary keys for Supabase and Clerk (e.g., SUPABASE_URL, SUPABASE_ANON_KEY, CLERK_API_KEY). *(Security & Compliance)*

## Phase 2: Frontend Development

6. **Create Dashboard Layout:** Create a file at `app/(dashboard)/layout.tsx`. Implement a layout that uses the dark theme by default, a fixed sidebar (72px), and a three-column grid (`cols-[250px 1fr 280px]`). Use Tailwind CSS with the custom theme and `shadcn UI` components. *(Branding & Page 1 Layout)*

7. **Create Dashboard Page:** Create `app/(dashboard)/page.tsx` that includes the header (logo, status, breadcrumb, etc.) and placeholders for metrics and recent projects. *(Page 1 Layout)*

8. **New Project Wizard Layout:** Create `app/(dashboard)/new-project/layout.tsx` to structure the multi-step wizard. *(Page 1 Layout & Features)

9. **New Project Wizard Pages:**
   - Create `app/(dashboard)/new-project/page.tsx` for the first step of the wizard.
   - Create `app/(dashboard)/new-project/select-ai/page.tsx` for selecting the AI provider.
   - Create `app/(dashboard)/new-project/questionnaire/page.tsx` for gathering project details.
   - Create `app/(dashboard)/new-project/create-docs/page.tsx` to trigger document generation.
   *(Page File Map & Features)*

10. **API Route for Document Generation:** Create `app/api/generate-docs/route.ts` to handle POST requests that trigger the `generateDocs` edge function integrating the AI models. *(Critical Aspects: AI Integration)*

11. **Component Development:**
    - Create components in the `components/` directory. For example, create a `ToolCard.tsx` file that uses the `cn()` helper function for managing classNames.
    *(Delivery Instructions)*

12. **AI Integration Library:**
    - Create `lib/openai.ts` file to implement functions that call the OpenAI GPT-4 API (with fallback to GPT-3.5). *(Tech Stack: AI Integrations)*

13. **Prompt Templates:** Create `lib/prompts/templates.ts` that exports baseline document templates used by the document generation API. *(Mission & Documentation Priority)*

14. **Supabase Client Setup:** Create `lib/supabase.ts` to initialize the Supabase client. Use the connection string from your environment variables. *(Tech Stack: Backend & Database)*

15. **GenerateDocs Action:** Create `actions/generateDocs.ts` that calls the `/api/generate-docs` endpoint. *(Tech Stack: AI Integration)*

16. **Type Definitions:** Create a `types/` directory and add required TypeScript types for projects, documents, users, and document versions. *(Documentation Priority & Roles)*

17. **Testing the ToolCard Component:**
    - Create a test file at `tests/ToolCard.test.tsx` using Vitest and React Testing Library.
    - Ensure the test uses the `cn()` helper and provides full coverage. *(Testing: Vitest + React Testing Library)*

18. **Validation:** Run the tests with:
    ```bash
    pnpm run vitest
    ```
    Verify that all tests pass. *(Testing)*

## Phase 3: Backend Development

19. **Clerk Authentication Integration:** Configure Clerk in the Next.js application (e.g., in `_app.tsx` or using middleware) to handle email/password, social login, and MFA for Admins. *(Security & Compliance: Clerk Auth)

20. **Supabase Database Schema:**
    - Design your Postgres schema on Supabase to include tables such as projects, documents, doc_versions, and users.
    - Enforce Row-Level Security (RLS) rules to restrict access based on roles (Admin, Standard User, Guest).
    *(Tech Stack: Supabase & Security)

21. **Edge Function Implementation:** In `app/api/generate-docs/route.ts`, implement the `generateDocs` function to call the respective AI service (default GPT-4, with fallback to GPT-3.5) using the abstraction in `lib/openai.ts`.
    *(Critical Aspects: AI Integration & Backend Structure)*

22. **Backend Validation:** Use Supabase Studio to verify that the schema is correctly deployed and that RLS functions as expected. *(Security & Database)*

## Phase 4: Integration

23. **Frontend-Backend Connection:** In your frontend pages (particularly in the New Project Wizard), integrate API calls to the `/api/generate-docs` endpoint. Use Fetch or Axios to handle the POST request and display a loading/error state as needed. *(App Flow & Backend Integration)*

24. **State Management:** Set up Zustand with persist in your application (e.g., in a global store file) to maintain state across sessions and page refreshes. *(Tech Stack: Zustand + persist)*

25. **Validation:** Manually test by triggering document generation from the UI and verifying that the API returns a successful response and documents are created. *(PRD & Q&A: Integration)*

## Phase 5: Deployment

26. **Local Deployment Instructions:** Add a README section that instructs users to run the command:
    ```bash
    pnpm i && pnpm dev
    ```
    *(Delivery Instructions)*

27. **Environment Variables for Deployment:** Ensure `.env.local` (or similar) is configured with secret keys for Supabase, Clerk, and AI APIs. *(Security & Compliance)*

28. **CI/CD and Cloud Setup Preparation:** (Optional based on your pipeline) Prepare configuration files and scripts for deploying the application. Provide instructions for services if needed. *(Deployment)*

29. **Final Validation:** Open `http://localhost:3000` in your browser after running the development server to confirm the application loads with the dark theme, proper layout, and working API integrations. *(Q&A: Pre-Launch Checklist)*

---

**Run locally:**

```bash
pnpm i && pnpm dev
```

This completes the step-by-step implementation plan for ContextCraft. Make sure to follow each step carefully and validate at each phase to ensure smooth development and seamless integration.