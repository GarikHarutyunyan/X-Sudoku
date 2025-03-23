import {Colors} from '../../style';

const Done = (props: any) => (
  <svg
    data-name="Done"
    viewBox="0 0 1000 1000"
    width={24}
    height={24}
    {...props}
  >
    <path
      fill={Colors.TEXT_PRIMARY}
      d="M500 884.51 56 388.13l430.04 271.5L944 115.48 500 884.51z"
    />
  </svg>
);

export default Done;
