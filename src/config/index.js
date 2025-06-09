// config/index.js
export const API_BASE_URL = 'http://18.231.86.136:3000'; // Sua API

// Configurações do S3
export const S3_CONFIG = {
  BUCKET_NAME: 'taskly-avatar',
  REGION: 'sa-east-1',
  BASE_URL: 'https://taskly-avatar.s3.sa-east-1.amazonaws.com', // VERIFIQUE ISSO COM CUIDADO!
  AVATARS_PATH: 'avatars',
  DEFAULT_AVATAR_ID: 'avatar_1',
};

// Helper para construir URLs completas de avatares no S3
export const getS3FullAvatarUrl = (avatarId) => {
  const finalAvatarId = avatarId || S3_CONFIG.DEFAULT_AVATAR_ID;
  return `<span class="math-inline">\{S3\_CONFIG\.BASE\_URL\}/</span>{S3_CONFIG.AVATARS_PATH}/${finalAvatarId}.png`;
};