import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import type { Question } from "../../types/question";

type DeleteQuestionDialogProps = {
  open: boolean;
  question?: Question;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

function DeleteQuestionDialog({
  open,
  question,
  onClose,
  onConfirm,
}: DeleteQuestionDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Question
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontWeight: 600,
          }}
        >
          "{question?.title}"
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
          }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteQuestionDialog;