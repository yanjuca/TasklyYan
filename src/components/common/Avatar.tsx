// components/Avatar.tsx
import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { S3_CONFIG } from '../config';

interface AvatarProps {
  avatarUrl?: string;
  userId?: string;
  size?: number;
  onPress?: () => void;
  editable?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
  avatarUrl, 
  userId,
  size = 80, 
  onPress,
  editable = false
}) => {
  // Determina qual URL usar para o avatar
  const getAvatarSource = () => {
    if (avatarUrl) {
      return { uri: avatarUrl };
    }
    
    if (userId) {
      // Constrói URL do S3 baseada no userId
      return { uri: `${S3_CONFIG.BASE_URL}${S3_CONFIG.AVATARS_PATH}/user-${userId}.jpg` };
    }
    
    // Avatar padrão
    return { uri: S3_CONFIG.DEFAULT_AVATAR };
  };

  const AvatarContent = () => (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={getAvatarSource()}
        style={[styles.avatar, { width: size, height: size }]}
        onError={(error) => {
          console.log('Erro ao carregar avatar:', error);
          // Em caso de erro, você pode definir uma fonte alternativa aqui
        }}
      />
      {editable && (
        <View style={styles.editOverlay}>
          <View style={styles.editIcon} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <AvatarContent />
      </TouchableOpacity>
    );
  }

  return <AvatarContent />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  avatar: {
    borderRadius: 50,
    resizeMode: 'cover',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});

export default Avatar;