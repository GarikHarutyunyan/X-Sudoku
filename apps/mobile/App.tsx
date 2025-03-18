import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {persistor, store} from '@x-sudoku/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {HomeScreen} from './src/pages/HomeScreen/HomeScreen';
import {AboutScreen} from './src/pages/about/AboutScreen';
import {Level} from './src/pages/level/Level';
import {Levels} from './src/pages/levels/Levels';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'Home'}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Levels" component={Levels} />
            <Stack.Screen name="Level" component={Level} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
