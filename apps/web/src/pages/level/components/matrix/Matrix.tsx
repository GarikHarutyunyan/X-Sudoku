import {changeActiveCoordinate, selectActiveCoordinate} from '@x-sudoku/store';
import {JSX, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ICoordinate} from '../../../../data-structures';
import {Cell} from '../cell/Cell';
import './matrix.css';

const matrix = Array(9).fill(Array(9).fill(0));

const Matrix = (): JSX.Element => {
  const activeCell = useSelector(selectActiveCoordinate);
  const dispatch = useDispatch();

  const onActiveCellChange = useCallback(
    (coordinate: ICoordinate) => dispatch(changeActiveCoordinate(coordinate)),
    []
  );

  return (
    <div className={'matrix'}>
      {matrix.map((row, x) => {
        return (
          <div key={x} className={'matrix__row'}>
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
          </div>
        );
      })}
    </div>
  );
};

export {Matrix};
