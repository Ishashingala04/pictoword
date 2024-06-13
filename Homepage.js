import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Pressable, Alert} from 'react-native';


const Homepage = ({navigation}) => {
  
  return (
    <View style={styles.container}>
        <ImageBackground source={require('./img/homeimg.png')} resizeMode='stretch' style={styles.main_background}>
          <View style={{top:45,flex: 1,flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'flex-end',gap: 3,padding: 18}}>  
            <Pressable onPress={() => navigation.navigate('Level')} style={styles.btn}><Text style={{fontSize: 20,color: '#000'}}>Levels</Text></Pressable>
            <Pressable onPress={() => navigation.navigate('Game',{levelno: 0})} style={styles.btn}><Text style={{fontSize: 20,color: '#000'}}>Continue</Text></Pressable>
          </View>
        </ImageBackground>    
        
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  main_background: {
    height: '95%',
    width:'99%',
  
  },
  btn: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
  }
});
export default Homepage;
