import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Pressable, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Gameboard = ({ route, navigation }) => {
  // const {levelno} = route.params;
  const [Strings, setStrings] = useState([]);
  const [blankBoxes, setBlankBoxes] = useState([]);
  const [boxPos, setBoxPos] = useState([]);
  const [levelno, SetLevels] = useState(1);
  const [coin, getcoindata] = useState(10);

  useEffect(() => {
    var temp = [];
    var findtemp = [];
    var pos = [];
    for (var i = 0; i < stringArray[levelno].length; i++) {
      temp.push('');
      pos.push(-1);
    }
    for (var i = 0; i < stringMixArray[levelno].length; i++) {
      findtemp.push(stringMixArray[levelno][i]);
    }
    setBlankBoxes(temp);
    setBoxPos(pos)
    setStrings(findtemp);
  }, []);

  useEffect(() => {
    var findtemp = [];
    var temp = [];
    var pos = [];
    for (var i = 0; i < stringArray[levelno].length; i++) {
      temp.push('');
      pos.push(-1);
    }
    for (var i = 0; i < stringMixArray[levelno].length; i++) {
      findtemp.push(stringMixArray[levelno][i]);
    }
    setBlankBoxes(temp);
    setStrings(findtemp);
    setBoxPos(pos)
  }, [levelno])
  const image_1 = [
    require('./img/pics-star.jpg'),
    require('./img/pics-foot.jpg'),
    require('./img/pics-sand.jpg'),
    require('./img/pics-fire.jpg'),
    require('./img/pics-ear.jpg'),
    require('./img/pics-horse.jpg'),
    require('./img/pics-key.jpg'),
    require('./img/pics-star.jpg'),
    require('./img/pics-foot.jpg'),
    require('./img/pics-sand.jpg'),
    require('./img/pics-fire.jpg'),
    require('./img/pics-ear.jpg'),
    require('./img/pics-horse.jpg'),
    require('./img/pics-key.jpg'),
  ];

  const image_2 = [
    require('./img/pics-art.jpg'),
    require('./img/pics-ball.jpg'),
    require('./img/pics-witch.jpg'),
    require('./img/pics-dog.jpg'),
    require('./img/pics-ring.jpg'),
    require('./img/pics-shoe.jpg'),
    // require('./img/istockphoto-1344981650-170667a.jpg'), 
    require('./img/pics-art.jpg'),
    require('./img/pics-ball.jpg'),
    require('./img/pics-witch.jpg'),
    require('./img/pics-dog.jpg'),
    require('./img/pics-ring.jpg'),
    require('./img/pics-shoe.jpg'),
    // require('./img/istockphoto-1344981650-170667a.jpg'),
  ];

  const stringArray = [
    'start', 'football', 'sandwitch', 'hotdog', 'earring', 'horseshoe', 'keyboard', 'start', 'football', 'sandwitch', 'hotdog', 'earring', 'horseshoe', 'keyboard'
  ];

  const stringMixArray = [
    'bswtgfhavkmrvbti', 'wqfmnofgsotbaljl', 'scaqsnldwcitackh', 'sdhxsoztedtougonz', 'dfevbaxrsrwilnmg', 'sasdeonrgexhqohf', 'mertkzydhqoaklrb', 'bswtgfhavkmrvbti', 'wqfmnofgsotbaljl', 'scaqsnldwcitackh', 'sdhxsoztedtougonz', 'dfevbaxrsrwilnmg', 'sasdeonrgexhqohf', 'mertkzydhqoaklrb'
  ];
  console.log(levelno)
  const firstString = stringArray[levelno];
  const boxCount = firstString.length;
  const boxes = Array.from({ length: boxCount }, (_, index) => (
    <Pressable key={index} style={styles.keyLetter} onPress={() => boxRemove(index)}><Text style={styles.textElements}>{blankBoxes[index]}</Text></Pressable>
  ));

  const secondString = stringMixArray[levelno];
  const guessRow = secondString.length;
  const guessBox = Array.from({ length: guessRow }, (_, index) => (
    <Pressable key={index} style={styles.guessLetter} onPress={() => BoxPress(index)}>
      <Text style={styles.textElements}>{Strings[index]}</Text>
    </Pressable>
  ));

  const BoxPress = (index) => {
    var blankCopy = [...blankBoxes];
    var stringCopy = [...Strings];
    var posCopy = [...boxPos];
    console.log(blankCopy.length)
    for (var j = 0; j < blankCopy.length; j++) {
      if (blankCopy[j] == '') {
        blankCopy[j] = stringMixArray[levelno][index];
        posCopy[j] = index;
        stringCopy[index] = '';
        break;
      }
    }

    setStrings(stringCopy);
    setBlankBoxes(blankCopy);
    setBoxPos(posCopy)
  }

  const boxRemove = (index) => {
    var copybox = [...blankBoxes];
    var copystring = [...Strings];
    var posCopy = [...boxPos];
    var downPos = boxPos[index]
    console.log("down no", downPos)
    copystring[downPos] = copybox[index]
    copybox[index] = ""
    posCopy[index] = -1

    setBlankBoxes(copybox);
    setStrings(copystring);
    setBoxPos(posCopy);
  };

  useEffect(() => {
    var user = blankBoxes.join('');
    if (blankBoxes != 0) {
      if (user == stringArray[levelno]) {
        Reset();
      storecoin((coin + 10).toString())

        navigation.navigate('Winning', { 'levelno': levelno });
        storeData((levelno).toString());
      }
      // else {
      //   storecoin(String(coin - 10))
      // }
    }
  }, [blankBoxes]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('levelNo', value);
      // navigation.navigate('Game');
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

  const storecoin = async (value) => {
    try {
      await AsyncStorage.setItem('coin', value);
      // navigation.navigate('Level')
    } catch (e) {
      // saving error
    }
  };
  const getcoin = async () => {
    try {
      const value = await AsyncStorage.getItem('coin');
      if (value !== null) {
        getcoindata(parseInt(value));
        console.log(value)
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(
    React.useCallback(()=>{
      getcoin();
  
    },[])
  )

  const Reset = () => {
    var temp = [];
    var findtemp = [];
    for (let i = 0; i < stringArray[levelno].length; i++) {
      temp.push('');
    }
    setBlankBoxes(temp);
    for (var i = 0; i < stringMixArray[levelno].length; i++) {
      findtemp.push(stringMixArray[levelno][i])
    }
    setStrings(findtemp);
  }

  return (

    // <ImageBackground style={styles.gameboard} source={require('./img/download.jpeg')} resizeMode='stretch'>
    <>
      <View style={styles.topContent}>
        <View>
          <Text style={styles.levelNo}>Level</Text>
          <Text style={styles.levelNo}>{levelno + 1}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: '50%', width: '50%' }} resizeMode='contain' source={require('./img/dollar.png')}></Image>
          <Text style={styles.scoreCount}>score :{coin}</Text>
        </View>
        <View>
          <Pressable style={styles.settings}><Image style={{ height: '50%', width: '50%' }} source={require('./img/gear.png')} resizeMode='contain'></Image></Pressable>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={{ flex: 4 }}>
          <Image style={styles.elements} source={image_1[levelno]} resizeMode='contain'></Image>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 50, color: '#404040', fontWeight: 'bold', textAlign: 'center' }}>+</Text>
        </View>
        <View style={{ flex: 4 }}>
          <Image style={styles.elements} source={image_2[levelno]} resizeMode='contain'></Image>
        </View>
      </View>
      <View style={styles.menus}>
        <Pressable style={styles.menuButtons} onPress={() => Reset()}><Image style={{ height: '60%', width: '60%' }} source={require('./img/reload.png')} resizeMode='contain'></Image></Pressable>
        <Pressable style={styles.menuButtons}><Image style={{ height: '60%', width: '60%' }} source={require('./img//reload.png')} resizeMode='contain'></Image></Pressable>
      </View>
      <View style={styles.subContent}>
        <View style={styles.inputAnswer}>
          {boxes}
        </View>
        <View style={styles.guessRow}>
          {guessBox}
        </View>
      </View>
    </>
    /* </ImageBackground> */
  );
};

const styles = StyleSheet.create({
  gameboard: { height: '100%', width: '100%' },
  topContent: {
    flex: .8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#68ABB3',
    padding: 2,
  },
  levelNo: { color: '#fff', fontSize: 20, textAlign: 'center' },
  scoreCount: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  settings: {
    height: 40,
    width: 50,
    backgroundColor: '#4d9199',
    borderRadius: 5,
    borderColor: '#336166',
    borderWidth: .8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContent: {
    height: '100%',
    width: '100%',
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elements: {
    height: '45%',
    width: '100%',
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 10,
  },
  menus: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  menuButtons: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fcdf4f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContent: { flex: 2 },
  inputAnswer: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#fcdf4f',
    padding: 5
  },
  keyLetter: {
    height: '90%',
    width: '10%',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#D28F30',
    borderRadius: 10
  },
  guessRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
    backgroundColor: '#fff',
    padding: 10,
  },
  guessLetter: {
    height: '50%',
    width: '12%',
    borderWidth: 1.5,
    borderColor: '#D28F30',
    backgroundColor: '#fcdf4f',
    borderRadius: 10
  },
  textElements: {
    fontSize: 28,
    color: '#694717',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }

});
export default Gameboard;
