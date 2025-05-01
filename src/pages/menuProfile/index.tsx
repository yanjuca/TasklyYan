import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';

// Ícones
import UserIcon from '../../assets/icons/profileGuy.png';
import FingerprintIcon from '../../assets/icons/fingerprint.png';
import LogoutIcon from '../../assets/icons/logout.png';
import ChevronRightIcon from '../../assets/icons/ChevronRight.png';

import ProfileImage from '../../assets/imgs/avatar.png';

const ProfileScreen: React.FC = () => {
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
                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Editar           Informações Pessoais</Text>
                        <Image source={UserIcon} style={styles.actionIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Mudar Biometria</Text>
                        <Image source={FingerprintIcon} style={styles.actionIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Sair da Conta</Text>
                        <Image source={LogoutIcon} style={styles.actionIcon} />
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
        </View>
    );
};

export default ProfileScreen;