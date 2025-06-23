// src/types/index.ts

export interface Post {
    id: number;
    title: string;
    content: string;
    author_email: number;
    created_at: string;
  }
export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}  