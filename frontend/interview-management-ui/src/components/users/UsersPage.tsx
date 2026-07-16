import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import UserFilters from "./UserFilters";
import UserStatistics from "./UserStatistics";
import UserTable from "./UserTable";

import { useUsers } from "../../hooks/useUsers";
import roleService from "../../services/roleService";

import type { UserQuery } from "../../types/user";
import type { Role } from "../../types/role";

type UsersPageProps = {
  title: string;
  description: string;
  buttonText: string;
  roleName: string;
};

function UsersPage({
  title,
  description,
  buttonText,
  roleName,
}: UsersPageProps) {
  const [userSearch, setUserSearch] = useState("");

  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await roleService.getRoles();
        setRoles(response.data);
      } finally {
        setRolesLoading(false);
      }
    };

    loadRoles();
  }, []);

  const roleId = useMemo(() => {
    return (
      roles.find((role) => role.roleName === roleName)?.id ?? ""
    );
  }, [roles, roleName]);

  const query = useMemo<UserQuery>(
    () => ({
      search: userSearch,
      roleId,
      isActive: undefined,
      page: 1,
      pageSize: 10,
      sortBy: "createdDate",
      sortDirection: "desc",
    }),
    [userSearch, roleId]
  );

  const {
    users,
    totalCount,
    loading,
    error,
  } = useUsers(query);

  const activeUsers = users.filter(
    (user) => user.isActive
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.isActive
  ).length;

  const newThisMonth = users.filter((user) => {
    const created = new Date(user.createdDate);
    const today = new Date();

    return (
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  }).length;

  if (rolesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Header */}
      <Stack
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
            {title}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
            }}
          >
            {description}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            px: 4,
            height: 44,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {buttonText}
        </Button>
      </Stack>

      {/* Statistics */}
      <UserStatistics
        total={totalCount}
        active={activeUsers}
        inactive={inactiveUsers}
        newThisMonth={newThisMonth}
      />

      {/* Filters */}
      <Box sx={{ mt: 3 }}>
        <UserFilters
          search={userSearch}
          onSearchChange={setUserSearch}
        />
      </Box>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Typography
          sx={{
            mt: 3,
            color: "error.main",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Table */}
      {!loading && !error && (
        <Box sx={{ mt: 3 }}>
          <UserTable users={users} />
        </Box>
      )}
    </Box>
  );
}

export default UsersPage;