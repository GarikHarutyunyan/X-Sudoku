import {changeActiveCoordinate, selectActiveCoordinate} from '@x-sudoku/store';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ICoordinate} from '../../data-structures';
import {Colors} from '../../style';
import {Cell} from './Cell';

const emptyMatrix = Array(9).fill(Array(9).fill(0));

const Matrix = () => {
  const activeCell = useSelector(selectActiveCoordinate);
  const dispatch = useDispatch();

  const onActiveCellChange = useCallback(
    (coordinate: ICoordinate) => dispatch(changeActiveCoordinate(coordinate)),
    []
  );
  return (
    <View style={styles.board}>
      <View style={styles.matrix}>
        {emptyMatrix.map((row, x) => {
          return (
            <View key={x} style={styles.matrix__row}>
              {row.map((_cell: number, y: number) => {
                const isCellActive: boolean =
                  !!activeCell && activeCell.x === x && activeCell.y === y;

                return (
                  <Cell
                    key={y}
                    x={x}
                    y={y}
                    isActive={isCellActive}
                    onActiveCellChange={onActiveCellChange}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
  },
  matrix: {
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 2,
    borderColor: Colors.TEXT_PRIMARY,
    marginVertical: 30,
    marginHorizontal: 18,
  },
  matrix__row: {
    flexShrink: 1,
    flexDirection: 'row',
  },
});

export {Matrix};
