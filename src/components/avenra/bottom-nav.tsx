import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type Href, router } from 'expo-router';
import Animated, {
  Easing,
  FadeInRight,
  FadeOut,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InnerShadow } from './inner-shadow';
import {
  ApplicationAddIcon,
  BlankCalendarIcon,
  CircleClockIcon,
  HomeNavIcon,
  ReceiptIcon,
  UserCircleIcon,
} from './icons';
import { Avenra, type } from '../../constants/avenra';

export type NavTab = 'home' | 'invoice' | 'timeoff' | 'tracking' | 'profile';

const TABS: {
  id: NavTab;
  label: string;
  href: Href;
  Icon: typeof HomeNavIcon;
}[] = [
  { id: 'home', label: 'Home', href: '/home' as Href, Icon: HomeNavIcon },
  { id: 'invoice', label: 'Invoice', href: '/invoice' as Href, Icon: ReceiptIcon },
  { id: 'timeoff', label: 'Time Off', href: '/time-off' as Href, Icon: BlankCalendarIcon },
  { id: 'tracking', label: 'Tracking', href: '/tracking' as Href, Icon: CircleClockIcon },
  { id: 'profile', label: 'Profile', href: '/profile' as Href, Icon: UserCircleIcon },
];

const SPRING = { damping: 22, stiffness: 280, mass: 0.8 };
const PILL_PAD = 4;
const GAP = 2;

type Props = {
  active: NavTab;
};

export function BottomNav({ active }: Props) {
  const insets = useSafeAreaInsets();
  const activeIndex = Math.max(0, TABS.findIndex((t) => t.id === active));

  const trackW = useSharedValue(0);
  const indexSV = useSharedValue(activeIndex);

  useEffect(() => {
    indexSV.value = withSpring(activeIndex, SPRING);
  }, [activeIndex, indexSV]);

  const pillStyle = useAnimatedStyle(() => {
    const n = TABS.length;
    const inner = Math.max(trackW.value - PILL_PAD * 2 - GAP * (n - 1), 0);
    const slot = inner / n;
    // Active pill grows to ~fill its slot; inactive slots stay icon-only
    const w = slot;
    const x = PILL_PAD + indexSV.value * (slot + GAP);
    return {
      width: w,
      transform: [{ translateX: x }],
    };
  });

  return (
    <LinearGradient
      colors={['rgba(255,255,255,0)', '#FFFFFF']}
      locations={[0, 0.28]}
      style={[styles.navGradient, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.navRow}>
        <View
          style={styles.navPill}
          onLayout={(e) => {
            trackW.value = e.nativeEvent.layout.width;
          }}>
          <View pointerEvents="none" style={styles.pillWellTop} />
          <View pointerEvents="none" style={styles.pillWellBottom} />
          <View pointerEvents="none" style={styles.pillWellLeft} />
          <View pointerEvents="none" style={styles.pillWellRight} />

          <Animated.View style={[styles.activePill, pillStyle]}>
            <InnerShadow radius={14} tone="light" />
          </Animated.View>

          {TABS.map((tab, index) => (
            <TabItem
              key={tab.id}
              tab={tab}
              index={index}
              activeIndex={activeIndex}
              indexSV={indexSV}
              onPress={() => {
                if (tab.id === active) return;
                router.replace(tab.href);
              }}
            />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.fabWrap, pressed && styles.pressed]}
          onPress={() => router.push('/more' as Href)}>
          <LinearGradient colors={['#303030', '#13161B']} style={styles.fab}>
            <InnerShadow radius={18} tone="dark" />
            <ApplicationAddIcon />
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function TabItem({
  tab,
  index,
  activeIndex,
  indexSV,
  onPress,
}: {
  tab: (typeof TABS)[number];
  index: number;
  activeIndex: number;
  indexSV: SharedValue<number>;
  onPress: () => void;
}) {
  const isActive = index === activeIndex;
  const color = isActive ? Avenra.black : Avenra.navInactive;

  const iconAnim = useAnimatedStyle(() => {
    const dist = Math.abs(indexSV.value - index);
    const scale = interpolate(dist, [0, 1], [1, 0.92], 'clamp');
    return {
      transform: [{ scale }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      style={styles.navItem}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={tab.label}>
      <Animated.View style={[styles.navItemInner, iconAnim]}>
        <tab.Icon size={18} color={color} />
        {isActive ? (
          <Animated.Text
            key={`label-${tab.id}`}
            entering={FadeInRight.duration(240).easing(Easing.out(Easing.cubic))}
            exiting={FadeOut.duration(120)}
            style={styles.navActiveLabel}
            numberOfLines={1}>
            {tab.label}
          </Animated.Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  navGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 24,
  },
  navRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: PILL_PAD,
    gap: GAP,
    height: 50,
    borderRadius: 18,
    backgroundColor: Avenra.surface,
    overflow: 'hidden',
  },
  pillWellTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.045)',
  },
  pillWellBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  pillWellLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  pillWellRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  activePill: {
    position: 'absolute',
    top: PILL_PAD,
    left: 0,
    height: 42,
    borderRadius: 14,
    backgroundColor: Avenra.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  navItem: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  navItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 4,
  },
  navActiveLabel: {
    ...type.bodyMediumSemibold,
    fontSize: 12,
    color: Avenra.black,
  },
  fabWrap: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
});
