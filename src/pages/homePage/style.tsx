import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FA',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    width: 85,
    height: 28,
  },
  logo3: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo1: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:-450,
  },
  message: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#5B3CC4",
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: 'bold',
  },
 
});
 
export default styles;