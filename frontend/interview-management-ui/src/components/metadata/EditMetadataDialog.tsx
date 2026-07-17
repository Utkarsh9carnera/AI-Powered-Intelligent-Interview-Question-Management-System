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

import type { Metadata } from "../../types/metadata";
import type { UpdateMetadataRequest } from "../../types/metadata";

type Props = {
  open: boolean;

  metadata?: Metadata;

  onClose: () => void;

  onSave: (
    data: UpdateMetadataRequest
  ) => Promise<void>;
};

function EditMetadataDialog({
  open,
  metadata,
  onClose,
  onSave,
}: Props) {
  const [type, setType] =
    useState("");

  const [value, setValue] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  useEffect(() => {
    if (metadata) {
      setType(metadata.type);
      setValue(metadata.value);
      setDescription(
        metadata.description ?? ""
      );
    }
  }, [metadata]);

  const handleSave =
    async () => {
      await onSave({
        type,
        value,
        description,
      });

      onClose();
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Edit Metadata
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={3}
          sx={{
            mt: 2,
          }}
        >
          <TextField
            label="Type"
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
          />

          <TextField
            label="Value"
            value={value}
            onChange={(e) =>
              setValue(
                e.target.value
              )
            }
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditMetadataDialog;