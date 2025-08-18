export interface UserDto {
  id?: number;
  lastname: string;
  firstname: string;
  username: string;
  dateNaissance: Date;
  adresse: string;
  email: string;
  telephone: string;
  roleName?: string;
  password: string;
  confirmPassword: string;
}