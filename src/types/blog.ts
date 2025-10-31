import { User } from "./user";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  thumbnail: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  user?: User;
}
