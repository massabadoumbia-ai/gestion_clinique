export interface UserDto {
  id?: number;
  lastname: string;
  firstname: string;
  username: string;
  dateNaissance: string;
  adresse: string;
  email: string;
  telephone: string;
  roleName?: string;
  password: string;
  confirmPassword: string;
}

export interface UserResponseDto {
  id?: number;
  lastname: string;
  firstname: string;
  username: string;
  dateNaissance: string;
  adresse: string;
  email: string;
  telephone: string;
  roleName?: string;
  password: string;
  confirmPassword: string;
}
export interface UserRequestDto {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  adresse: string;
  telephone: string;
  dateNaissance: string;
  roleName: string;
}