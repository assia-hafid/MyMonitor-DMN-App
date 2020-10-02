
import {AsyncStorage} from 'react-native'

export  const getData = async ()=>{
    const servers = await AsyncStorage.getItem("servers")
    if(servers == null) {
        return []
    }
    else{
        let serversData = JSON.parse(servers)
     
        let newServers = []
        for(let server of serversData){
            const protocol = server.host.substr(0,server.host.indexOf(":")).toUpperCase()
            newServers = [...newServers,{title:server.host,status:'None',type:protocol,time:"response-time"}]
        }
        return newServers
    }
}

export const addHost = async (title)=>{
    let strServers = await AsyncStorage.getItem("servers")
   
    if(strServers != null){
        strServers = JSON.parse(strServers)
        strServers=[...strServers,{host:title}]
    }
    else{
        strServers = [{host:title}]
    }
    let stObj = JSON.stringify(strServers)
    try{
        await AsyncStorage.setItem("servers",stObj)
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export const removeHost = async (index)=>{
    const servers = await AsyncStorage.getItem("servers")
    if(servers == null) return false
    let serversData = JSON.parse(servers)
    serversData = serversData.filter((item,key)=>(key != index))
    let stObj = JSON.stringify(serversData)
    try{
        await AsyncStorage.setItem("servers",stObj) 
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export const initData = async ()=>{
    const randomServers = [
        {host:"https://google.com"},
        {host:"https://facebook.com"},
        {host:"https://bing.com"}
    ]
    const stServers = JSON.stringify(randomServers)

    try{
        await AsyncStorage.setItem("servers",stServers)
    }
    catch(err){
        console.log(err)
    }
    
    return [
        {title:"https://google.com",type:"HTTPS",status:"None",time:"response-time"},
        {title:"https://facebook.com",type:"HTTPS",status:"None",time:"response-time"},
        {title:"https://bing.com",type:"HTTPS",status:"None",time:"response-time"}
    ]
}