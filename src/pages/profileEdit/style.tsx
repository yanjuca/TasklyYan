import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#AAAAAA',
    borderRadius: 12,
  },
  backButtonIcon: {
    width: 10,
    height: 10,
    marginRight: 8,
  },
  backButtonText: {
    color: '#F4F4F4',
    fontWeight: 'medium',
    fontSize: 18,
  },
  titleHead: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#000000',
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 12,
    color: '#1E1E1E',
    fontWeight: 'regular',
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#5B3CC4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#212121',
  },
  errorText: {
    color: '#E63946',
    fontSize: 12,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#5B3CC4',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;