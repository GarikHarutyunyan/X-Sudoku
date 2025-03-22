import classNames from 'classnames';
import {ReactElement} from 'react';
import './grid.css';

interface IGridProps {
  items: any[];
  renderItem: (item: any, index: number) => ReactElement;
  columnNumber: number;
  className: string;
}

const Grid = ({items, renderItem, columnNumber, className}: IGridProps) => {
  return (
    <div
      className={classNames('grid', className)}
      style={{
        gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
      }}
    >
      {items.map(renderItem)}
    </div>
  );
};

export {Grid};
