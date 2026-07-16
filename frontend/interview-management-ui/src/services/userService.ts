import api from "./api";

import type {
  ApiResponse,
  PagedResponse,
  User,
  UserQuery,
} from "../types/user";

class UserService {
  async getUsers(query: UserQuery) {
    const response = await api.get<ApiResponse<PagedResponse<User>>>(
      "/users",
      {
        params: query,
      }
    );

    return response.data;
  }
}

export default new UserService();