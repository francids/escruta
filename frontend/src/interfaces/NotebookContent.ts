import type User from "./User";
import type Note from "./Note";
import type Source from "./Source";

export default interface NotebookContent {
  id: string;
  icon?: string;
  title: string;
  user: User;
  notes: Note[];
  sources: Source[];
  createdAt: Date;
  updatedAt: Date;
}
