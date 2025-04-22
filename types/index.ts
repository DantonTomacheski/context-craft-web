export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
}

export interface DocumentVersion {
  id: string
  documentId: string
  content: string
  createdAt: string
}
