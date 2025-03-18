import {StyleSheet, Text} from 'react-native';
import {Container} from '../components/Container';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '../components/Screen';
import {Colors} from '../../style';

type RootStackParamList = {
  Levels: {};
  About: {};
};

type LevelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Levels',
  'About'
>;

interface IHomeScreenProps {
  navigation: LevelNavigationProp;
}

export const HomeScreen = (props: IHomeScreenProps) => {
  const {navigation} = props;
  const onPlay = () => {
    navigation.navigate('Levels', {});
  };
  const openAboutScreen = () => {
    navigation.navigate('About', {});
  };

  return (
    <Screen style={styles.screen}>
      <Container onPress={onPlay} style={styles.container}>
        <Text style={styles.text}>{'Play'}</Text>
      </Container>
      <Container onPress={openAboutScreen} style={styles.container}>
        <Text style={styles.text}>{'About'}</Text>
      </Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '70%',
    aspectRatio: 5,
    borderRadius: 45,
    marginVertical: 10,
  },
  text: {
    fontSize: 35,
    color: Colors.TEXT_PRIMARY,
  },
});
