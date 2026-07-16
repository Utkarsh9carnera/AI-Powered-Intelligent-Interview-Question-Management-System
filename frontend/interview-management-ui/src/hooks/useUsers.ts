import { useEffect, useState } from "react";
import userService from "../services/userService";

import type { User, UserQuery } from "../types/user";

export const useUsers = (query: UserQuery) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, [query]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await userService.getUsers(query);

      setUsers(response.data.items);
      setTotalCount(response.data.totalCount);
      setTotalPages(response.data.totalPages);

      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    totalCount,
    totalPages,
    loading,
    error,
    refresh: loadUsers,
  };
};