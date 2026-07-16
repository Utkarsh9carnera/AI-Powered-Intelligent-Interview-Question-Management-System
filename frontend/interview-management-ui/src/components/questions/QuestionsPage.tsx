import { useMemo, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useQuestions } from "../../hooks/useQuestions";

import QuestionHeader from "./QuestionHeader";
import QuestionStatistics from "./QuestionStatistics";
import QuestionFilters from "./QuestionFilters";
import QuestionTable from "./QuestionTable";

function QuestionsPage() {
  const [globalSearch, setGlobalSearch] = useState("");

  const [search, setSearch] = useState("");

  const [topic, setTopic] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [status, setStatus] = useState("");

  const {
    questions,
    loading,
    error,
  } = useQuestions();

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        search === "" ||
        question.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTopic =
        topic === "" ||
        question.topic === topic;

      const matchesDifficulty =
        difficulty === "" ||
        question.difficulty === difficulty;

      const matchesStatus =
        status === "" ||
        String(question.isActive) === status;

      return (
        matchesSearch &&
        matchesTopic &&
        matchesDifficulty &&
        matchesStatus
      );
    });
  }, [
    questions,
    search,
    topic,
    difficulty,
    status,
  ]);

  const total = filteredQuestions.length;

  const active = filteredQuestions.filter(
    (question) => question.isActive
  ).length;

  const inactive = filteredQuestions.filter(
    (question) => !question.isActive
  ).length;

  const topics = new Set(
    filteredQuestions.map(
      (question) => question.topic
    )
  ).size;

  const newThisMonth =
    filteredQuestions.filter((question) => {
      const created = new Date(
        question.createdAt
      );

      const today = new Date();

      return (
        created.getMonth() ===
          today.getMonth() &&
        created.getFullYear() ===
          today.getFullYear()
      );
    }).length;

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <QuestionHeader
        search={globalSearch}
        onSearchChange={setGlobalSearch}
      />

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent:
            "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Manage Questions
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
            }}
          >
            View, search, edit and organize
            interview questions.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            px: 4,
            height: 48,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          + Add Question
        </Button>
      </Stack>

      <QuestionStatistics
        total={total}
        active={active}
        inactive={inactive}
        topics={topics}
        newThisMonth={newThisMonth}
      />

      <QuestionFilters
        search={search}
        onSearchChange={setSearch}
        topic={topic}
        onTopicChange={setTopic}
        difficulty={difficulty}
        onDifficultyChange={
          setDifficulty
        }
        status={status}
        onStatusChange={setStatus}
      />

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography
          sx={{
            mt: 3,
            color: "error.main",
          }}
        >
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <QuestionTable
          questions={filteredQuestions}
        />
      )}
    </Box>
  );
}

export default QuestionsPage;