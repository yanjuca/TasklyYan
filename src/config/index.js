// config/index.js
export const API_BASE_URL = 'http://18.231.86.136:3000'; // Sua API

// Configurações do S3
export const S3_CONFIG = {
  BUCKET_NAME: 'taskly-avatar',
  REGION: 'sa-east-1', // ou sua região
  BASE_URL: 'https://taskly-avatar.s3.sa-east-1.amazonaws.com',
  AVATARS_PATH: 'avatars',
  DEFAULT_AVATAR: 'https://taskly-avatar.s3.amazonaws.com/avatars/avatar_1.png'
};

// Helper para construir URLs do S3
export const getS3AvatarUrl = (userId) => {
  return `${S3_CONFIG.BASE_URL}${S3_CONFIG.AVATARS_PATH}/user-${userId}.jpg`;
};