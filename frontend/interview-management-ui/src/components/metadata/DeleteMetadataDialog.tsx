import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import type { Metadata } from "../../types/metadata";

type DeleteMetadataDialogProps = {
  open: boolean;

  metadata?: Metadata;

  onClose: () => void;

  onConfirm: () => Promise<void>;
};

function DeleteMetadataDialog({
  open,
  metadata,
  onClose,
  onConfirm,
}: DeleteMetadataDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Metadata
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete
          metadata{" "}
          <strong>
            "{metadata?.value}"
          </strong>
          ?
        </Typography>

        <Typography
          variant="body2"
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

export default DeleteMetadataDialog;