import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import AvatarImage from '../../assets/imgs/avatar.png';
import { useNavigation } from "@react-navigation/native";

import ChevronLeftIcon from '../../assets/icons/ChevronLeft.png';

interface Avatar {
        id: number;
        imageUrl: any;
        borderColor: string;
}

const AvatarSelectionScreen: React.FC = () => {
        const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);

        const navigation = useNavigation();

        const avatars: Avatar[] = [
                {id: 1, imageUrl: AvatarImage, borderColor: '#5B3CC4'},
                {id: 2, imageUrl: AvatarImage, borderColor: '#E6E0F7'},
                {id: 3, imageUrl: AvatarImage, borderColor: '#32C25B'},
                {id: 4, imageUrl: AvatarImage, borderColor: '#E63946'},
                {id: 5, imageUrl: AvatarImage, borderColor: '#B58B46'},
        ];

        const handleBackButton = () => {
            navigation.goBack();
            console.log('Voltar pressionado');
        };

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
                        <View style={styles.header}>
                            <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                            <Image source={ChevronLeftIcon} style={styles.backButtonIcon}/>
                            <Text style={styles.backButtonText}>VOLTAR</Text>
                            </TouchableOpacity>
                            <Text style={styles.titleHead}>EDIÇÃO DE PERFIL</Text>
                        </View>
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
                                                {borderColor: avatar.borderColor },
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
                                <Text style={styles.confirmButtonText}>CONFIRMAR EDIÇÃO</Text>
                        </TouchableOpacity>
                </View>
        );
};

export default AvatarSelectionScreen;