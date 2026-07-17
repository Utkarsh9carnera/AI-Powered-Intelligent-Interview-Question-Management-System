import { useEffect, useState } from "react";

import questionService, {
  type CreateQuestionRequest,
  type UpdateQuestionRequest,
} from "../services/questionService";

import type { Question } from "../types/question";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const response =
        await questionService.getQuestions();

      setQuestions(response.data.data);

      setError("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to load questions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const createQuestion = async (
    data: CreateQuestionRequest
  ) => {
    await questionService.createQuestion(data);

    await loadQuestions();
  };

  const updateQuestion = async (
    id: string,
    data: UpdateQuestionRequest
  ) => {
    await questionService.updateQuestion(
      id,
      data
    );

    await loadQuestions();
  };

  const deleteQuestion = async (
    id: string
  ) => {
    await questionService.deleteQuestion(
      id
    );

    await loadQuestions();
  };

  return {
    questions,
    loading,
    error,
    refresh: loadQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
}