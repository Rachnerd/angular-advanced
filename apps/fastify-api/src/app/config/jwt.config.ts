export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || 'access-secret-key';
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';
export const ACCESS_TOKEN_EXPIRES_IN = '15m';
export const REFRESH_TOKEN_EXPIRES_IN = '7d';
