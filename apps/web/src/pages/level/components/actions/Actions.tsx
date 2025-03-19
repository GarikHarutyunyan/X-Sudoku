import {getLevel, selectLevel} from '@x-sudoku/store';
import {useDispatch, useSelector} from 'react-redux';
import './actions.css';

export const Actions = () => {
  const dispatch = useDispatch<any>();
  const activeLevel = useSelector(
    selectLevel,
    (level1, level2) => level1?.id === level2?.id
  );
  const onResetLevel = () => {
    activeLevel && dispatch(getLevel(activeLevel?.id));
  };

  return (
    <div onClick={onResetLevel} className={'actions__button'}>
      {'Reset Level'}
    </div>
  );
};
