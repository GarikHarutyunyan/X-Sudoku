import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '../../../style';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const Remove = (props: SvgProps) => (
  <Svg
    data-name="Remove"
    viewBox="0 0 1000 1000"
    width={24}
    height={24}
    {...props}
  >
    <Path
      fill={Colors.TEXT_PRIMARY}
      d="M904 393.26H517.47V241.92L306.73 370.96 96 500l210.73 129.04 210.74 129.04V606.74H904V393.26z"
    />
  </Svg>
);

export default Remove;
