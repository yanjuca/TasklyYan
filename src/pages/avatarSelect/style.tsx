// src/pages/AvatarSelect/style.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20, // Espaçamento entre os avatares (React Native 0.71+)
    marginBottom: 40,
  },
  avatarButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2, // Borda padrão
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Garante que a imagem não saia do círculo
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // ESTILO PARA AVATAR SELECIONADO
  selectedAvatarOutline: {
    borderWidth: 1, // Aumenta a borda para indicar seleção
    // A cor da borda já vem de avatar.borderColor
  },
  // ESTILO PARA AVATAR NÃO SELECIONADO (pode adicionar opacidade ou escala, por exemplo)
  deselectedAvatarImage: {
    opacity: 0.7, // Torna avatares não selecionados um pouco mais opacos
    transform: [{ scale: 1.1 }], // Diminui um pouco os não selecionados
  },
  confirmButton: {
    backgroundColor: '#5B3CC4', // Cor do seu botão
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;