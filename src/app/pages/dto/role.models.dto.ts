import { PermissionDto, PermissionResponseDto } from "./permission.models.dto";
import { UserDto } from "./user.modols.dto";


export interface RoleDto {
  id?: number;
  name: string;
  description?: string;
}

export interface RoleResponseDto {
  id?: number;
  name: string;
  description?: string;
  users: UserDto[];
  permissions: PermissionResponseDto[];
}
