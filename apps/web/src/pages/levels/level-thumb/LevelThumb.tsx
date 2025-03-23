import {selectLastAvailableLevel} from '@x-sudoku/store';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ILevel} from '../../../data-structures';
import {Colors} from '../../../style';
import './level-thumb.css';

interface ILevelThumbProps {
  level: ILevel;
}

const LevelThumb = ({level}: ILevelThumbProps) => {
  const lastAvailableLevel: number = useSelector(selectLastAvailableLevel);
  const isLevelAvailable: boolean = lastAvailableLevel < level.index;

  return (
    <Link
      to={`/levels/${level.id}`}
      onClick={isLevelAvailable ? (event) => event.preventDefault() : undefined}
      className={classNames('level-thumb', {
        'level-thumb_disabled': isLevelAvailable,
      })}
      style={{borderColor: Colors.TEXT_PRIMARY}}
    >
      <p className={'level-thumb__index'} style={{color: Colors.TEXT_PRIMARY}}>
        {level.index}
      </p>
      <p
        className={'level-thumb__level-text'}
        style={{color: Colors.TEXT_PRIMARY}}
      >
        {'Level'}
      </p>
    </Link>
  );
};

export default LevelThumb;
