import {PropsWithChildren} from 'react';
import {Colors} from '../../style';
import './action-thumb.css';

interface IActionThumbProps extends PropsWithChildren {
  onClick: () => void;
  width?: number;
  height?: number;
}

const ActionThumb = ({onClick, width, height, children}: IActionThumbProps) => {
  return (
    <div
      onClick={onClick}
      className={'action-thumb'}
      style={{borderColor: Colors.TEXT_PRIMARY, width, height}}
    >
      {children}
    </div>
  );
};

export default ActionThumb;
