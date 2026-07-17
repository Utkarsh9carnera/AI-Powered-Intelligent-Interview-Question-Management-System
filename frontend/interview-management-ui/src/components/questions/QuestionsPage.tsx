import { useMemo, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useQuestions } from "../../hooks/useQuestions";

import type { Question } from "../../types/question";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import QuestionHeader from "./QuestionHeader";
import QuestionStatistics from "./QuestionStatistics";
import QuestionFilters from "./QuestionFilters";
import QuestionTable from "./QuestionTable";
import QuestionDialog from "./QuestionDialog";
import DeleteQuestionDialog from "./DeleteQuestionDialog";

function QuestionsPage() {
  const [globalSearch, setGlobalSearch] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [topic, setTopic] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedQuestion, setSelectedQuestion] =
    useState<Question>();

  const [deleteOpen, setDeleteOpen] =
    useState(false);
const [snackbar, setSnackbar] =
  useState({
    open: false,
    message: "",
    severity: "success" as
      | "success"
      | "error",
  });
  const [
    deleteQuestionItem,
    setDeleteQuestionItem,
  ] = useState<Question>();

  const user = JSON.parse(
    localStorage.getItem("user") ?? "{}"
  );

  const {
    questions,
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
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
        question.difficulty ===
          difficulty;

      const matchesStatus =
        status === "" ||
        String(question.isActive) ===
          status;

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

  const total =
    filteredQuestions.length;

  const active =
    filteredQuestions.filter(
      (question) =>
        question.isActive
    ).length;

  const inactive =
    filteredQuestions.filter(
      (question) =>
        !question.isActive
    ).length;

  const topics =
    new Set(
      filteredQuestions.map(
        (question) =>
          question.topic
      )
    ).size;

  const newThisMonth =
    filteredQuestions.filter(
      (question) => {
        const created =
          new Date(
            question.createdAt
          );

        const today =
          new Date();

        return (
          created.getMonth() ===
            today.getMonth() &&
          created.getFullYear() ===
            today.getFullYear()
        );
      }
    ).length;

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <QuestionHeader
        search={globalSearch}
        onSearchChange={
          setGlobalSearch
        }
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
              color:
                "text.secondary",
            }}
          >
            View, search, edit and
            organize interview
            questions.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            setSelectedQuestion(
              undefined
            );
            setDialogOpen(true);
          }}
          sx={{
            px: 4,
            height: 48,
            borderRadius: 2,
            textTransform:
              "none",
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
        newThisMonth={
          newThisMonth
        }
      />

      <QuestionFilters
        search={search}
        onSearchChange={
          setSearch
        }
        topic={topic}
        onTopicChange={
          setTopic
        }
        difficulty={
          difficulty
        }
        onDifficultyChange={
          setDifficulty
        }
        status={status}
        onStatusChange={
          setStatus
        }
      />

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "center",
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
            color:
              "error.main",
          }}
        >
          {error}
        </Typography>
      )}

      {!loading &&
        !error && (
          <QuestionTable
            questions={
              filteredQuestions
            }
            onEdit={(
              question
            ) => {
              setSelectedQuestion(
                question
              );
              setDialogOpen(
                true
              );
            }}
            onDelete={(
              question
            ) => {
              setDeleteQuestionItem(
                question
              );
              setDeleteOpen(
                true
              );
            }}
          />
        )}

      <QuestionDialog
        open={dialogOpen}
        question={
          selectedQuestion
        }
        createdBy={user.id}
        onClose={() => {
          setDialogOpen(
            false
          );
          setSelectedQuestion(
            undefined
          );
        }}
        onSave={async (
  data
) => {
  try {
    if (
      selectedQuestion
    ) {
      await updateQuestion(
        selectedQuestion.id,
        data as any
      );

      setSnackbar({
        open: true,
        message:
          "Question updated successfully.",
        severity: "success",
      });
    } else {
      await createQuestion(
        data as any
      );

      setSnackbar({
        open: true,
        message:
          "Question created successfully.",
        severity: "success",
      });
    }

    setDialogOpen(
      false
    );

    setSelectedQuestion(
      undefined
    );
  } catch {
    setSnackbar({
      open: true,
      message:
        selectedQuestion
          ? "Failed to update question."
          : "Failed to create question.",
      severity: "error",
      
    });
  }
}}
      />

      <DeleteQuestionDialog
        open={deleteOpen}
        question={
          deleteQuestionItem
        }
        onClose={() => {
          setDeleteOpen(
            false
          );
          setDeleteQuestionItem(
            undefined
          );
        }}
        onConfirm={async () => {
  if (!deleteQuestionItem) {
    return;
  }

  try {
    await deleteQuestion(
      deleteQuestionItem.id
    );

    setSnackbar({
      open: true,
      message:
        "Question deleted successfully.",
      severity: "success",
    });

    setDeleteOpen(false);
    setDeleteQuestionItem(undefined);
  } catch (err) {
    setSnackbar({
      open: true,
      message:
        "Failed to delete question.",
      severity: "error",
    });
    setDeleteOpen(false);
setDeleteQuestionItem(undefined);
  }
}}
      />
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  onClose={() =>
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }))
  }
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
    onClose={() =>
      setSnackbar((prev) => ({
        ...prev,
        open: false,
      }))
    }
    sx={{
      width: "100%",
    }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </Box>
  );
}

export default QuestionsPage;