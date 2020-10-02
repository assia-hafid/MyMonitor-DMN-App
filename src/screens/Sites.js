import React,{useState} from 'react';
import { Icon, List, ListItem,Text} from '@ui-kitten/components';
import { StyleSheet, RefreshControl, Alert, View, Vibration} from 'react-native';
import { removeHost } from '../utils/data';

 

const Sites = ({servers=[],setState}) => {


    const [refreshing, setRefreshing] = useState(false);

    const getStatus = async (title) =>{

        try{
            let t0 = new Date().getTime()
            const ping = await fetch(title)
            let t1 = new Date().getTime()
            return {status:"UP",time:(t1-t0)}
            

        }catch(err){
            return {status:"DOWN",time:"0"}
        } 
      
    }
   
    const onRefresh = async () => {
      setRefreshing(true);
      let newServers = []
      for(let server of servers){
          const st = await getStatus(server.title)
          server = {...server,status: st.status, time:st.time+"ms"}
          newServers = [...newServers,server]
      }
      setState({
            servers: newServers
        })
      setRefreshing(false)
    } 

    const renderItemAccessory = (props,info) => (
      <Text style={styles.timeStyle}>{info.item.time}</Text>
    );
  
    const renderItemIcon = (props,info) => {
        const {name,color} = getIcon(info.item.status)
        return(
            <Icon {...props} name={name} fill={color}/>
        )
      
    };

    const deleteItem = async (index) => {
        
        console.log("index: "+index) 
        const deleted = await removeHost(index)
        if(deleted){
            setState({
                servers: servers.filter((item,key) => key != index)
            });
        }
        else{
            Alert.alert("Error","Error while deleting data...",
                [
                {
                    text: "Ok",
                    style: 'cancel'
                },
                ],
                {cancelable:true}
            )
        }

    }


    const openTwoButtonAlert = (info)=>{
        Vibration.vibrate(70)
        Alert.alert(
          'Delete Warning!',
          'Are you sure want to delete this Host ?',
          [ 
            {text: 'CANCEL', onPress: () => console.log('No button clicked'), style: 'cancel'},
            {text: 'YES', onPress:()=>{deleteItem(info.index)}},
            
          ],
          { 
            cancelable: true 
          }
        );
      }

    const getIcon = (status)=>{
        if(status === "None"){
            return {name:"pause-circle-outline",color:"grey"}
        }
        if(status === "UP"){
            return {name:"arrow-circle-up-outline",color:'green'}
        }
        return {name:"arrow-circle-down-outline",color:"red"}
    }
   
    const renderItem = (info) => (
      <ListItem
        onLongPress={props=>openTwoButtonAlert(info)}
        title={()=>(<Text  style={styles.titleStyle}> {info.item.title.substr(info.item.title.indexOf("/")+2)} </Text>)}
        description={`${info.item.type}`}
        accessoryLeft={props=>renderItemIcon(props,info)}
        accessoryRight={props=>renderItemAccessory(props,info)}
      />
    );


    return (
      <>
        <List
            refreshControl = {(<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />)}
            data = {servers}
            renderItem={renderItem}
            
        />        
      </>
    );
    
  };

  const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
      },
    titleStyle:{
        fontWeight: 'bold',
        fontSize: 17
    },
    timeStyle:{
        color:'grey',
        fontStyle:'italic',
        fontSize:13
    },
    buttonWraper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        color: "#AE63F9",
    },
    button:{
        margin: 3,
        color: "#AE63F9",
        borderColor: "#AE63F9",
        
    }
  });

export default Sites