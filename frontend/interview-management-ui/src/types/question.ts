export interface Question {
  id: string;

  title: string;

  description: string;

  answer: string;

  topic: string;

  difficulty: string;

  isActive: boolean;

  createdBy: string;

  createdByName: string;

  createdAt: string;

  updatedAt?: string;
}