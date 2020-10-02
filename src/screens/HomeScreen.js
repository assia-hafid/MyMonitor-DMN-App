import React,{useState,useEffect} from 'react'
import {View, StyleSheet, AsyncStorage} from 'react-native'
import {Text, ApplicationProvider, IconRegistry} from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import ToolBar from './ToolBar'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import Sites from './Sites' 
import {getData, initData} from '../utils/data'


const HomeScreen = () => {
    const [state,setState] = useState({
        servers: []
    })
    useEffect(()=>{

        const fillState = async ()=>{
            let data = await getData()
            if(data.length == 0){
                data = await initData()
                
            }
            setState({
                servers: data
            })
        }
        fillState()
     
    },[])
    

   return(
        <View >
            <ToolBar setState={setState} servers={state.servers}/>
            <Sites setState={setState} servers={state.servers}/>
        </View>     
   );
}

const styles = StyleSheet.create({
   
    
  });

export default () => {
    return(
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <HomeScreen/>
            </ApplicationProvider>
        </>
    )
}
