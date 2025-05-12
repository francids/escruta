export default interface Note {
  id: string;
  notebookId: string;
  sourceId?: string;
  icon?: string;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}
