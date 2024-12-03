import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import {
  ApiLoginRequest,
  ApiLoginResponse,
  ApiLogoutRequest,
  ApiRefreshRequest,
  ApiUser,
} from '@angular-advanced/server-types';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../config/jwt.config';

const refreshTokens = new Set<string>();

const users = new Map<string, ApiUser>([
  ['admin', { password: 'admin123', name: 'Admin', role: 'admin', id: '1' }],
  [
    'test@example.com',
    { password: 'password', name: 'John', role: 'user', id: '2' },
  ],
]);

function generateTokens(payload: object) {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  refreshTokens.add(refreshToken);
  return { accessToken, refreshToken };
}

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/auth/login',
    async (
      request: FastifyRequest<{ Body: ApiLoginRequest }>,
      reply: FastifyReply,
    ): Promise<ApiLoginResponse> => {
      const { username, password } = request.body;

      const user = users.get(username);

      if (!user || user.password !== password) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      const { accessToken, refreshToken } = generateTokens({
        id: user.id,
        username,
        role: user.role,
      });

      return {
        accessToken,
        refreshToken,
        tokenType: 'Bearer',
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      };
    },
  );

  fastify.post(
    '/auth/refresh',
    async (
      request: FastifyRequest<{ Body: ApiRefreshRequest }>,
      reply: FastifyReply,
    ): Promise<Omit<ApiLoginResponse, 'user'>> => {
      try {
        const { refreshToken } = request.body;

        // Verify refresh token exists
        if (!refreshTokens.has(refreshToken)) {
          return reply.code(401).send({ error: 'Invalid refresh token' });
        }

        // Verify and decode refresh token
        const decoded = jwt.verify(
          refreshToken,
          JWT_REFRESH_SECRET,
        ) as jwt.JwtPayload;

        // Generate new tokens
        const tokens = generateTokens({
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
        });

        // Invalidate old refresh token
        refreshTokens.delete(refreshToken);

        return {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          tokenType: 'Bearer',
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        };
      } catch (e) {
        console.error(e);
        refreshTokens.delete(request.body.refreshToken);
        return reply.code(401).send({ error: 'Invalid refresh token' });
      }
    },
  );

  // Logout endpoint
  fastify.post(
    '/auth/logout',
    async (request: FastifyRequest<{ Body: ApiLogoutRequest }>) => {
      const { refreshToken } = request.body;
      refreshTokens.delete(refreshToken);
      return { message: 'Logged out successfully' };
    },
  );
}
