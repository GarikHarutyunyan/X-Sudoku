import {Level} from './src/pages/level/Level';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersistGate} from 'redux-persist/integration/react';
import {Levels} from './src/pages/levels/Levels';
import {HomeScreen} from './src/pages/HomeScreen/HomeScreen';
import {AboutScreen} from './src/pages/about/AboutScreen';

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
