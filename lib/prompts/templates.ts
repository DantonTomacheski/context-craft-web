/**
 * Baseline document templates used by the document generation API
 * These templates help structure the prompt for each document type
 */

export const documentTemplates = {
  // Product Requirements Document (PRD) - Highest priority
  prd: `
# Project Requirements Document (PRD) for {{projectName}}

## 1. Project Overview

{{projectName}} is {{description}}

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

* [Key feature 1]
* [Key feature 2]
* [Key feature 3]

**Out-of-Scope:**

* [Non-feature 1]
* [Non-feature 2]

## 3. User Flow

[Describe the main user flow]

## 4. Features and Requirements

* **Feature 1:**
  * Requirement 1.1
  * Requirement 1.2

* **Feature 2:**
  * Requirement 2.1
  * Requirement 2.2

## 5. Tech Stack & Tools

* **Frontend:**
  * [Frontend technologies]

* **Backend:**
  * [Backend technologies]

* **Testing:**
  * [Testing approach]

## 6. Non-Functional Requirements

* **Performance:**
  * [Performance requirements]

* **Security:**
  * [Security requirements]

## 7. Constraints & Assumptions

* [List constraints and assumptions]

## 8. Known Issues & Potential Pitfalls

* [List known issues and potential pitfalls]
`,

  // Application Flow Document
  appFlow: `
# {{projectName}} App Flow Document

## Onboarding and Sign-In/Sign-Up

[Describe onboarding and sign-in/sign-up flow]

## Main Dashboard or Home Page

[Describe main dashboard or home page]

## Detailed Feature Flows and Page Transitions

[Describe detailed feature flows and page transitions]

## Settings and Account Management

[Describe settings and account management]

## Error States and Alternate Paths

[Describe error states and alternate paths]

## Conclusion and Overall App Journey

[Summarize the overall user journey]
`,

  // Tech Stack Document
  techStack: `
# Tech Stack Document for {{projectName}}

This document outlines the choices behind the technologies used in {{projectName}} in plain, everyday language.

## Frontend Technologies

[Describe frontend technologies]

## Backend Technologies

[Describe backend technologies]

## Infrastructure and Deployment

[Describe infrastructure and deployment]

## Third-Party Integrations

[Describe third-party integrations]

## Security and Performance Considerations

[Describe security and performance considerations]

## Conclusion and Overall Tech Stack Summary

[Summarize the overall tech stack]
`,

  // Backend Structure Document
  backendStructure: `
# Backend Structure Document for {{projectName}}

## Database Schema and Entity Relationships

[Describe database schema and entity relationships]

## API Endpoints and Routes

[Describe API endpoints and routes]

## Authentication and Authorization

[Describe authentication and authorization]

## Data Processing and Business Logic

[Describe data processing and business logic]

## External Integrations

[Describe external integrations]

## Error Handling and Logging

[Describe error handling and logging]

## Scalability and Performance Considerations

[Describe scalability and performance considerations]

## Security Measures

[Describe security measures]

## Conclusion and Overall Backend Architecture Summary

[Summarize the overall backend architecture]
`,

  // Frontend Guidelines Document
  frontendGuidelines: `
# {{projectName}} Frontend Guideline Document

Welcome to the Frontend Guideline Document for {{projectName}}. 

## 1. Frontend Architecture

[Describe frontend architecture]

## 2. Design Principles

[Describe design principles]

## 3. Styling and Theming

[Describe styling and theming]

## 4. Component Structure

[Describe component structure]

## 5. State Management

[Describe state management]

## 6. Routing and Navigation

[Describe routing and navigation]

## 7. Performance Optimization

[Describe performance optimization]

## 8. Testing and Quality Assurance

[Describe testing and quality assurance]

## 9. Conclusion and Overall Frontend Summary

[Summarize the overall frontend architecture]
`,

  // Implementation Plan
  implementationPlan: `
# Implementation plan for {{projectName}}

## Phase 1: Environment Setup

[Describe environment setup steps]

## Phase 2: Frontend Development

[Describe frontend development steps]

## Phase 3: Backend Development

[Describe backend development steps]

## Phase 4: Integration

[Describe integration steps]

## Phase 5: Deployment

[Describe deployment steps]

---

**Run locally:**

\`\`\`bash
pnpm i && pnpm dev
\`\`\`

This completes the step-by-step implementation plan for {{projectName}}. Make sure to follow each step carefully and validate at each phase to ensure smooth development and seamless integration.
`
};
