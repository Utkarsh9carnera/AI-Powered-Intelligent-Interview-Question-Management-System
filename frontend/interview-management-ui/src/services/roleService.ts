import api from "./api";

import type { RoleResponse } from "../types/role";

class RoleService {
  async getRoles() {
    const response = await api.get<RoleResponse>("/roles");

    return response.data;
  }
}

export default new RoleService();