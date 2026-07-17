import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { Question } from "../../types/question";

type QuestionTableProps = {
  questions: Question[];

  onEdit: (question: Question) => void;

  onDelete: (question: Question) => void;
};

function QuestionTable({
  questions,
  onEdit,
  onDelete,
}: QuestionTableProps) {
  const difficultyColor = (
    difficulty: string
  ) => {
    switch (difficulty) {
      case "Easy":
        return {
          bgcolor: "#DCFCE7",
          color: "#15803D",
        };

      case "Medium":
        return {
          bgcolor: "#FEF3C7",
          color: "#B45309",
        };

      default:
        return {
          bgcolor: "#FEE2E2",
          color: "#DC2626",
        };
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Question Title
            </TableCell>

            <TableCell>
              Topic
            </TableCell>

            <TableCell>
              Difficulty
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell>
              Created On
            </TableCell>

            <TableCell>
              Created By
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {questions.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{
                  py: 6,
                }}
              >
                <Typography
                  sx={{
                    color: "#64748B",
                  }}
                >
                  No questions found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>
                  {question.title}
                </TableCell>

                <TableCell>
                  <Chip
                    label={question.topic}
                    size="small"
                    sx={{
                      bgcolor: "#EEF2FF",
                      color: "#2563EB",
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={question.difficulty}
                    size="small"
                    sx={difficultyColor(
                      question.difficulty
                    )}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      question.isActive
                        ? "Active"
                        : "Inactive"
                    }
                    size="small"
                    sx={{
                      bgcolor:
                        question.isActive
                          ? "#DCFCE7"
                          : "#FEE2E2",
                      color:
                        question.isActive
                          ? "#15803D"
                          : "#DC2626",
                    }}
                  />
                </TableCell>

                <TableCell>
                  {new Date(
                    question.createdAt
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {question.createdByName}
                </TableCell>

                <TableCell align="center">
                  <IconButton
  size="small"
  onClick={() => onEdit(question)}
>
  <EditOutlinedIcon fontSize="small" />
</IconButton>

<IconButton
  size="small"
  color="error"
  onClick={() => onDelete(question)}
>
  <DeleteOutlineOutlinedIcon
    fontSize="small"
  />
</IconButton>

                  <IconButton size="small">
                    
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default QuestionTable;