export interface ApiUser {
  password: string;
  role: 'admin' | 'user';
  name: string;
}
