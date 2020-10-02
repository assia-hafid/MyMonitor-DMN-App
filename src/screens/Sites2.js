import React from 'react'; import { StyleSheet, View } from 'react-native'
import { Card, List, Text } from '@ui-kitten/components'

const data = [
    {title:'site1',state:'UP'},
    {title:'site2',state:'DOWN'}
]

const Sites = () => {
    return(
     <List
        data = {data}
        renderItem = {RenderItem}
     
     />   
    )
}
const Header = (props,info) => {
    return(
       <View {...props} >
           <Text>
               {info.item.title}
           </Text>
       </View>
    )
}
const Footer = (props,info) => {
    return(
        <View {...props} >
           <Text>
               {info.item.state}
           </Text>
       </View>
    
    )

}

const RenderItem = (info) => {
    return(
        <Card 
            status='basic'
            header = {props=>Header(props,info)}
            footer = {props=>Footer(props,info)}

        >
            <Text>Description of this testing site</Text>

        </Card>

    )
}



export default Sites
