
import { StyleSheet } from "react-native";  

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 130,
        backgroundColor: '#FFF',
      },
    
      containerLogo: {
        alignItems: 'center',
        marginBottom: 0,
      },
    
      logoImage: {
        width: 320,
        height: 110,
        resizeMode: "contain",
      },
    
      container: {
        width: '85%',
      },
    
      label: {
        textAlign: 'left',
        marginBottom: 5,
        fontSize: 16,
        color: "#333",
        
      },
    
      input: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        marginBottom: 2,
        fontSize: 17,
        borderColor: '#5B3CC4',
        borderRadius: 8,
        borderWidth: 2,
        padding: 10,
      },
    
      buttonEntrar: {
        backgroundColor: "#5B3CC4",
        width: '100%',
        height: 47,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 20,
      },
    
      textButtonWhite: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold',
      },
    
      buttonCriar: {
        backgroundColor: "#FFF",
        borderColor: "#5B3CC4",
        height: 47,
        width: '100%',
        borderRadius: 8,
        borderWidth: 2,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
      },
    
      textButtonPurple: {
        color: "#5B3CC4",
        fontSize: 20,
        fontWeight: "bold",
      },
    
    error: {
    color: 'red',
    alignSelf:'flex-start',
    marginBottom: 10,
    fontSize: 12,
    
    },
})

