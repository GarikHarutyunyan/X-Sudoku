import {Link} from 'react-router-dom';
import {Colors} from '../../style';
import './home.css';

export const Home = () => {
  return (
    <div className={'home'} style={{backgroundColor: Colors.APP_PRIMARY}}>
      <Link
        style={{
          textDecoration: 'none',
          color: Colors.TEXT_PRIMARY,
        }}
        to={'/levels'}
      >
        <button
          className={'home__button'}
          style={{backgroundColor: Colors.APP_PRIMARY}}
        >
          {'Play'}
        </button>
      </Link>
    </div>
  );
};
