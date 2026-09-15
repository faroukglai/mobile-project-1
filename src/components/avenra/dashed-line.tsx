import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';

type Props = {
  color?: string;
  width?: number | `${number}%`;
  style?: StyleProp<ViewStyle>;
};

/** Horizontal dashed rule — reliable across iOS/Android (unlike borderStyle dashed). */
export function DashedLine({ color = '#DFE1E6', width = '100%', style }: Props) {
  return (
    <View style={[{ width: width as number | `${number}%`, height: 1, overflow: 'hidden' }, style]}>
      <Svg height={1} width="100%" style={StyleSheet.absoluteFill}>
        <Line
          x1="0"
          y1="0.5"
          x2="999"
          y2="0.5"
          stroke={color}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      </Svg>
    </View>
  );
}
