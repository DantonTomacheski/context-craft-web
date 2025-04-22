# ContextCraft Frontend Guideline Document

Welcome to the Frontend Guideline Document for ContextCraft. This document explains how the frontend of our application is set up, the main design principles we follow, how we structure and style our components, and the technologies we use. It’s written in everyday language to make it easy for anyone—even non-developers—to understand the approach behind our frontend development.

## 1. Frontend Architecture

Our frontend is built using modern web technologies and a component-based approach to ensure scalability, maintainability, and top-notch performance:

*   **Framework & Library:** We use Next.js version 14 with the App Router, which provides file system based routing and server-side rendering out of the box. This helps in building fast, SEO-friendly applications.
*   **Language:** TypeScript makes the code clear and easier to maintain by catching errors early and improving documentation.
*   **Styling:** Tailwind CSS is used for styling with a custom theme that aligns with our branding (see the Styling and Theming section below).
*   **UI Components:** We leverage shadcn UI to give our application a consistent and polished look.
*   **State Management:** We use Zustand with persistence to manage our application state. This combination helps maintain consistency across user sessions and simplifies sharing state among components.
*   **Icons:** We integrate lucide-react for our iconography, ensuring that icons are clean and modern.

This architecture supports growth by letting us add features without rewriting large parts of the codebase. Components are reusable so that development remains efficient over time. In short, our structure keeps the code organized and improves the overall user experience by keeping load times low and interactions smooth.

## 2. Design Principles

We believe that design is not just about looks, but about usability and accessibility. Our key design principles are:

*   **Usability:** We ensure that every user interface element is easy to use and understand. The layout of pages is clear, with consistent navigation and intuitive interactive elements.
*   **Accessibility:** All our colors pass WCAG AA standards. Our components are designed to be accessible to people with various disabilities, making sure that everyone can interact with the platform effectively.
*   **Responsive Design:** Although our design is primarily desktop-first, the layout adapts seamlessly to mobile and tablet screens. This is achieved by using responsive design principles built into Tailwind CSS.
*   **Security & Performance:** The design also takes your security and the performance of your interactions into account – for example, handling secure logins, multi-factor authentication, and ensuring privacy throughout your experience.

## 3. Styling and Theming

Our approach to styling is modern and clear, ensuring a consistent look across all parts of the application:

*   **CSS Framework:** We use Tailwind CSS which allows for rapid styling using utility classes. We extend its default configuration with our custom colors and fonts:

    *   **Primary Color:** Blue‑teal (#1FA2FF) with white text for a striking contrast.
    *   **Accent Color:** Orange (#F38C02), used for interactive elements like buttons.
    *   **Surface:** Dark gray (#111317) which forms the background for our dark theme.
    *   **Muted:** A lighter gray (#1E2128) for subtle components.

*   **Typography:**

    *   **Section Titles:** Styled with `text-2xl font-bold` to stand out clearly.
    *   **Body Text:** Uses `text-base` for general content readability.
    *   **Code Snippets:** Rendered using a monospaced font (Fira Code) to differentiate technical elements.
    *   **Font Families:** We use `Inter` for sans-serif and `Fira Code` for monospaced text.

*   **Design Style:** The overall design is modern and flat with a hint of glassmorphism in interactive elements, offering a sleek and professional look while keeping interfaces minimalist and clean.

*   **Theming:** Our dark theme is the default, but a light mode toggle is available to suit user preferences. The custom Tailwind theme ensures consistency across all components by using our predefined colors and styles.

## 4. Component Structure

Our application is built using a component-based structure. This approach means that every part of the interface—from buttons to the layout of the dashboard—is built as an individual, reusable component.

*   **Organization:** Components are stored in a dedicated folder (e.g., components/) and are organized by functionality. For example, elements for the sidebar, header, tip cards, and more are broken out into their own files.
*   **Reusability:** By designing clear, self-contained components, the same pieces can be reused across different pages, which reduces the amount of code duplication. This makes the application easier to maintain and scale over time.
*   **Helper Functions:** We use a helper function called `cn()` for conditional class names, making it straightforward to toggle and combine CSS classes based on our component’s state or context.

## 5. State Management

To handle data and interactions smoothly across the application, we manage state with a combination of tools:

*   **Zustand + Persist:** Zustand is our state management library, chosen for its simplicity and minimal setup. The persistence middleware makes sure that user preferences (like theme settings) are saved even after the browser is closed.
*   **Data Sharing:** Global states, such as user authentication details and project data, are stored in central stores. This way, any change gets reflected across relevant components quickly and consistently, ensuring a smooth user experience.

## 6. Routing and Navigation

Navigation in ContextCraft is designed to be intuitive:

*   **Routing:** Using Next.js’s App Router, pages are defined by their file structure. For instance, the new project wizard flows across multiple pages (e.g., `/new-project`, `/new-project/select-ai`, `/new-project/questionnaire`, and `/new-project/create-docs`). This makes it easy to manage navigation as the application grows.
*   **Navigation Structure:** A fixed sidebar provides access to common actions like theme toggle and logout, while breadcrumbs and floating action panels help users navigate the project creation flow. Each section is separated clearly, ensuring users always know where they are in the process.

## 7. Performance Optimization

Ensuring our platform is quick and responsive is critical. Our optimization strategies include:

*   **Lazy Loading:** Components that aren't immediately visible are loaded on demand, which keeps the main bundle light and speeds up initial page loads.
*   **Code Splitting:** Next.js automatically splits code to ensure that users only load what they need, reducing unnecessary network requests.
*   **Asset Optimization:** Images, fonts, and other assets are optimized, ensuring the app runs smoothly even on slower connections.

These strategies contribute directly to a more responsive and enjoyable user experience, even as the app evolves and grows.

## 8. Testing and Quality Assurance

To maintain a high level of code quality and dependability, a comprehensive testing strategy is in place:

*   **Unit Testing:** Individual components are tested using Vitest, ensuring that each piece functions as intended in isolation.
*   **Integration Testing:** We employ React Testing Library to simulate how components interact with each other, ensuring that combined parts work seamlessly.
*   **End-to-End Testing:** Although not detailed here, end-to-end tests are planned or in progress to confirm that the user flows work across the entire application.
*   **Example:** There is a sample Vitest test for the `ToolCard` component to ensure it behaves correctly within our UI.

## 9. Conclusion and Overall Frontend Summary

This document has outlined the guiding principles and technologies behind the ContextCraft frontend:

*   We use a modern stack (Next.js 14, TypeScript, Tailwind CSS) that delivers a scalable and maintainable codebase.
*   Our design principles focus on usability, accessibility, and responsive, engaging interfaces that cater to both desktop users and mobile/tablet visitors.
*   Styling is handled via Tailwind CSS with a custom theme that emphasizes modern, flat design, combined with hints of glassmorphism in interactive elements.
*   We maintain a robust component-based architecture that makes it easier to develop, test, and reuse UI pieces.
*   State management with Zustand and persistent stores ensures that application data flows smoothly and remains consistent.
*   Routing is seamlessly managed by the Next.js App Router, and performance optimizations are built into the development framework.
*   Rigorous testing practices are in place to ensure quality and reliability of the frontend code.

With these guidelines, the ContextCraft frontend is designed to deliver a reliable, high-performance experience that meets the needs of developers and product managers alike. Each element is carefully constructed to minimize technical debt while providing flexibility for future growth.

Run locally: pnpm i && pnpm dev

We hope this document provides clear insight into our frontend setup. Happy coding!
