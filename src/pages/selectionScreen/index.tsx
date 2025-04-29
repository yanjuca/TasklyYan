import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';

interface Avatar {
        id: number;
        imageUrl: string;
}

const AvatarSelectionScreen: React.FC = () => {
        const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);

        const avatars: Avatar[] = [
                {id: 1, imageUrl: '../assets/imgs/avatar.png'},
                {id: 2, imageUrl: '../assets/imgs/avatar.png'},
                {id: 3, imageUrl: '../assets/imgs/avatar.png'},
                {id: 4, imageUrl: '../assets/imgs/avatar.png'},
                {id: 5, imageUrl: '../assets/imgs/avatar.png'},
        ];

        const handleAvatarPress = (id: number) => {
                setSelectedAvatarId(id);
        };

        const handleConfirmSelection = () => {
                if (selectedAvatarId) {
                        console.log('Avatar')
                }
        }
}