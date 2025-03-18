import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '../../../style';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const Refresh = (props: SvgProps) => (
  <Svg
    data-name="Refresh"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
    width={24}
    height={24}
    {...props}
  >
    <Path
      d="M917.21 364.79C885 285.44 825 217.49 749.25 175.45c-75.86-42.22-166.65-56-252.82-40.88-86.21 16.13-166.62 62.64-224.08 130.14C231 313.44 202.62 373 189.16 435.91L56.4 404.55l78.95 136.74L214.29 678l79-136.74 78.95-136.74-111.7 26.38a323.76 323.76 0 0 1 60.28-126.56A333.2 333.2 0 0 1 507 187.16c73.61-15.63 153.19-6.94 221.32 27.79s124.16 93.13 155.94 163.74c30.81 70.8 37.72 152.83 16.8 228.45s-68.34 143.94-133.17 190C703 843 621.93 866 541.56 860.57c-80.36-5.08-158.74-39.51-218.06-95.37 57.2 58 135.11 96 217.29 104.27C622.84 878 708 857.6 778 811.93c69.86-45.88 123.28-116.6 148.82-197.21s21.68-170.27-9.61-249.93Z"
      style={{
        fill: Colors.TEXT_PRIMARY,
      }}
    />
  </Svg>
);

export default Refresh;
