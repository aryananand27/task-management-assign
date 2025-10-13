
export interface AuthRequest {
  username: string;
  password: string;
}

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  refreshToken: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  userCreated: UserAttributes;
}

export interface LoginResponse {
  message: string;
  refreshToken: string;
  accessToken: string;
  user: UserAttributes;
}

export interface LogoutResponse {
  message: string;
}