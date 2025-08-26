export default interface Source {
  id: string;
  notebookId: string;
  icon?: string;
  title: string;
  content?: string;
  summary?: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
