import React from 'react';
import { PanResponder, Animated } from 'react-native';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { cartesianToPolar, interpolate, polarToCartesian } from './conversions';
// @ts-ignore //javascript lib on import showing warning, missing type definitions (package lacks type declarations), so it's ignored
import { hsv2Hex, hsvToRgb } from 'colorsys';
import { constants } from '@/constants/CONSTANTS';

export interface SemiCircularSliderProps {
  trackRadius: number;
  thumbRadius?: number;
  thumbColor?: string;
  trackWidth?: number;
  value?: number;
  minValue: number;
  maxValue: number;
  onValueChange?: (angle: number) => any;
  trackColor?: string;
  trackStrokeWidth: number;
  circleType: string;
  paddingVertical?: number;
  linearGradient: Array<{ color: string; offset: number }>;
  gestureDisabled: boolean;
  onChangeColor: (color: any) => void
  brightness?: number
}


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleType = {
  Bottom: "Bottom",
  Top: "Top"
}

const ColorPickerSlider = (props: SemiCircularSliderProps) => {

  const {
    trackRadius = 150,
    value = 0,
    minValue = constants['min-temperature-value'],
    maxValue = constants['max-temperature-value'],
    thumbRadius = 15,
    thumbColor = constants['thumb-active-color'],
    trackStrokeWidth = 22,
    linearGradient = [
      { color: "#0000FF", offset: 0 },
      { color: "#A9A9A9", offset: 0.2 },
      { color: "#A9A9A9", offset: 0.4 },
      { color: "#A9A9A9", offset: 0.7 },
      { color: "#A9A9A9", offset: 1 },
    ],
    circleType = "Top",
    paddingVertical = 20,
    gestureDisabled = false,
    onValueChange,
    onChangeColor,
    brightness = 100,
  } = props

  const width: number = trackRadius * 2 + thumbRadius * 2 + trackStrokeWidth / 2;
  const height: number = trackRadius + paddingVertical + trackStrokeWidth;
  const angleOffset: number =12
  const startAngle: number = circleType === CircleType.Bottom ? angleOffset - 180 : angleOffset;
  const endAngle: number = circleType === CircleType.Bottom ? -angleOffset : 180 - angleOffset;
  const interpolatedAngle = interpolate(
    value,
    [minValue, maxValue],
    circleType === CircleType.Bottom
      ? [180 + angleOffset, 360 - angleOffset]
      : [0 + angleOffset, 180 - angleOffset],
  );

  const compensatePadding = 10;
  const cx = width / 2
  const cy = circleType === CircleType.Bottom ? paddingVertical / 2 - compensatePadding : height - paddingVertical / 2 + compensatePadding
  const rad = trackRadius

  const currentCord = polarToCartesian(Math.round(interpolatedAngle), cx, cy, rad);
  let animatedValue = new Animated.ValueXY({
    x: currentCord.x,
    y: currentCord.y,
  });

  const handlePanResponderMove = ({ nativeEvent: { locationX, locationY } }: { nativeEvent: { locationX: number; locationY: number } }) => {
    if (gestureDisabled) return;
    const {
      piTo2piAngleInDegree,
      piToMinuspiAngleInDegree,
    } = cartesianToPolar(locationX, locationY, cx, cy);
    const { x, y } = polarToCartesian(piTo2piAngleInDegree, cx, cy, rad);

    let hexColor = hsv2Hex({
      h: interpolate(value, [0, 100], [0, 359]),
      s: 100,
      v: brightness,
    });

    let rgbColor = hsvToRgb({
      h: interpolate(value, [0, 100], [0, 359]),
      s: 100,
      v: brightness,
    });
    if (
      piToMinuspiAngleInDegree <= endAngle &&
      piToMinuspiAngleInDegree >= startAngle &&
      circleType === CircleType.Bottom
    ) {
      animatedValue.setValue({ x, y });
      const updateAngle = interpolate(
        piToMinuspiAngleInDegree,
        [-angleOffset, -180 + angleOffset],
        [minValue, maxValue],
      );
      if (onChangeColor) onChangeColor({ hexColor, rgbColor });
      if (onValueChange) onValueChange(Math.round(updateAngle));
    }
    else if (
      piToMinuspiAngleInDegree >= startAngle &&
      piTo2piAngleInDegree <= endAngle &&
      circleType === CircleType.Top
    ) {
      animatedValue.setValue({ x, y });
      const updateAngle = interpolate(
        piTo2piAngleInDegree,
        [angleOffset, 180 - angleOffset],
        [minValue, maxValue],
      );
      if (onChangeColor) onChangeColor({ hexColor, rgbColor });
      if (onValueChange) onValueChange(Math.round(updateAngle));
    }
  }
  let _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  const startCoord = polarToCartesian(startAngle, cx, cy, rad);
  const endCoord = polarToCartesian(endAngle, cx, cy, rad);

  return (
    <Animated.View>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="gradient">
            {linearGradient?.map((item, index) => (
              <Stop
                key={index}
                offset={
                  item?.offset ||
                  `${index / linearGradient.length}`
                }
                stopColor={item?.color}
                stopOpacity={1}
              />
            ))}
          </LinearGradient>
        </Defs>
        <Path
          stroke="url(#gradient)"
          strokeWidth={trackStrokeWidth}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${rad} ${rad} 1 0 1 ${endCoord.x} ${endCoord.y}`}
          strokeLinecap="round"
        />
        <AnimatedCircle
          cx={animatedValue.x}
          cy={animatedValue.y}
          r={thumbRadius}
          fill={thumbColor}
          {..._panResponder.panHandlers}
        />
      </Svg>
    </Animated.View>
  );
}

export default ColorPickerSlider;
