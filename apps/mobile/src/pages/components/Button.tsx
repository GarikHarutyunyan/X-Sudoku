import React, {ReactElement, useMemo, useRef} from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {Colors} from '../../style';
import {Container} from './Container';

interface IButtonProps {
  text?: string;
  icon?: ReactElement;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button = (props: IButtonProps) => {
  const {text, icon, onPress, style} = props;

  return (
    <Container onPress={onPress} style={style}>
      {icon}
      <Text style={styles.text}>{text || ''}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 42,
    color: Colors.TEXT_PRIMARY,
  },
});
