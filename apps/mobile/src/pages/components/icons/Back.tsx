import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { Colors } from "../../../style";

const Back = (props: SvgProps) => (
  <Svg
    data-name="Layer 1"
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
      d="m126 500 374-215.93L874 68.14 772 500l102 431.86-374-215.93L126 500z"
    />
  </Svg>
);

export default Back;
