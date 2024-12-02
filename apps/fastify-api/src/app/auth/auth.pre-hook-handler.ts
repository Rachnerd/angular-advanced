import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../config/jwt.config';

declare module 'fastify' {
  interface FastifyRequest {
    user?: jwt.JwtPayload;
  }
}

export interface AuthenticatedRequest extends FastifyRequest {
  user?: jwt.JwtPayload;
}

export const authenticate = async (
  request: AuthenticatedRequest,
  reply: FastifyReply,
) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    (request as AuthenticatedRequest).user = decoded as jwt.JwtPayload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return reply.code(401).send({
        error: 'Token expired',
        code: 'TOKEN_EXPIRED',
      });
    }
    return reply.code(401).send({ error: 'Invalid token' });
  }
};
