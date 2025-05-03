import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 0,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 35,
    },
    avatarContainer: {
        width: 150,
        height: 150,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 15,
    },
    avatar: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
        fontFamily: 'Roboto',
        color: '#1E1E1E',
    },
    email: {
        fontSize: 16,
        color: '#1E1E1E',
        marginBottom: 5,
        fontFamily: 'Roboto',
    },
    phone: {
        fontSize: 16,
        color: '#1E1E1E',
        fontFamily: 'Roboto',
        fontWeight: '600',
    },
    actionsScrollView: {
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 25,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 0,
    },
    actionButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 13,
        paddingHorizontal: 13,
        alignItems: 'center',
        width: 130,
        height: 130,
        marginRight: 20,
        elevation: 4,
    },
    actionContent: {
        alignItems: 'flex-start',
    },
    actionIcon: {
        width: 20,
        height: 20,
        marginBottom: 5,
        resizeMode: 'contain',
    },
    actionText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'left',
        alignContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontWeight: '700',
        marginBottom: 15,
    },
    menuItem: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 25,
        paddingHorizontal: 25,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        width: 340,
    },
    menuText: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 700,
    },
    menuIcon: {
        fontSize: 20,
    },
});

export default styles;