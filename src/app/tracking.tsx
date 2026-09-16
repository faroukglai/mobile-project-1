import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Line } from 'react-native-svg';

import { BottomNav } from '../components/avenra/bottom-nav';
import { BrandHeader } from '../components/avenra/brand-header';
import {
  AlarmClockIcon,
  ChevronIcon,
  HelpQuestionIcon,
  MapPinIcon,
  VideoCamIcon,
} from '../components/avenra/icons';
import { InnerShadow } from '../components/avenra/inner-shadow';
import { Avenra, type } from '../constants/avenra';

const WEEK_DAYS = [
  { label: 'Mo', date: '30', hasDot: true },
  { label: 'Tu', date: '01', hasDot: true },
  { label: 'We', date: '02', hasDot: true },
  { label: 'Th', date: '03', hasDot: false, selected: true },
  { label: 'Fr', date: '04', hasDot: false },
  { label: 'Sa', date: '05', hasDot: false },
  { label: 'Su', date: '06', hasDot: false },
] as const;

const EVENTS = [
  {
    id: '1',
    start: '09:00 AM',
    end: '11:30 AM',
    title: "Workshop: 'HR System Optimization'",
    metaIcon: 'pin' as const,
    meta: 'Venue: Meeting Room A, Head Office',
  },
  {
    id: 'gap',
    type: 'gap' as const,
    start: '12:00 PM',
    end: '01:00 PM',
  },
  {
    id: '2',
    start: '01:00 PM',
    end: '03:00 PM',
    title: "Training: 'Payroll & Invoice Management'",
    metaIcon: 'video' as const,
    meta: 'Zoom Session (Online)',
  },
] as const;

