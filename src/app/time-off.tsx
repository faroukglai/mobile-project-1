import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../components/avenra/bottom-nav';
import { BrandHeader } from '../components/avenra/brand-header';
import { DashedLine } from '../components/avenra/dashed-line';
import {
  CalendarAddIcon,
  CircleClockIcon,
  InfoCircleIcon,
} from '../components/avenra/icons';
import { InnerShadow } from '../components/avenra/inner-shadow';
import { Avenra, type } from '../constants/avenra';

type LeaveStatus = 'pending' | 'review' | 'approved';

const BREAKDOWN = [
  { id: 'taken', label: 'Taken', value: '7d 4h', color: Avenra.blue, flex: 74 },
  { id: 'approved', label: 'Approved', value: '2d 2h', color: Avenra.green, flex: 22 },
  { id: 'requested', label: 'Requested', value: '0d 4h', color: Avenra.amber, flex: 4 },
  {
    id: 'available',
    label: 'Available to book',
    value: '5d 6h',
    color: Avenra.progressTrack,
    flex: 56,
  },
] as const;

const LEAVES: {
  id: string;
  month: string;
  day: string;
  code: string;
  kind: string;
  hours: string;
  status: LeaveStatus;
}[] = [
  {
    id: '1',
    month: 'Dec',
    day: '15',
    code: 'TIME-OFF-005',
    kind: 'Unpaid Leave',
    hours: '3 hours',
    status: 'pending',
  },
  {
    id: '2',
    month: 'Dec',
    day: '12',
    code: 'TIME-OFF-004',
    kind: 'Emergency Leave',
    hours: '4 hours',
    status: 'review',
  },
  {
    id: '3',
    month: 'Dec',
    day: '06',
    code: 'TIME-OFF-003',
    kind: 'Annual Leave',
    hours: '5 hours',
    status: 'approved',
  },
];

const STATUS_META: Record<LeaveStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: Avenra.amber },
  review: { label: 'In review', color: Avenra.blue },
  approved: { label: 'Approved', color: Avenra.green },
};

export default function TimeOffScreen() {
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
              accessibilityLabel="History"
              style={({ pressed }) => [styles.clockBtn, pressed && styles.pressed]}>
              <InnerShadow radius={111} tone="light" />
              <CircleClockIcon size={16} color={Avenra.gray600} />
            </Pressable>
          }>
          <View style={styles.titleBlock}>
            <Text style={styles.pageTitle}>About your time off</Text>
          </View>

          <View style={styles.cardWrap}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Time off</Text>
                <InfoCircleIcon />
              </View>

              <Text style={styles.available}>5 days, 6 hours available</Text>
              <Text style={styles.entitled}>Entitled 15 days / year</Text>

              <View style={styles.bar}>
                {BREAKDOWN.map((seg, i) => (
                  <View
                    key={seg.id}
                    style={[
                      styles.barSeg,
                      {
                        flex: seg.flex,
                        backgroundColor: seg.color,
                        marginLeft: i === 0 ? 0 : 3,
                      },
                    ]}
                  />
                ))}
              </View>

              <View style={styles.legend}>
                {BREAKDOWN.map((seg) => (
                  <View key={seg.id} style={styles.legendRow}>
                    <View style={styles.legendLeft}>
                      <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
                      <Text style={styles.legendLabel}>{seg.label}</Text>
                    </View>
                    <Text style={styles.legendValue}>{seg.value}</Text>
                  </View>
                ))}
              </View>
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
                <CalendarAddIcon size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.addBtnLabel}>Add time off</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Time off</Text>
            <Pressable>
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>

          {LEAVES.map((item, index) => {
            const meta = STATUS_META[item.status];
            return (
              <View key={item.id}>
                {index > 0 && <DashedLine color={Avenra.border} />}
                <View style={styles.row}>
                  <View style={styles.dateCol}>
                    <Text style={styles.dateMonth}>{item.month}</Text>
                    <Text style={styles.dateDay}>{item.day}</Text>
                  </View>

                  <View style={styles.detailCol}>
                    <Text style={styles.code}>{item.code}</Text>
                    <Text style={styles.kind}>{item.kind}</Text>
                  </View>

                  <View style={styles.rightCol}>
                    <Text style={styles.hours}>{item.hours}</Text>
                    <View style={styles.statusRow}>
                      <View style={[styles.statusDot, { backgroundColor: meta.color }]} />
                      <Text style={[styles.statusText, { color: meta.color }]}>
                        {meta.label}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <BottomNav active="timeoff" />
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
  clockBtn: {
    width: 36,
    height: 36,
    borderRadius: 111,
    backgroundColor: Avenra.profileBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titleBlock: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  pageTitle: {
    ...type.h4Semibold,
  },
  cardWrap: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: Avenra.white,
    borderWidth: 1,
    borderColor: Avenra.border,
    padding: 14,
    gap: 8,
    shadowColor: '#262D3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  available: {
    ...type.bodyLargeBold,
    fontSize: 18,
    lineHeight: 22,
    marginTop: 4,
  },
  entitled: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  bar: {
    flexDirection: 'row',
    height: 10,
    marginTop: 10,
    marginBottom: 6,
  },
  barSeg: {
    height: 10,
    borderRadius: 16,
  },
  legend: {
    gap: 10,
    marginTop: 6,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  legendValue: {
    ...type.bodyMediumSemibold,
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
    minHeight: 360,
    alignItems: 'center',
  },
  handle: {
    width: 38,
    height: 5,
    borderRadius: 121,
    backgroundColor: Avenra.borderDashed,
    marginBottom: 10,
  },
  listHeader: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    ...type.bodyLargeBold,
  },
  viewAll: {
    ...type.bodyMediumSemibold,
    color: Avenra.blue,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  dateCol: {
    width: 36,
    gap: 2,
  },
  dateMonth: {
    ...type.bodySmallMedium,
  },
  dateDay: {
    ...type.bodyLargeBold,
  },
  detailCol: {
    flex: 1,
    gap: 4,
  },
  code: {
    ...type.bodyMediumSemibold,
  },
  kind: {
    ...type.bodySmallMedium,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  hours: {
    ...type.bodyMediumSemibold,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    ...type.bodySmallMedium,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});
