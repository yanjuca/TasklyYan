import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont:{
    width:"85%",
  },
  txth1:{
    textAlign:"center",
    fontWeight: 700,
    fontSize: 24,
    marginBottom: 25
  },
  txtinput:{
    borderWidth: 2,
    borderColor: '#5B3CC4',
    borderRadius: 5,
  },
  txterro:{
    color:"red",
    marginBottom:10,
    fontSize: 12
  },
  btn:{
    backgroundColor:"#5B3CC4",
    width:"100%"
  },
  txtbtn:{
    paddingVertical:15,
    textAlign:"center",
    color:"white",
    borderRadius:5,
    fontWeight:600
  }
}); 