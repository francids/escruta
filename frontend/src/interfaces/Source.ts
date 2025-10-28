export default interface Source {
  id: string;
  notebookId: string;
  icon?: string;
  title: string;
  content?: string;
  isConvertedByAi: boolean;
  summary?: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
