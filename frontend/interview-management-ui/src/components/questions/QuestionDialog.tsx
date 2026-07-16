import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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

  const [title, setTitle] =
    useState("");

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

    await onSave(payload);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            label="Question Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Answer"
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            multiline
            rows={5}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>
              Topic
            </InputLabel>

            <Select
              value={selectedTopic}
              label="Topic"
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
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Difficulty
            </InputLabel>

            <Select
              value={
                selectedDifficulty
              }
              label="Difficulty"
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
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {question
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuestionDialog;