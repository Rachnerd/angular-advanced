import { FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify';
import { ApiUser } from '@angular-advanced/server-types';

export const checkRole = (roles: ApiUser['role'][]): preHandlerHookHandler => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      if (!request.user) {
        throw new Error('User not authenticated');
      }

      if (!roles.includes(request.user.role)) {
        throw new Error('Insufficient permissions');
      }
    } catch (err) {
      const error = err as Error;
      reply.code(403).send({ error: error.message });
    }
  };
};
