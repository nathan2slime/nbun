import pino from 'pino';

export const logger = pino({
  name: 'nbun',
  timestamp: true,
});
