import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

//Modais
import LogoutConfirmationModal from '../../components/common/LogoutConfirmationModal';

// Ícones
import UserIcon from '../../assets/icons/profileGuy.png';
import FingerprintIcon from '../../assets/icons/fingerprint.png';
import LogoutIcon from '../../assets/icons/logout.png';
import ChevronRightIcon from '../../assets/icons/ChevronRight.png';
import DeleteAccIcon from '../../assets/icons/recyclebin.png'

import ProfileImage from '../../assets/imgs/avatar.png';

const ProfileScreen: React.FC = () => {

    const navigation = useNavigation();

    const [isLogoutConfirmationModalVisible, setIsLogoutConfirmationModalVisible] = useState(false);

    const handleEditProfilePress = () => {
        navigation.navigate('profileEdit');
    };

    const handleLogoutPress = () => {
        setIsLogoutConfirmationModalVisible(true);
    };

    const handleCancelLogout = () => {
        setIsLogoutConfirmationModalVisible(false);
    };

    const handleConfirmLogout = () => {
        //IMPLEMENTAR LÓGICA DO LOGOUT dependente do banco de dados - Yan
        console.log('Usuário saiu da conta!');
        setIsLogoutConfirmationModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image source={ProfileImage} style={styles.avatar}/>
                </View>
                <Text style={styles.name}>Rafaela Santos</Text>
                <Text style={styles.email}>rafaela.santos@compasso.com.br</Text>
                <Text style={styles.phone}>(81) 98650 - 9240</Text>
            </View>

            <ScrollView
                style={styles.actionsScrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.actionsContainer}
            >
                <TouchableOpacity style={styles.actionButton} onPress={handleEditProfilePress}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Editar Informações Pessoais</Text>
                        <Image source={UserIcon} style={styles.actionIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Mudar Biometria</Text>
                        <Image source={FingerprintIcon} style={styles.actionIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleLogoutPress}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Sair da Conta</Text>
                        <Image source={LogoutIcon} style={styles.actionIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Excluir Conta</Text>
                        <Image source={DeleteAccIcon} style={styles.actionIcon} />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Preferências</Text>
                <Image source={ChevronRightIcon} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Termos e regulamentos</Text>
                <Image source={ChevronRightIcon} style={styles.menuIcon} />
            </TouchableOpacity>

            {isLogoutConfirmationModalVisible && (
                <LogoutConfirmationModal
                    visible={isLogoutConfirmationModalVisible}
                    onCancel={handleCancelLogout}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </View>
    );
};

export default ProfileScreen;