import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { type Href, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../components/avenra/bottom-nav';
import {
  BrandHeader,
  InvoiceSummary,
  PaymentStepper,
} from '../components/avenra/brand-header';
import { DashedLine } from '../components/avenra/dashed-line';
import {
  AlarmClockIcon,
  ArrowCircleDownIcon,
  BagIcon,
  BrightnessIcon,
  CalendarAddIcon,
  CheckSquareIcon,
  FolderDocIcon,
  HandHeldIcon,
  MenuDotsIcon,
  ReceiptIcon,
} from '../components/avenra/icons';
import { InnerShadow } from '../components/avenra/inner-shadow';
import { Avenra, type } from '../constants/avenra';

const ACTIVITIES = [
  {
    id: '1',
    title: 'Approved Time Off',
    date: 'Dec 1',
    hours: '5 hours',
    iconBg: '#E665CC',
    iconBorder: '#E665CC',
    Icon: CheckSquareIcon,
    trailing: 'doc' as const,
  },
  {
    id: '2',
    title: 'Morning Shift',
    date: 'Dec 2',
    hours: '4 hours',
    iconBg: 'rgba(124, 63, 238, 0.7)',
    iconBorder: '#A676FF',
    Icon: BrightnessIcon,
    trailing: 'doc' as const,
  },
  {
    id: '3',
    title: 'Overtime Work',
    date: 'Dec 3',
    hours: '2 hours',
    iconBg: 'rgba(229, 9, 20, 0.7)',
    iconBorder: '#FD7279',
    Icon: AlarmClockIcon,
    trailing: 'doc' as const,
  },
  {
    id: '4',
    title: 'Approved Time Off',
    date: 'Dec 2',
    hours: '4 hours',
    iconBg: 'rgba(124, 63, 238, 0.7)',
    iconBorder: '#A676FF',
    Icon: BagIcon,
    trailing: 'arrow' as const,
  },
] as const;

const QUICK_ACTIONS = [
  {
    id: 'invoice',
    label: 'Add invoice',
    Icon: ReceiptIcon,
    href: '/invoice' as Href,
  },
  {
    id: 'timeoff',
    label: 'Add time off',
    Icon: CalendarAddIcon,
    href: '/time-off' as Href,
  },
  { id: 'hours', label: 'Add hours', Icon: AlarmClockIcon },
] as const;

export default function HomeScreen() {
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
        <BrandHeader topInset={insets.top}>
          <InvoiceSummary />
          <PaymentStepper />
        </BrandHeader>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActions}
          style={styles.quickActionsScroll}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.id}
              style={({ pressed }) => [styles.quickChip, pressed && styles.pressed]}
              onPress={() => {
                if ('href' in action && action.href) {
                  router.push(action.href);
                }
              }}>
              <InnerShadow radius={32} tone="dark" />
              <View style={styles.quickIconWrap}>
                <InnerShadow radius={99} tone="dark" />
                <action.Icon size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          <View style={styles.sheetBody}>
            <View style={styles.statusCard}>
              <View style={styles.statusTop}>
                <FolderDocIcon />
                <View style={styles.statusCopy}>
                  <View style={styles.statusTitles}>
                    <Text style={styles.statusTitle}>Work will resume soon</Text>
                    <Text style={styles.statusSubtitle}>
                      Back in{' '}
                      <Text style={styles.statusDuration}>7 hours 59 minutes</Text>
                    </Text>
                  </View>
                  <View style={styles.statusAlert}>
                    <View style={styles.alertDot} />
                    <Text style={styles.alertText}>No active work sessions</Text>
                  </View>
                </View>
                <Pressable accessibilityRole="button" hitSlop={8}>
                  <MenuDotsIcon />
                </Pressable>
              </View>

              <View style={styles.nextHours}>
                <Text style={styles.nextLabel}>Next Working Hours</Text>
                <View style={styles.progressRow}>
                  <View style={styles.progressActive} />
                  <View style={styles.progressTrack} />
                </View>
                <View style={styles.nextMeta}>
                  <Text style={styles.nextMetaText}>Monday, Mar 23</Text>
                  <Text style={styles.nextMetaText}>09:00 AM – 06:00 PM</Text>
                </View>
              </View>
            </View>

            <View style={styles.activities}>
              <View style={styles.activitiesHeader}>
                <Text style={styles.activitiesTitle}>Upcoming Activities</Text>
              </View>

              {ACTIVITIES.map((item, index) => (
                <View key={item.id}>
                  {index > 0 && (
                    <DashedLine
                      color={
                        index === ACTIVITIES.length - 1
                          ? 'rgba(0,0,0,0.06)'
                          : Avenra.border
                      }
                    />
                  )}
                  <View style={styles.activityRow}>
                    <View style={styles.activityLeft}>
                      <View
                        style={[
                          styles.activityIcon,
                          {
                            backgroundColor: item.iconBg,
                            borderColor: item.iconBorder,
                          },
                          item.id === '1' && styles.activityIconPink,
                        ]}>
                        <InnerShadow radius={item.id === '1' ? 9 : 8} tone="dark" />
                        <item.Icon size={16} color="#FFFFFF" />
                      </View>
                      <View style={styles.activityCopy}>
                        <Text style={styles.activityTitle}>{item.title}</Text>
                        <Text style={styles.activityDate}>{item.date}</Text>
                      </View>
                    </View>
                    <View style={styles.activityRight}>
                      {item.trailing === 'doc' ? (
                        <HandHeldIcon />
                      ) : (
                        <ArrowCircleDownIcon />
                      )}
                      <Text style={styles.activityHours}>{item.hours}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav active="home" />
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
  quickActionsScroll: {
    flexGrow: 0,
  },
  quickActions: {
    paddingHorizontal: 16,
    gap: 10,
    alignItems: 'center',
    height: 42,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    paddingLeft: 12,
    paddingRight: 14,
    paddingVertical: 9,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  quickIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  quickLabel: {
    ...type.bodyMediumMedium,
    color: Avenra.white,
  },
  bottomSheet: {
    backgroundColor: Avenra.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 6,
    minHeight: 535,
    alignItems: 'center',
    gap: 16,
  },
  handle: {
    width: 38,
    height: 5,
    borderRadius: 121,
    backgroundColor: Avenra.borderDashed,
  },
  sheetBody: {
    alignSelf: 'stretch',
    gap: 14,
    alignItems: 'center',
  },
  statusCard: {
    width: 343,
    borderRadius: 16,
    backgroundColor: Avenra.surface,
    borderWidth: 1,
    borderColor: Avenra.white,
    padding: 14,
    gap: 16,
    shadowColor: '#262D3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  statusTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  statusCopy: {
    flex: 1,
    gap: 12,
  },
  statusTitles: {
    gap: 4,
  },
  statusTitle: {
    ...type.bodyLargeBold,
  },
  statusSubtitle: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  statusDuration: {
    ...type.bodyMediumSemibold,
    color: Avenra.black,
  },
  statusAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Avenra.red,
  },
  alertText: {
    ...type.bodyMediumSemibold,
    color: Avenra.red,
  },
  nextHours: {
    alignSelf: 'stretch',
    gap: 6,
  },
  nextLabel: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 4,
    height: 12,
  },
  progressActive: {
    width: 12,
    height: 12,
    borderRadius: 16,
    backgroundColor: Avenra.blue,
  },
  progressTrack: {
    flex: 1,
    height: 12,
    borderRadius: 16,
    backgroundColor: Avenra.progressTrack,
  },
  nextMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextMetaText: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  activities: {
    alignSelf: 'stretch',
  },
  activitiesHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  activitiesTitle: {
    ...type.bodyLargeBold,
  },
  activityRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityIconPink: {
    borderRadius: 9,
  },
  activityCopy: {
    flex: 1,
    gap: 6,
  },
  activityTitle: {
    ...type.bodyMediumSemibold,
  },
  activityDate: {
    ...type.bodySmallMedium,
  },
  activityRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityHours: {
    ...type.bodyMediumSemibold,
  },
  pressed: {
    opacity: 0.85,
  },
});
