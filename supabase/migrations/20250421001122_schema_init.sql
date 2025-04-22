-- Initial schema for ContextCraft
-- Creates tables for projects, documents, document versions, and users
-- Implements Row-Level Security (RLS) rules for role-based access

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  user_id TEXT NOT NULL,
  provider TEXT DEFAULT 'openai',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  current_version_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_document_type CHECK (type IN ('prd', 'app_flow', 'tech_stack', 'backend_structure', 'frontend_guidelines', 'implementation_plan'))
);

-- Document versions table
CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Update the current_version_id in documents when a new version is created
CREATE OR REPLACE FUNCTION update_current_document_version()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE documents
  SET current_version_id = NEW.id, updated_at = NOW()
  WHERE id = NEW.document_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_current_document_version
AFTER INSERT ON document_versions
FOR EACH ROW
EXECUTE FUNCTION update_current_document_version();

-- Implement Row-Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Projects: users can only see their own projects
CREATE POLICY project_select_policy ON projects 
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY project_insert_policy ON projects 
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY project_update_policy ON projects 
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY project_delete_policy ON projects 
  FOR DELETE USING (user_id = auth.uid());

-- Documents: users can only access documents for projects they own
CREATE POLICY document_select_policy ON documents 
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

CREATE POLICY document_insert_policy ON documents 
  FOR INSERT WITH CHECK (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

CREATE POLICY document_update_policy ON documents 
  FOR UPDATE USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

CREATE POLICY document_delete_policy ON documents 
  FOR DELETE USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

-- Document versions: users can only access versions for documents they own
CREATE POLICY document_version_select_policy ON document_versions 
  FOR SELECT USING (
    document_id IN (
      SELECT d.id FROM documents d
      JOIN projects p ON d.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY document_version_insert_policy ON document_versions 
  FOR INSERT WITH CHECK (
    document_id IN (
      SELECT d.id FROM documents d
      JOIN projects p ON d.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

-- Audit logs: users can only see their own logs
CREATE POLICY audit_log_select_policy ON audit_logs 
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY audit_log_insert_policy ON audit_logs 
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create functions for Clerk Auth integration
CREATE OR REPLACE FUNCTION get_auth_user_id() 
RETURNS TEXT AS $$
BEGIN
  RETURN auth.uid()::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
