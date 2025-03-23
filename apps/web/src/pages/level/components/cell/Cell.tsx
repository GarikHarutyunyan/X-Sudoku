import {
  checkIsIntersection,
  checkIsWrong,
  checkMutability,
  selectCoordinateValue,
} from '@x-sudoku/store';
import classNames from 'classnames';
import React, {JSX, memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {ICoordinate} from '../../../../data-structures';
import {Colors} from '../../../../style';
import './cell.css';

interface ICellProps {
  x: number;
  y: number;
  isActive?: boolean;
  onActiveCellChange?: (coordinate: ICoordinate) => void;
  style?: React.CSSProperties;
  className?: string;
}

const Cell = memo((props: ICellProps): JSX.Element => {
  const {x, y, isActive, onActiveCellChange, style, className} = props;
  const value: number | null = useSelector(selectCoordinateValue({x, y}));
  const isMutable: boolean = useSelector(checkMutability({x, y}));
  const isWrong: boolean = useSelector(checkIsWrong({x, y}));
  const isIntersection: boolean = useSelector(checkIsIntersection({x, y}));

  const onClick = useCallback(() => {
    onActiveCellChange && onActiveCellChange({x, y});
  }, [onActiveCellChange, x, y]);

  const cellStyle = {
    ...style,
    ...(isIntersection ? styles.cell_intersection : {}),
    ...(isWrong ? styles.cell_wrong : {}),
    ...(isActive ? styles.cell_active : {}),
  };
  const textStyle = {
    ...styles.cell__text,
    ...(isMutable ? styles.cell__text_mutable : {}),
    ...(isWrong && isMutable ? styles.cell__text_wrong : {}),
  };

  return (
    <div
      onClick={isMutable ? onClick : undefined}
      style={cellStyle}
      className={classNames(className, 'cell', {
        'cell_bold-top-border': x === 3 || x === 6,
        'cell_bold-left-border': y === 3 || y === 6,
      })}
    >
      <p className={'cell_text'} style={textStyle}>
        {value}
      </p>
    </div>
  );
});

const styles = {
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
    color: Colors.TEXT_PRIMARY,
  },
  cell__text_wrong: {
    color: Colors.TEXT_ERROR,
  },
};

export {Cell};
