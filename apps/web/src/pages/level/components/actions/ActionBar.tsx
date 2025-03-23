import {PropsWithChildren} from 'react';
import ActionThumb from '../../../../components/action-thumb/ActionThumb';
import Back from '../../../../components/icons/Back';
import './action-bar.css';

interface IActionBarProps extends PropsWithChildren {
  onBack: () => void;
}

export const ActionBar = ({onBack, children}: IActionBarProps) => {
  return (
    <div style={{display: 'flex', gap: 8}}>
      <ActionThumb onClick={onBack} width={70} height={70}>
        <Back width={40} height={40} />
      </ActionThumb>
      {children}
    </div>
  );
};
