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