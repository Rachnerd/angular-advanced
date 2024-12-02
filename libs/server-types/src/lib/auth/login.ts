import { ApiUser } from './user';

export interface ApiLoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  // https://github.com/vercel/ms
  expiresIn: string;
  user: Omit<ApiUser, 'password'>;
}

export interface ApiLoginRequest {
  username: string;
  password: string;
}
