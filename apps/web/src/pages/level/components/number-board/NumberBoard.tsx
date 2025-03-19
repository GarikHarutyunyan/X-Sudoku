import {changeActiveCoordinateValue} from '@x-sudoku/store';
import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import './number-board.css';

const emptyArray = Array(9).fill(undefined);

const NumberBoard = memo(() => {
  const dispatch = useDispatch();

  const changeActiveCellValue = useCallback(
    (value: number) => dispatch(changeActiveCoordinateValue(value)),
    []
  );

  return (
    <div className={'number-board'}>
      {emptyArray.map((_empty, index) => {
        return (
          <div
            key={index}
            onClick={() => changeActiveCellValue(index + 1)}
            className={'number-board__element'}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
});

export {NumberBoard};
