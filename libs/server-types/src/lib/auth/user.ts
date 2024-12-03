export interface ApiUser {
  id: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}
