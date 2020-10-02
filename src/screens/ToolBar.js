import React,{useState} from 'react'
import {StyleSheet, View, Modal, Alert, Vibration} from 'react-native' 
import {Icon, Text, Input, TopNavigation, Card, TopNavigationAction, Button, RadioGroup, Radio} from '@ui-kitten/components'
import { addHost } from '../utils/data'



const ToolBar = (props) => {
     
    const servers = props.servers
    const setState = props.setState
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [checkUrl, setCheckUrl]=useState(true)
    
    const AddIcon = (props) => (
      <Icon {...props} name='plus-outline' fill='white'/>
    );

    const addSites = async () =>{
      
      let type = getTypeRadio()
      let title = type.toLowerCase()+"://"+value
      const added = await addHost(title)
      if(added){
        let addedServers=[]
        addedServers = [...servers,{title:title,status:'None',type:type,time:'response-time'}]
        setState({
        servers: addedServers
        })
      }
      else{
        Alert.alert("Error","Error while saving data...",
        [
          {
            text: "Ok",
            style: 'cancel'
          },
        ],
        {cancelable:true}
        )
      }
      setValue("")
      setVisible(false) 
      setCheckUrl(true)
    }

    const handlIconPress = () =>{
      setVisible(true)
      Vibration.vibrate(24)
    }
    
      
    const AddAction = () => (
        <TopNavigationAction icon={AddIcon} style={{paddingLeft:30}} onPress={handlIconPress}/> 
        
      );

    const getTypeRadio = () => {
        if(selectedIndex==0){
           return "HTTP"
        }
        else{
          return "HTTPS"
        }
      }
      
    const handlChange = (nextValue)=>{
      setValue(nextValue)
      const goodInput = (nextValue!="") && (nextValue[0]!=".") && (nextValue[nextValue.length-1]!=".") && (nextValue.includes("."))
      if (!goodInput){
        setCheckUrl(true)
      }
      else {
        setCheckUrl(false)
      }

    }

    return(
      <> 
        <TopNavigation 
            style={styles.toolBarStyle}
            accessoryRight={AddAction}
            title={(ev)=> (<Text {...ev} style={styles.textStyle}> MyMonitor DMN </Text>)}
        />
        <View style={styles.centeredView}>
          <Modal
          visible={visible}
          transparent={true}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
          onRequestClose = {() => setVisible(false)}
          >
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.cardStyle}>
                  <Text> Add your Hostname : </Text>
                  <RadioGroup
                      style={{
                        flexDirection : "row"
                      }}
                      selectedIndex={selectedIndex}
                      onChange={index => setSelectedIndex(index)}>
                      <Radio style = {styles.radioStyle}>HTTP</Radio>
                      <Radio style = {styles.radioStyle}>HTTPS</Radio>
                  </RadioGroup>
                  <Input
                      placeholder='enter url'
                      value={value}
                      style = {styles.textInputStyle}
                      onChangeText={nextValue => handlChange(nextValue)}
                  />
                  <Button onPress={addSites} disabled={checkUrl} style={styles.submitButtonStyle}>
                      SUBMIT
                  </Button>
              </Card>
            </View>
          </Modal>
        </View>
      </>
    )

    }
    

const styles = StyleSheet.create({
    radioStyle:{
      color : '#498B9F'
    },
    submitButtonStyle:{
      marginLeft:40,
      marginRight:40,
    
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    cardStyle:{
      width: 300,
      padding: 10,
    },
    
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    toolBarStyle:{
        backgroundColor : '#0000ff',
    },
    textInputStyle:{
        marginTop :20,
        marginBottom:20
        
    },
    textStyle:{
        color : "white",
        fontWeight: 'bold',
        fontSize : 21
    }

})
  

export default ToolBar
