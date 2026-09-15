import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  /** Corner radius matching the parent button. */
  radius: number;
  /** `dark` = light top highlight on charcoal buttons; `light` = soft white inset on light buttons. */
  tone?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
};

/**
 * 1px inner top highlight + subtle 1px rim for a soft 3D pressed-metal look.
 * Parent must use `overflow: 'hidden'` and matching `borderRadius`.
 */
export function InnerShadow({ radius, tone = 'light', style }: Props) {
  const top =
    tone === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.95)';
  const rim =
    tone === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.65)';
  const bottom =
    tone === 'dark' ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.06)';

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <View
        style={[
          styles.rim,
          {
            borderRadius: radius,
            borderColor: rim,
          },
        ]}
      />
      <View
        style={[
          styles.topLine,
          {
            backgroundColor: top,
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
          },
        ]}
      />
      <View
        style={[
          styles.bottomLine,
          {
            backgroundColor: bottom,
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rim: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
  },
  topLine: {
    position: 'absolute',
    top: 0,
    left: 1,
    right: 1,
    height: 1,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 1,
    right: 1,
    height: 1,
  },
});
