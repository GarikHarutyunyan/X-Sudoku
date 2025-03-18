import React, {useCallback, memo} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Colors} from '../../style';
import {useSelector} from 'react-redux';
import {
  checkIsIntersection,
  checkIsWrong,
  checkMutability,
  selectCoordinateValue,
} from '../../store/levelSlice';
import {ICoordinate} from '../../data-structures';

interface ICellProps {
  x: number;
  y: number;
  isActive?: boolean;
  onActiveCellChange?: (coordinate: ICoordinate) => void;
  style?: React.CSSProperties;
  className?: string;
}

const Cell = memo((props: ICellProps) => {
  const {x, y, isActive, onActiveCellChange} = props;
  const value: number | null = useSelector(selectCoordinateValue({x, y}));
  const isMutable: boolean = useSelector(checkMutability({x, y}));
  const isWrong: boolean = useSelector(checkIsWrong({x, y}));
  const isIntersection: boolean = useSelector(checkIsIntersection({x, y}));

  const onClick = useCallback(() => {
    onActiveCellChange && onActiveCellChange({x, y});
  }, [onActiveCellChange, x, y]);

  const cellStyle = [
    styles.cell,
    isIntersection && styles.cell_intersection,
    isWrong && styles.cell_wrong,
    isActive && styles.cell_active,
  ];
  const textStyle = [
    styles.cell__text,
    isMutable && styles.cell__text_mutable,
    isWrong && isMutable && styles.cell__text_wrong,
  ];

  return (
    <TouchableWithoutFeedback onPress={isMutable ? onClick : undefined}>
      <View
        style={[
          x === 3 || x === 6 ? styles.cell_boldTopBorder : null,
          y === 3 || y === 6 ? styles.cell_boldLeftBorder : null,
          ...cellStyle,
        ]}
      >
        <Text style={textStyle}>{value}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  cell: {
    aspectRatio: 1,
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell_active: {
    backgroundColor: Colors.APP_SECONDARY,
  },
  cell_intersection: {
    backgroundColor: Colors.APP_SECONDARY_LIGHT,
  },
  cell_wrong: {
    backgroundColor: Colors.APP_ERROR,
  },
  cell__text_mutable: {
    color: Colors.TEXT_SECONDARY,
  },
  cell__text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 25,
    color: Colors.TEXT_PRIMARY,
  },
  cell__text_wrong: {
    color: Colors.TEXT_ERROR,
  },
  cell_boldTopBorder: {
    borderTopWidth: 2,
    borderColor: Colors.TEXT_PRIMARY,
  },
  cell_boldLeftBorder: {
    borderLeftWidth: 2,
    borderColor: Colors.TEXT_PRIMARY,
  },
});

export {Cell};
