import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '../../style';

interface IContainerProps {
  onPress?: () => void;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const Container = (props: IContainerProps) => {
  const {onPress, isDisabled, style, children} = props;

  return (
    <TouchableWithoutFeedback onPress={!isDisabled ? onPress : undefined}>
      <View style={[styles.container, isDisabled && styles.disabled, style]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: '18%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.TEXT_PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 20,
    // shadowColor: "black",
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
