import {changeActiveCoordinateValue} from '@x-sudoku/store';
import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import ActionThumb from '../../../../components/action-thumb/ActionThumb';
import Remove from '../../../../components/icons/Remove';
import {Grid} from '../../../levels/grid/Grid';
import './number-board.css';

const emptyArray = Array(10).fill(undefined);

const NumberBoard = memo(() => {
  const dispatch = useDispatch();

  const changeActiveCellValue = useCallback(
    (value: number) => dispatch(changeActiveCoordinateValue(value)),
    []
  );

  const renderNumberThumb = (_empty: any, index: number) => {
    const number: number = index + 1;
    const outOfScope = number >= 10;
    let removeIcon;

    if (outOfScope) {
      removeIcon = <Remove width={40} height={40} />;
    }

    return (
      <ActionThumb
        key={number}
        onClick={() => changeActiveCellValue(number <= 9 ? number : 0)}
      >
        {removeIcon || number}
      </ActionThumb>
    );
  };

  return (
    <Grid
      items={emptyArray}
      renderItem={renderNumberThumb}
      columnNumber={5}
      className={'number-board'}
    />
  );
});

export {NumberBoard};
