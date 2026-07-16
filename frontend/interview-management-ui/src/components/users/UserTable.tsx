import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import type { User } from "../../types/user";

type UserTableProps = {
  users: User[];
};

function UserTable({ users }: UserTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "#F8FAFC",
            }}
          >
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow
              hover
              key={user.id}
            >
              <TableCell>
                <Stack
                  sx={{
                    flexDirection: "row",
                    spacing: 2,
                    alignItems: "center",
                  }}
                >
                  <Avatar>
                    {user.firstName.charAt(0)}
                  </Avatar>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                {user.email.split("@")[0]}
              </TableCell>

              <TableCell>
                <Chip
                  label={user.isActive ? "Active" : "Inactive"}
                  color={user.isActive ? "success" : "default"}
                  size="small"
                />
              </TableCell>

              <TableCell>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "Never"}
              </TableCell>

              <TableCell align="center">
                <IconButton color="primary">
                  <EditOutlinedIcon />
                </IconButton>

                <IconButton color="error">
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{
                  py: 5,
                }}
              >
                <Typography color="text.secondary">
                  No Question Managers found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default UserTable;