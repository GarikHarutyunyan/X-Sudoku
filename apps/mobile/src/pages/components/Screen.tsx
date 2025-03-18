import React, {ReactNode} from 'react';
import {StyleSheet, StyleProp, SafeAreaView, ViewStyle} from 'react-native';
import {Colors} from '../../style';

interface IScreenProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const Screen = (props: IScreenProps) => {
  const {style, children} = props;

  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.APP_PRIMARY,
  },
});
