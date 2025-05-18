import { UserRole } from 'src/user/entities/user.entity';

export class SignupDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole; // optional role
}
