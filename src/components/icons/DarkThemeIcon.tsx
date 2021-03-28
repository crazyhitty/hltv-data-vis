import React from "react";
import withAppProperty, { AppProps } from "../../AppProperty";
import Svg, { Path } from "react-native-svg";

interface DarkThemeIconProps extends AppProps {}

const DarkThemeIcon = (props: DarkThemeIconProps) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <Path d={"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"} />
  </Svg>
);

export default withAppProperty(DarkThemeIcon);
