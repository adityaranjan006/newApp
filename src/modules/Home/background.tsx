import React from 'react';
import Svg, { Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

interface BGProps {
  color1?: string; // Primary gradient color
  color2?: string; // Secondary gradient color
  style?: object;  // Optional style for the SVG component
}

const BG: React.FC<BGProps> = ({ color1 = "#220608", color2 = "#010103", style }) => (
  <Svg
    width="390"
    height="844"
    viewBox="0 0 390 844"
    fill="none"
    style={style}
  >
    <Rect width="390" height="844" fill="url(#paint0_radial_3021_213)" />
    <Defs>
      <RadialGradient
        id="paint0_radial_3021_213"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(195) rotate(90) scale(844 390)"
      >
        <Stop offset="0" stopColor={color1} />
        <Stop offset="0.195303" stopColor={color1} />
        <Stop offset="0.645" stopColor={color2} />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default BG;
