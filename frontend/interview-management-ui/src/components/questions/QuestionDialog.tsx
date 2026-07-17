import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import type { Question } from "../../types/question";
import { useMetadata } from "../../hooks/useMetadata";
import type {
  CreateQuestionRequest,
  UpdateQuestionRequest,
} from "../../services/questionService";

type QuestionDialogProps = {
  open: boolean;

  onClose: () => void;

  onSave: (
    data:
      | CreateQuestionRequest
      | UpdateQuestionRequest
  ) => Promise<void>;

  question?: Question;

  createdBy?: string;
};

function QuestionDialog({
  open,
  onClose,
  onSave,
  question,
  createdBy,
}: QuestionDialogProps) {
  const { metadata } = useMetadata();

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [selectedTopic, setSelectedTopic] =
    useState("");

  const [
    selectedDifficulty,
    setSelectedDifficulty,
  ] = useState("");

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    answer: false,
    topic: false,
    difficulty: false,
  });

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setDescription(
        question.description
      );
      setAnswer(question.answer);
      setSelectedTopic(
        question.topic
      );
      setSelectedDifficulty(
        question.difficulty
      );
    } else {
      setTitle("");
      setDescription("");
      setAnswer("");
      setSelectedTopic("");
      setSelectedDifficulty("");
    }

    setErrors({
      title: false,
      description: false,
      answer: false,
      topic: false,
      difficulty: false,
    });

    setSaving(false);
  }, [question, open]);

  const topics = metadata.filter(
    (m) => m.type === "Topic"
  );

  const difficulties =
    metadata.filter(
      (m) =>
        m.type === "Difficulty"
    );

  const handleSave = async () => {
    const validation = {
      title: title.trim() === "",
      description:
        description.trim() === "",
      answer: answer.trim() === "",
      topic: selectedTopic === "",
      difficulty:
        selectedDifficulty === "",
    };

    setErrors(validation);

    if (
      Object.values(validation).some(
        Boolean
      )
    ) {
      return;
    }

    const metadataIds =
      metadata
        .filter(
          (m) =>
            m.value ===
              selectedTopic ||
            m.value ===
              selectedDifficulty
        )
        .map((m) => m.id);

    const payload = question
      ? ({
          title,
          description,
          answer,
          metadataIds,
        } as UpdateQuestionRequest)
      : ({
          title,
          description,
          answer,
          createdBy:
            createdBy ?? "",
          metadataIds,
        } as CreateQuestionRequest);

    try {
      setSaving(true);

      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    answer.trim() !== "" &&
    selectedTopic !== "" &&
    selectedDifficulty !== "";

  return (
    <Dialog
      open={open}
      onClose={
        saving ? undefined : onClose
      }
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {question
          ? "Edit Question"
          : "Add Question"}
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={3}
          sx={{
            mt: 2,
          }}
        >
          <TextField
            label="Question Title *"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            error={errors.title}
            helperText={
              errors.title
                ? "Question title is required."
                : ""
            }
            fullWidth
          />

          <TextField
            label="Description *"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            error={errors.description}
            helperText={
              errors.description
                ? "Description is required."
                : ""
            }
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Answer *"
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            error={errors.answer}
            helperText={
              errors.answer
                ? "Answer is required."
                : ""
            }
            multiline
            rows={5}
            fullWidth
          />

          <FormControl
            fullWidth
            error={errors.topic}
          >
            <InputLabel>
              Topic *
            </InputLabel>

            <Select
              value={selectedTopic}
              label="Topic *"
              onChange={(e) =>
                setSelectedTopic(
                  e.target.value
                )
              }
            >
              {topics.map((topic) => (
                <MenuItem
                  key={topic.id}
                  value={topic.value}
                >
                  {topic.value}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {errors.topic
                ? "Please select a topic."
                : ""}
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={
              errors.difficulty
            }
          >
            <InputLabel>
              Difficulty *
            </InputLabel>

            <Select
              value={
                selectedDifficulty
              }
              label="Difficulty *"
              onChange={(e) =>
                setSelectedDifficulty(
                  e.target.value
                )
              }
            >
              {difficulties.map(
                (
                  difficulty
                ) => (
                  <MenuItem
                    key={
                      difficulty.id
                    }
                    value={
                      difficulty.value
                    }
                  >
                    {
                      difficulty.value
                    }
                  </MenuItem>
                )
              )}
            </Select>

            <FormHelperText>
              {errors.difficulty
                ? "Please select a difficulty."
                : ""}
            </FormHelperText>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            !isFormValid ||
            saving
          }
        >
          {saving
            ? "Saving..."
            : question
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuestionDialog;