/* SVGR has dropped some elements not supported by react-native-svg: title */

import {Colors} from '../../style';

const Remove = (props: any) => (
  <svg
    data-name="Remove"
    viewBox="0 0 1000 1000"
    width={24}
    height={24}
    {...props}
  >
    <path
      fill={Colors.TEXT_PRIMARY}
      d="M904 393.26H517.47V241.92L306.73 370.96 96 500l210.73 129.04 210.74 129.04V606.74H904V393.26z"
    />
  </svg>
);

export default Remove;
