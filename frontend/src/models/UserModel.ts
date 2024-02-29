export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  status: string;
}

export interface UserInfor {
  accessToken: string;
  refreshToken: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
