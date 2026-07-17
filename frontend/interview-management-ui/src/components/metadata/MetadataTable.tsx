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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { Metadata } from "../../types/metadata";

type MetadataTableProps = {
  metadata: Metadata[];

  onEdit: (metadata: Metadata) => void;

  onDelete: (metadata: Metadata) => void;
};

function MetadataTable({
  metadata,
  onEdit,
  onDelete,
}: MetadataTableProps) {
  const typeColor = (
    type: string
  ) => {
    switch (type) {
      case "Topic":
        return {
          bgcolor: "#EEF2FF",
          color: "#2563EB",
        };

      case "Difficulty":
        return {
          bgcolor: "#FEF3C7",
          color: "#B45309",
        };

      case "Skill":
        return {
          bgcolor: "#DCFCE7",
          color: "#15803D",
        };

      default:
        return {
          bgcolor: "#F3F4F6",
          color: "#374151",
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
              Type
            </TableCell>

            <TableCell>
              Value
            </TableCell>

            <TableCell>
              Description
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {metadata.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
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
                  No metadata found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            metadata.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Chip
                    label={item.type}
                    size="small"
                    sx={typeColor(item.type)}
                  />
                </TableCell>

                <TableCell>
                  {item.value}
                </TableCell>

                <TableCell>
                  {item.description ||
                    "-"}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() =>
                      onEdit(item)
                    }
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      onDelete(item)
                    }
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
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

export default MetadataTable;