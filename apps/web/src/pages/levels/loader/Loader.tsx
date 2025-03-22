import './loader.css';

interface ILoaderProps {
  color: string;
}

const Loader = ({color}: ILoaderProps) => {
  return (
    <div className={'loader__container'}>
      <div className={'loader'} style={{borderTopColor: color}} />
    </div>
  );
};

export default Loader;
