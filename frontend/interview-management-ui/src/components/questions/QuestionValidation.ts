export const validateQuestion = (
  title: string,
  description: string,
  answer: string,
  topic: string,
  difficulty: string
) => {
  return {
    title: title.trim() !== "",
    description: description.trim() !== "",
    answer: answer.trim() !== "",
    topic: topic !== "",
    difficulty: difficulty !== "",
  };
};