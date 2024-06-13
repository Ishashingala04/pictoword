import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Pressable, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const WinningPage = ({route,navigation}) => {
  // const {levelno} = route.params;
  const [levelno, SetLevels] = useState(1);

  const stringArray = [ 
    'start', 'football', 'sandwitch', 'hotdog', 'earring', 'horseshoe', 'keyboard', 'start', 'football', 'sandwitch', 'hotdog', 'earring', 'horseshoe', 'keyboard' 
  ];

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('levelNo', value);
      navigation.navigate('Game');
      console.log(value)
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('levelNo');
      if (value !== null) {
        SetLevels(parseInt(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  )
  
  const firstString = stringArray[levelno];
  const boxCount = firstString.length; 
  const boxes = Array.from({ length: boxCount }, (_, index) => (
    <Pressable key={index} style={styles.keyLetter} ><Text style={styles.textElements}>{stringArray[levelno][index]}</Text></Pressable>
  ));

  return (
    <ImageBackground style={styles.gameboard} source={require('./img/win.jpg')} resizeMode='stretch'>
      <View style={{flex: .5}}></View>
      <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.inputAnswer}>
          {boxes}
        </View>
        <View style={{flex: 1}}>
          <Pressable onPress={()=>{navigation.navigate('Game',storeData((levelno + 1).toString()))}}><Text style={{fontSize: 30,fontWeight: 'bold'}}>continue</Text></Pressable>
        </View>
      </View>     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gameboard: {
    height: '100%',
    width: '100%'
  } ,
  inputAnswer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  } ,
  keyLetter: {
    width: '10%',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#D28F30',
    borderRadius: 10,
  } ,
  textElements:{
    fontSize: 28, 
    color: '#694717',
    textAlign: 'center', 
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});
export default WinningPage;
