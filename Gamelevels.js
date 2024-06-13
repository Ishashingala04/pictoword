import React, { useEffect,useState } from 'react'
import { StyleSheet,ImageBackground, Pressable, Text, View ,Image ,ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
export default function Gamelevels({navigation}) {


    const [bord,setbord] = useState([])
    const [levelno,setlevelno]=useState(1)
    const [skippedLevels,setskippedLevels] =useState([])
    const[max,setMax]= useState(1);

   

    useEffect(() =>{
        var temp = [];  
        var random = require('./img/lock.png')
        for(var i = 0; i <= 50; i++ ){
            temp.push(i);
        }
        setbord(temp);
    }, []);


// Skipp level

  const getSkipLevelsFun  = async () => {
    try {
        const value = await AsyncStorage.getItem('skipped');
         var temp = value != null ? JSON.parse(value) : [];
        
         setskippedLevels(temp);
    } catch (e) {
      // error reading value
    }
  };


    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('levelno', value);
          navigation.navigate('Game')
        } catch (e) {
          // saving error
        }
         };
    
         const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('levelno');
              if (value !== null) {
                setlevelno(parseInt(value));
                // value previously stored
              }
            } catch (e) {
              // error reading value
            }
          };



          const storemaxvalue = async (value) => {
            try {
              await AsyncStorage.setItem('max', value);
              // navigation.navigate('Level')
            } catch (e) {
              // saving error
            }
             };
             const getmaxvalue = async () => {
                try {
                  const value = await AsyncStorage.getItem('max');
                  if (value !== null) {
                      setMax(parseInt( value))
                    // value previously stored
                  }
                  console.log(value)
                } catch (e) {
                  // error reading value
                }
              };
    
    
                useFocusEffect(
                  React.useCallback(()=>{
                    if(parseInt(levelno) > parseInt(max))
                    {
                      storemaxvalue(levelno.toString())
                    }
    
                  },[levelno])
                )
useFocusEffect(
    React.useCallback(()=>{
            getData();
            getSkipLevelsFun();
            getmaxvalue();
    },[])
)

  return (
    <>

<View>
        {/* <ImageBackground source={require('./img/background.jpg')} style={{height:'100%',width:'100%'}}> */}

                <View>
                    <Text style={style.head}>Select Levels</Text>
                </View> 

            <ScrollView>  

                <View style={style.level}>
                   
                  

                {
                        bord.map((value, index)=>{
                            return(     

                            (value < max) ?
                                <View style={style.row}>
                                    <Pressable onPress={() => storeData((index+1).toString())}>{
                                        skippedLevels.includes(value) ?
                                        <Text style={{ color: '#000', fontSize: 60, fontWeight: 'Bold', textAlign: 'center', paddingTop: 10, }}>{value}</Text> 
                                        :
                                        <>
                                         <ImageBackground source={require('./img/tick.png')} style={style.lock}><Text style={{ color: '#000', fontSize: 60, fontWeight: 'Bold', textAlign: 'center', paddingTop: 10, }}>{value}</Text></ImageBackground>
                                        </>
                                        }
                                    </Pressable>
                                </View>:
                            (value == max) ?
                            <View style={style.row}>
                                  <Pressable onPress={() => storeData((index+1).toString())}>
                                    <Text style={{ color: '#000', fontSize: 60, fontWeight: 'Bold', textAlign: 'center', paddingTop: 10, }}>{value}</Text> 
                                  </Pressable>
                            </View>:
                            <View style={style.row}>
                              <Pressable><Image source={require('./img/lock.png')} style={style.lock}></Image></Pressable>
                            </View>
                                
                            )
                          
                        })
                        
                    }
                  
                   
                                
                </View> 
            </ScrollView>
                            
        {/* </ImageBackground> */}
</View>
    
    </>
  )
}
const style = StyleSheet.create({
    head: {
        textAlign: 'center',
        fontSize: 25,
        color: '#3f51b5',
        fontFamily: 'serif',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    level:{
    
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap'

    },
    lock:{
        width:100,
        height:100,
        
    },
    row:{
        width: 95,
        height:95
    }
 
    
})
