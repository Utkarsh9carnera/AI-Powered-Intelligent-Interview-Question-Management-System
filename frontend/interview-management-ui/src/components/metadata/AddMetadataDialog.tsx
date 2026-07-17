import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import type {
  CreateMetadataRequest,
  UpdateMetadataRequest,
} from "../../types/metadata";

import type { Metadata } from "../../types/metadata";

type MetadataDialogProps = {
  open: boolean;

  onClose: () => void;

  onSave: (
    data:
      | CreateMetadataRequest
      | UpdateMetadataRequest
  ) => Promise<void>;

  metadata?: Metadata;
};

function MetadataDialog({
  open,
  onClose,
  onSave,
  metadata,
}: MetadataDialogProps) {
  const [type, setType] =
    useState("");

  const [value, setValue] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({
      type: false,
      value: false,
    });

  useEffect(() => {
    if (metadata) {
      setType(metadata.type);
      setValue(metadata.value);
      setDescription(
        metadata.description ?? ""
      );
    } else {
      setType("");
      setValue("");
      setDescription("");
    }

    setErrors({
      type: false,
      value: false,
    });

    setSaving(false);
  }, [metadata, open]);

  const handleSave =
    async () => {
      const validation = {
        type:
          type.trim() === "",
        value:
          value.trim() === "",
      };

      setErrors(validation);

      if (
        Object.values(
          validation
        ).some(Boolean)
      ) {
        return;
      }

      const payload = {
        type,
        value,
        description,
      };

      try {
        setSaving(true);

        await onSave(
          payload
        );

        onClose();
      } finally {
        setSaving(false);
      }
    };

  const isFormValid =
    type.trim() !== "" &&
    value.trim() !== "";

  return (
    <Dialog
      open={open}
      onClose={
        saving
          ? undefined
          : onClose
      }
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {metadata
          ? "Edit Metadata"
          : "Add Metadata"}
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={3}
          sx={{
            mt: 2,
          }}
        >
          <TextField
            label="Type *"
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
            error={
              errors.type
            }
            helperText={
              errors.type
                ? "Type is required."
                : ""
            }
            fullWidth
          />

          <TextField
            label="Value *"
            value={value}
            onChange={(e) =>
              setValue(
                e.target.value
              )
            }
            error={
              errors.value
            }
            helperText={
              errors.value
                ? "Value is required."
                : ""
            }
            fullWidth
          />

          <TextField
            label="Description"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={
            saving
          }
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={
            handleSave
          }
          disabled={
            !isFormValid ||
            saving
          }
        >
          {saving
            ? "Saving..."
            : metadata
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MetadataDialog;