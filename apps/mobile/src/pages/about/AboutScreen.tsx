import {StyleSheet, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '../components/Screen';
import {Colors} from '../../style';
import {TopBar} from '../components/TopBar';

type RootStackParamList = {
  About: {};
};

type LevelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'About'
>;

interface IAboutScreenProps {
  navigation: LevelNavigationProp;
}

export const AboutScreen = (props: IAboutScreenProps) => {
  const {navigation} = props;

  const onBack = () => navigation.goBack();

  return (
    <Screen style={styles.screen}>
      <TopBar onBack={onBack}></TopBar>
      <Text style={styles.textHeader}>{'About Sudoku'}</Text>
      <Text style={styles.textBody}>
        {
          'Sudoku is a classic Japanese puzzle game that has taken the world by storm. The rules are simple: fill in a 9x9 grid with numbers from 1 to 9 making sure that each row, column and 3×3 sub-grid contains all of the digits exactly once. But do not be fooled by the simplicity of the rules - solving even the easiest Sudoku puzzles requires a sharp mind and a lot of patience. \n    Our Sudoku game offers a wide range of difficulty levels from beginner to expert so you can choose the challenge that suits you best. Whether you are a seasoned Sudoku pro or just starting out you will find plenty of puzzles to keep you entertained for hours.'
        }
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  container: {
    width: '70%',
    aspectRatio: 5,
    borderRadius: 45,
  },
  textHeader: {
    margin: 30,
    color: Colors.TEXT_PRIMARY,
    fontSize: 35,
  },
  textBody: {
    marginHorizontal: 20,
    color: Colors.TEXT_PRIMARY,
    fontSize: 20,
    textAlign: 'justify',
  },
});
