export interface Role {
  id: string;
  roleName: string;
}

export interface RoleResponse {
  success: boolean;
  message: string;
  data: Role[];
}