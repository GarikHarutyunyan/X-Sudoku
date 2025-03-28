import {changeActiveCoordinateValue} from '@x-sudoku/store';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button} from './Button';
import {Remove} from './icons';

const emptyArray = Array(10).fill(undefined);

const NumberBoard = () => {
  const dispatch = useDispatch();
  const changeActiveCellValue = useCallback(
    (value: number) => dispatch(changeActiveCoordinateValue(value)),
    []
  );
  return (
    <View style={styles.numBoard}>
      {emptyArray.map((_value, index) => {
        const number = index + 1;
        const outOfScope = number >= 10;
        let buttonText = number.toString();
        let buttonIcon;

        if (outOfScope) {
          buttonText = '';
          buttonIcon = <Remove width={40} height={40} />;
        }

        return (
          <Button
            key={number}
            icon={buttonIcon}
            text={buttonText}
            onPress={() => changeActiveCellValue(index < 9 ? index + 1 : 0)}
            style={styles.numBoardElement}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  numBoard: {
    flexDirection: 'row',
    margin: 18,
    flexWrap: 'wrap',
    flexShrink: 1,
    flexGrow: 1,
    alignItems: 'flex-start',
    gap: 10,
  },
  numBoardElement: {
    flex: 1,
    flexBasis: '15%',
  },
});

export {NumberBoard};
