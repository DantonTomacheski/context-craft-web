# ContextCraft Backend Structure Document

This document explains the backend architecture for ContextCraft in everyday language. It covers how data is stored, secured, and served to meet the project’s requirements, ensuring excellent performance, scalability, and maintainability.

## 1. Backend Architecture

The backend of ContextCraft is built using a modern serverless and microservice approach. It uses the following key design patterns and services:

- **Serverless Edge Functions:** We run our asynchronous processes (like document generation) using Edge Functions written in TypeScript. This ensures fast response times and easy scaling.
- **Supabase as the Core Backend Service:** Supabase is used for managing the Postgres database, storage, and enforcing row-level security. It replaces a traditional monolithic backend, keeping our services simple and maintainable.
- **Authentication Integration:** We integrate with Clerk Auth to manage user authentication and roles, ensuring that every API request is properly authenticated and authorized.
- **Layered Architecture:** The design separates concerns into different layers – authentication, data management, business logic, and API routing – which makes the system easier to maintain and scale.

This architecture is designed to scale automatically when user demand increases, and it makes updates and additions easier without affecting the entire project.

## 2. Database Management

ContextCraft uses a SQL database hosted on Supabase with Postgres. Here’s how we manage our data:

- **Database Type:** SQL
- **Specific Technology:** Postgres provided by Supabase
- **Data Management Practices Include:**
  - **Row-Level Security (RLS):** This ensures that each user only accesses data they’re allowed to see.
  - **Structured Tables:** The core tables contain projects, documents, users, version history, and audit logs.
  - **Backup and Recovery:** Regular backups are taken and a soft-delete mechanism with a 30-day purge window ensures data can be recovered if needed.
  - **Data Compliance:** Features for GDPR exports and deletions are integrated to respect user privacy.

## 3. Database Schema

The database is organized into several human-friendly tables. The following schema outlines the main tables and their relationships:

**Human-readable Overview:**
- **Users Table:** Contains user profiles and authentication details. Fields include:
  - User ID
  - Email
  - Name
  - Role (Admin, User, Guest)
  - Timestamps for creation and updates

- **Projects Table:** Stores project information created by a user. Fields include:
  - Project ID
  - Title
  - Description
  - Owner User ID
  - Creation date
  - Status

- **Document Versions Table:** Each time a document is generated or edited, a new version is saved. Fields include:
  - Version ID
  - Project ID
  - Document content (markdown format)
  - Timestamp
  - Change summary

- **Audit Logs Table:** Logs every significant action taken in the system. Fields include:
  - Audit Log ID
  - User ID
  - Action performed
  - Target resource ID
  - Timestamp
  - IP address

Below is a simplified SQL schema for these tables in PostgreSQL:

/* Users Table */
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100),
    role VARCHAR(50) NOT NULL, -- Roles: 'Admin', 'User', 'Guest'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Projects Table */
CREATE TABLE projects (
    project_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID REFERENCES users(user_id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Document Versions Table */
CREATE TABLE doc_versions (
    version_id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(project_id),
    content TEXT NOT NULL,
    change_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Audit Logs Table */
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    action VARCHAR(255) NOT NULL,
    target_id UUID,
    ip VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## 4. API Design and Endpoints

Our APIs adopt a RESTful design with a clear separation of endpoints. Some key elements include:

- **Endpoint Style:** RESTful requests, with endpoints defined in the Next.js API routes.
- **Edge Function for AI Generation:** There is a dedicated endpoint (`/api/generate-docs/route.ts`) that triggers an asynchronous process to generate project documentation.
- **Authentication:** Every API call checks a JWT provided by Clerk with the `app_metadata.role` integrated directly on the server for role-based access control.
- **Version Handling:** API endpoints allow creating, reading, updating, and deleting user projects and document versions.

## 5. Hosting Solutions

The hosting is designed to offer reliability, scalability, and cost-effectiveness:

- **Cloud Providers:**
  - **Vercel:** Hosts the Next.js frontend and server-side functions.
  - **Supabase:** Handles the Postgres database, authentication, and storage.

Benefits include:

- **Reliability:** Both Vercel and Supabase have robust infrastructures with high uptime guarantees.
- **Scalability:** Serverless functions and cloud databases scale automatically based on demand.
- **Cost-Effectiveness:** Pay-as-you-go pricing models ensure that costs are aligned with usage, with minimal upfront investment.

## 6. Infrastructure Components

Several infrastructure components enhance the overall performance:

- **Load Balancers:** Managed by Vercel and cloud providers to distribute incoming traffic evenly, ensuring smooth user experiences during high loads.
- **Caching Mechanisms:** Utilized at both the API and database levels to reduce load times and improve responsiveness.
- **Content Delivery Networks (CDNs):** Vercel automatically distributes static assets globally, ensuring that content is served quickly no matter where users are located.
- **Edge Functions:** Provide localized computing power that decreases latency for triggering AI generation processes.

## 7. Security Measures

Security is a high priority for ContextCraft. The following measures are implemented:

- **Authentication and Authorization:**
  - Clerk Auth manages secure user login, including email/password, social login, and multi-factor authentication (MFA).
  - Row-Level Security in Supabase ensures users access only their data.
- **Data Encryption:** All sensitive data is encrypted in transit (HTTPS) and secure cookies (with same-site lax settings) are used.
- **Environment Variables:** Secrets are stored in server environment variables and are never exposed to the client.
- **Audit Trails:** The `audit_logs` table tracks user actions with timestamps and IP addresses for accountability.
- **Regular Backups:** The database is backed up at regular intervals, minimizing the risk of data loss.
- **Compliance:** GDPR endpoints for data export and deletion help ensure compliance with data privacy regulations.

## 8. Monitoring and Maintenance

To keep the backend running smoothly, the following practices and tools are in place:

- **Performance Monitoring:** Tools provided by both Supabase and Vercel are used to monitor server performance, API response times, and error rates.
- **Logging:** Comprehensive logs capture all API interactions and Edge Function errors to diagnose issues promptly.
- **Scheduled Maintenance:** Routine maintenance tasks and updates are planned to keep dependencies current and to patch vulnerabilities.
- **Alerting:** Real-time alerts notify the development team of potential issues before they impact users.

## 9. Conclusion and Overall Backend Summary

In summary, the ContextCraft backend structure is designed with modern techniques to ensure it is:

- **Scalable:** Thanks to serverless edge functions and cloud services from Vercel and Supabase.
- **Efficient:** With a clear RESTful API design, robust database management, and caching/CDN integrations that keep performance high.
- **Secure:** Implementing best practices for authentication, authorization, data encryption, and comprehensive logging.
- **Maintainable:** A clean separation of concerns and layered architecture simplifies updates and future expansions.

This backend setup not only meets current project needs but also provides a strong foundation for future growth and feature additions. The use of Supabase (Postgres, Storage, and RLS), coupled with secure authentication via Clerk and fast deployment on Vercel, distinguishes ContextCraft as a modern, reliable solution in the realm of automated project documentation.

_Run locally: pnpm i && pnpm dev_