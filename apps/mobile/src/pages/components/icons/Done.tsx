import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '../../../style';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const Done = (props: SvgProps) => (
  <Svg
    data-name="Done"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
    width={24}
    height={24}
    {...props}
  >
    <Path
      style={{
        fill: Colors.TEXT_PRIMARY,
      }}
      d="M500 884.51 56 388.13l430.04 271.5L944 115.48 500 884.51z"
    />
  </Svg>
);

export default Done;
