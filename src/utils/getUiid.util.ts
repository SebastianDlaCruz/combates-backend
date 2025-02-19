import crypto from 'crypto';

export const getUuid = () => {
  return crypto.randomUUID();
}