import {getLevels, selectLevels, selectLevelsStatus} from '@x-sudoku/store';
import {JSX, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ILevel, RequestStatus} from '../../data-structures';
import {Colors} from '../../style';
import {Grid} from './grid/Grid';
import LevelThumb from './level-thumb/LevelThumb';
import './levels.css';
import Loader from './loader/Loader';

const Levels = (): JSX.Element => {
  const levelsStatus: RequestStatus = useSelector(selectLevelsStatus);
  const isLoading: boolean = levelsStatus === RequestStatus.LOADING;
  const levels: ILevel[] = useSelector(selectLevels);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLevels());
  }, []);

  const renderLevelThumb = (level: ILevel, index: number) => {
    return <LevelThumb key={index} level={level} />;
  };

  return (
    <div style={{backgroundColor: Colors.APP_PRIMARY}}>
      <h3>
        <Link to={'/'}>{'Back'}</Link>
      </h3>
      {isLoading ? (
        <Loader color={Colors.APP_SECONDARY} />
      ) : (
        <Grid
          items={levels}
          renderItem={renderLevelThumb}
          columnNumber={3}
          className={'levels__grid'}
        />
      )}
    </div>
  );
};

export {Levels};
