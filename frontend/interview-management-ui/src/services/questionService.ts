import api from "./api";

import type { Question } from "../types/question";

export interface CreateQuestionRequest {
  title: string;
  description: string;
  answer: string;
  createdBy: string;
  metadataIds: string[];
}

export interface UpdateQuestionRequest {
  title: string;
  description: string;
  answer: string;
  metadataIds: string[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const getQuestions = () =>
  api.get<ApiResponse<Question[]>>("/questions");

const createQuestion = (
  data: CreateQuestionRequest
) =>
  api.post<ApiResponse<Question>>(
    "/questions",
    data
  );

const updateQuestion = (
  id: string,
  data: UpdateQuestionRequest
) =>
  api.put<ApiResponse<Question>>(
    `/questions/${id}`,
    data
  );

const deleteQuestion = (
  id: string
) =>
  api.delete<ApiResponse<void>>(
    `/questions/${id}`
  );

export default {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};