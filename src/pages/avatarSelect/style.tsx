import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        paddingTop: 70,
        backgroundColor: '#f4f4f4',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    avatarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    avatarButton: {
        margin: 10,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: '#000'
    },
    selectedAvatar: {
        borderColor: '#5B3CC4',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    deselectedAvatarImage: {
        opacity: 0.5,
    },
    confirmButton: {
        backgroundColor: '#5B3CC4',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Roboto'
    },
});

export default styles;