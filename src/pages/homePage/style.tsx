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
  txtTitle:{
    fontSize:24,
    fontWeight:700
},
containerTesk:{
  width:"100%",
},
  contentTesk:{
    backgroundColor:"white",
    padding:15,
    width:"100%",
    borderRadius:8,
    marginBottom:15,
    elevation: 5    
  },
  txth1:{
    color:"Black",
    fontSize:20,
    fontWeight:"bold"
  },
  txtp:{
    fontSize:16,
    marginTop: 15
  },
  contSpan:{
    marginTop:10,
    flexDirection:"row",
    justifyContent:"space-between",
    overflow: "hidden"
},
span:{
    fontSize:12,
    margin:5,
    paddingHorizontal:8,
    paddingVertical:2,
    borderRadius:8,
    backgroundColor:"#E6E0F7"
},
btn:{
  marginTop:15,
  marginBottom:25,
  alignItems:"center"
},
txtbtn:{        
  borderRadius:8,
  paddingVertical:5,
  paddingHorizontal:15,
  backgroundColor:"#5B3CC4",
  color:"white",
  fontWeight:400,
  fontSize:16
},
checkContainer: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 3,
  borderColor: '#B58B46',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
checkMark: {
  borderWidth: 0, 
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  backgroundColor: '#30C25D',
  width: 22,
  height: 22,
  textAlign: 'center',
  borderRadius: 11,
  lineHeight: 22,
},
tasktitle:{
  flexDirection:"row",
  justifyContent:"space-between"
}
});
 
export default styles;