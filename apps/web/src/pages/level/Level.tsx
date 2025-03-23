import {
  changeLastAvailableLevel,
  checkIsSolved,
  getLevel,
  selectLastAvailableLevel,
  selectLevel,
  selectLevelStatus,
} from '@x-sudoku/store';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ActionThumb from '../../components/action-thumb/ActionThumb';
import Refresh from '../../components/icons/Refresh';
import {RequestStatus} from '../../data-structures';
import {Colors} from '../../style';
import Loader from '../levels/loader/Loader';
import {ActionBar} from './components/actions/ActionBar';
import {Matrix} from './components/matrix/Matrix';
import {NumberBoard} from './components/number-board/NumberBoard';
import {Win} from './components/win/Win';
import './level.css';

const Level = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const activeLevel = useSelector(
    selectLevel,
    (level1, level2) => level1?.id === level2?.id
  );
  const lastAvailableLevel: number = useSelector(selectLastAvailableLevel);
  const isSolved = useSelector(checkIsSolved);
  const levelsStatus: RequestStatus = useSelector(selectLevelStatus);
  const isLoading: boolean = levelsStatus === RequestStatus.LOADING;
  const {id} = useParams();

  useEffect(() => {
    dispatch(getLevel(id as string));
  }, [id]);

  useEffect(() => {
    if (isSolved) {
      dispatch(changeLastAvailableLevel(activeLevel?.index || 0));
    }
  }, [isSolved]);

  if (activeLevel && activeLevel?.index > lastAvailableLevel) {
    return (
      <>
        <h3>
          <Link to={'/levels'}>{'Back'}</Link>
        </h3>
        <h2>{'This level is unavailable for you!'}</h2>
      </>
    );
  }

  const onResetLevel = () => {
    activeLevel && dispatch(getLevel(activeLevel?.id));
  };

  return (
    <div className={'level'} style={{backgroundColor: Colors.APP_PRIMARY}}>
      <ActionBar onBack={() => navigate(-1)}>
        <ActionThumb onClick={onResetLevel} width={70} height={70}>
          <Refresh width={40} height={40} />
        </ActionThumb>
      </ActionBar>
      {isSolved ? (
        <Win />
      ) : isLoading ? (
        <Loader color={Colors.APP_SECONDARY} />
      ) : (
        <>
          <Matrix />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div></div>
            <NumberBoard />
          </div>
        </>
      )}
    </div>
  );
};

export {Level};
