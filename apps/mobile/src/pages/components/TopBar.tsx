import {StyleSheet, View} from 'react-native';
import {Button} from './Button';
import {Back} from './icons';
import {ReactNode} from 'react';

interface ITopBarProps {
  onBack: () => void;
  children?: ReactNode;
}

const TopBar = (props: ITopBarProps) => {
  const {onBack, children} = props;

  return (
    <View style={styles.topBar}>
      <Button icon={<Back width={40} height={40} />} onPress={onBack} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
});

export {TopBar};
