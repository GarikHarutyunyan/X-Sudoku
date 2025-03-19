import {
  getLevels,
  selectLastAvailableLevel,
  selectLevels,
} from '@x-sudoku/store';
import {JSX, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ILevel} from '../../data-structures';

const Levels = (): JSX.Element => {
  const levels: ILevel[] = useSelector(selectLevels);
  const lastAvailableLevel: number = useSelector(selectLastAvailableLevel);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLevels());
  }, []);

  return (
    <>
      <h3>
        <Link to={'/'}>{'Back'}</Link>
      </h3>
      {levels.map((level: ILevel) => {
        const isLevelAvailable: boolean = lastAvailableLevel < level.index;
        return (
          <h2 key={level.id}>
            <Link
              to={`/levels/${level.id}`}
              onClick={
                isLevelAvailable ? (event) => event.preventDefault() : undefined
              }
              style={{cursor: isLevelAvailable ? 'not-allowed' : 'pointer'}}
            >{`Level ${level.index}`}</Link>
          </h2>
        );
      })}
    </>
  );
};

export {Levels};
