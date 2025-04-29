import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './style';
import AvatarImage from '../../assets/imgs/avatar.png';

interface Avatar {
        id: number;
        imageUrl: any;
}

const AvatarSelectionScreen: React.FC = () => {
        const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);

        const avatars: Avatar[] = [
                {id: 1, imageUrl: AvatarImage},
                {id: 2, imageUrl: AvatarImage},
                {id: 3, imageUrl: AvatarImage},
                {id: 4, imageUrl: AvatarImage},
                {id: 5, imageUrl: AvatarImage},
        ];

        const handleAvatarPress = (id: number) => {
                setSelectedAvatarId(id);
        };

        const handleConfirmSelection = () => {
                if (selectedAvatarId) {
                        console.log('Avatar selecionado: ', selectedAvatarId);
                }
        }

        return (
                <View style={styles.container}>
                        <View style={styles.titleContainer}>
                                <Text style={styles.title}>SELECIONE SEU AVATAR</Text>
                                <Text style={styles.subtitle}>(Escolha somente um.)</Text>
                        </View>

                        <View style={styles.avatarContainer}>
                                {avatars.map((avatar) => (
                                        <TouchableOpacity
                                        key={avatar.id}
                                        style={[
                                                styles.avatarButton,
                                                selectedAvatarId === avatar.id && styles.selectedAvatar,
                                        ]}
                                        onPress={() => handleAvatarPress(avatar.id)}
                                        >
                                                <Image
                                                source={avatar.imageUrl}
                                                style={[
                                                        styles.avatarImage,
                                                        selectedAvatarId !== avatar.id && styles.deselectedAvatarImage,
                                                        ]}
                                                />
                                        </TouchableOpacity>
                                        
                                ))}

                        </View>

                        <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={handleConfirmSelection}
                        >
                                <Text style={styles.confirmButtonText}>CONFIRMAR SELEÇÃO</Text>
                        </TouchableOpacity>
                </View>
        );
};

export default AvatarSelectionScreen;