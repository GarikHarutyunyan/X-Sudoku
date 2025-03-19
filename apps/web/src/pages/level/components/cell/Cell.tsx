import {checkMutability, selectCoordinateValue} from '@x-sudoku/store';
import classNames from 'classnames';
import React, {JSX, memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {ICoordinate} from '../../../../data-structures';
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
  const value = useSelector(selectCoordinateValue({x, y}));
  const isMutable = useSelector(checkMutability({x, y}));

  const onClick = useCallback(() => {
    onActiveCellChange && onActiveCellChange({x, y});
  }, [onActiveCellChange, x, y]);

  return (
    <div
      onClick={onClick}
      style={style}
      className={classNames(className, 'cell', {
        'cell_active': isActive,
        'cell_mutable': isMutable,
        'cell_bold-top-border': y === 3 || y === 6,
        'cell_bold-left-border': x === 3 || x === 6,
      })}
    >
      {value}
    </div>
  );
});

export {Cell};
