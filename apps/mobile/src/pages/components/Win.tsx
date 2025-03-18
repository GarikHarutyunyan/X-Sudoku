import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../style';

const Win = () => {
  return <Text style={styles.win}>{'Congratulations!!!'}</Text>;
};

const styles = StyleSheet.create({
  win: {
    marginTop: 100,
    fontSize: 40,
    color: Colors.TEXT_PRIMARY,
  },
});

export {Win};