export default function TrackingScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 110 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <BrandHeader
          topInset={insets.top}
          right={
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Help"
              style={({ pressed }) => [styles.helpBtn, pressed && styles.pressed]}>
              <InnerShadow radius={111} tone="light" />
              <HelpQuestionIcon />
            </Pressable>
          }>
          <View style={styles.weekRow}>
            <Text style={styles.weekTotal}>
              Week total: <Text style={styles.weekTotalBold}>0h</Text>
            </Text>
            <Pressable style={styles.summaryBtn}>
              <InnerShadow radius={20} tone="light" />
              <Text style={styles.summaryBtnText}>View summary</Text>
            </Pressable>
          </View>

          <View style={styles.calendar}>
            <View style={styles.monthRow}>
              <Text style={styles.monthTitle}>December 2026</Text>
              <View style={styles.chevrons}>
                <Pressable hitSlop={8}>
                  <ChevronIcon direction="left" />
                </Pressable>
                <Pressable hitSlop={8}>
                  <ChevronIcon direction="right" />
                </Pressable>
              </View>
            </View>

            <View style={styles.daysRow}>
              {WEEK_DAYS.map((day) => (
                <View key={day.label} style={styles.dayCol}>
                  <Text style={styles.dayLabel}>{day.label}</Text>
                  <View
                    style={[
                      styles.dateCircle,
                      'selected' in day && day.selected && styles.dateCircleActive,
                    ]}>
                    <Text
                      style={[
                        styles.dateText,
                        'selected' in day && day.selected && styles.dateTextActive,
                      ]}>
                      {day.date}
                    </Text>
                  </View>
                  <View style={styles.dotSlot}>
                    {day.hasDot ? <View style={styles.dayDot} /> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </BrandHeader>

        <View style={styles.actionBand}>
          <Pressable style={({ pressed }) => [styles.addBtnWrap, pressed && styles.pressed]}>
            <LinearGradient
              colors={['#303030', '#13161B']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.addBtn}>
              <InnerShadow radius={32} tone="dark" />
              <View style={styles.addIconWrap}>
                <InnerShadow radius={99} tone="dark" />
                <AlarmClockIcon size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.addBtnLabel}>Add hours</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <View style={styles.dayTotalRow}>
            <Text style={styles.dayTotal}>
              Day total: <Text style={styles.dayTotalBold}>8h</Text>
            </Text>
          </View>

          <View style={styles.timeline}>
            {EVENTS.map((item, index) => {
              if ('type' in item && item.type === 'gap') {
                return (
                  <View key={item.id} style={styles.timelineRow}>
                    <View style={styles.timeCol}>
                      <Text style={styles.timeLabel}>{item.start}</Text>
                      <DashedVLine height={56} />
                      <Text style={styles.timeLabel}>{item.end}</Text>
                    </View>
                    <View style={styles.gapCard}>
                      <DiagonalStripes />
                    </View>
                  </View>
                );
              }

              const event = item as Exclude<(typeof EVENTS)[number], { type: 'gap' }>;
              return (
                <View key={event.id} style={styles.timelineRow}>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>{event.start}</Text>
                    {index < EVENTS.length - 1 ? <DashedVLine height={72} /> : null}
                  </View>
                  <View style={styles.eventCard}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventTime}>
                      {event.start} – {event.end}
                    </Text>
                    <View style={styles.eventMeta}>
                      {event.metaIcon === 'pin' ? <MapPinIcon /> : <VideoCamIcon />}
                      <Text style={styles.eventMetaText}>{event.meta}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <BottomNav active="tracking" />
    </View>
  );
}

function DashedVLine({ height }: { height: number }) {
  return (
    <Svg width={2} height={height} style={styles.vLine}>
      <Line
        x1={1}
        y1={0}
        x2={1}
        y2={height}
        stroke={Avenra.borderDashed}
        strokeWidth={1.5}
        strokeDasharray="3 4"
      />
    </Svg>
  );
}

function DiagonalStripes() {
  const lines = Array.from({ length: 18 }, (_, i) => i);
  return (
    <View style={styles.stripes}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {lines.map((i) => (
          <Line
            key={i}
            x1={-20 + i * 14}
            y1={70}
            x2={20 + i * 14}
            y2={-10}
            stroke="#E8ECF0"
            strokeWidth={6}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Avenra.black,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
  },
  helpBtn: {
    width: 36,
    height: 36,
    borderRadius: 111,
    backgroundColor: Avenra.profileBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  weekRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekTotal: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  weekTotalBold: {
    ...type.bodyMediumSemibold,
    color: Avenra.black,
  },
  summaryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Avenra.border,
    backgroundColor: Avenra.white,
    overflow: 'hidden',
  },
  summaryBtnText: {
    ...type.bodyMediumSemibold,
  },
  calendar: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthTitle: {
    ...type.bodyLargeBold,
  },
  chevrons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCol: {
    width: 40,
    alignItems: 'center',
    gap: 6,
  },
  dayLabel: {
    ...type.bodySmallMedium,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleActive: {
    backgroundColor: Avenra.blue,
  },
  dateText: {
    ...type.bodyMediumSemibold,
    color: Avenra.gray400,
  },
  dateTextActive: {
    color: Avenra.white,
  },
  dotSlot: {
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Avenra.blueSoft,
  },
  actionBand: {
    paddingHorizontal: 16,
  },
  addBtnWrap: {
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  addBtn: {
    height: 50,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    overflow: 'hidden',
  },
  addIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addBtnLabel: {
    ...type.bodyLargeSemibold,
  },
  bottomSheet: {
    backgroundColor: Avenra.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 6,
    minHeight: 420,
    alignItems: 'stretch',
  },
  handle: {
    width: 38,
    height: 5,
    borderRadius: 121,
    backgroundColor: Avenra.borderDashed,
    alignSelf: 'center',
    marginBottom: 10,
  },
  dayTotalRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  dayTotal: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  dayTotalBold: {
    ...type.bodyMediumSemibold,
    color: Avenra.black,
  },
  timeline: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeCol: {
    width: 62,
    alignItems: 'flex-start',
  },
  timeLabel: {
    ...type.bodySmallMedium,
    color: Avenra.gray500,
  },
  vLine: {
    marginVertical: 4,
    marginLeft: 18,
  },
  eventCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Avenra.border,
    backgroundColor: Avenra.white,
    padding: 14,
    gap: 6,
  },
  eventTitle: {
    ...type.bodyMediumSemibold,
  },
  eventTime: {
    ...type.bodySmallMedium,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  eventMetaText: {
    ...type.bodySmallMedium,
    flex: 1,
  },
  gapCard: {
    flex: 1,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Avenra.border,
    overflow: 'hidden',
    backgroundColor: '#F7F8FA',
  },
  stripes: {
    flex: 1,
  },
  pressed: {
    opacity: 0.85,
  },
});
