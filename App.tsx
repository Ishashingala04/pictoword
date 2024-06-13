import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import Gameboard from './Gameboard';
import Gamelevels from './Gamelevels';
import WinningPage from './WinningPage';

x`
const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <>

<NavigationContainer>

    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} options={{headerShown:false}}/>
        <Stack.Screen name="Game" component={Gameboard} options={{headerShown:false}}/>
        <Stack.Screen name="Level" component={Gamelevels} />
        <Stack.Screen name="Winning" component={WinningPage} />
      </Stack.Navigator>
</NavigationContainer>
   
   </>
  )
}

