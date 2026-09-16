import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../components/avenra/bottom-nav';
import {
  BrandHeader,
  InvoiceSummary,
  PaymentStepper,
} from '../components/avenra/brand-header';
import { DashedLine } from '../components/avenra/dashed-line';
import { PlusCircleIcon } from '../components/avenra/icons';
import { InnerShadow } from '../components/avenra/inner-shadow';
import { Avenra, type } from '../constants/avenra';

type InvoiceStatus = 'guaranteed' | 'processing' | 'decline';

const INVOICES: {
  id: string;
  month?: string;
  day?: string;
  code: string;
  kind: string;
  amount: string;
  status: InvoiceStatus;
}[] = [
  {
    id: '1',
    month: 'Dec',
    day: '05',
    code: 'INV-001',
    kind: 'Salary Payment',
    amount: '$16,000.00',
    status: 'guaranteed',
  },
  {
    id: '2',
    code: 'INV-002',
    kind: 'Bonus Payment',
    amount: '$8,500.00',
    status: 'processing',
  },
  {
    id: '3',
    month: 'Dec',
    day: '06',
    code: 'INV-001',
    kind: 'Reimbursement',
    amount: '$12,750.00',
    status: 'guaranteed',
  },
  {
    id: '4',
    code: 'INV-001',
    kind: 'Overtime Payment',
    amount: '$5,200.00',
    status: 'decline',
  },
  {
    id: '5',
    month: 'Dec',
    day: '07',
    code: 'INV-001',
    kind: 'Salary Payment',
    amount: '$20,000.00',
    status: 'guaranteed',
  },
];

const STATUS_META: Record<
  InvoiceStatus,
  { label: string; color: string }
> = {
  guaranteed: { label: 'Guaranteed Payout', color: Avenra.green },
  processing: { label: 'Processing payout', color: Avenra.blue },
  decline: { label: 'Decline', color: Avenra.red },
};

export default function InvoiceScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <BrandHeader topInset={insets.top}>
          <InvoiceSummary />
          <PaymentStepper />
        </BrandHeader>

        <View style={styles.actionBand}>
          <Pressable style={({ pressed }) => [styles.addBtnWrap, pressed && styles.pressed]}>
            <LinearGradient
              colors={['#303030', '#13161B']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.addBtn}>
              <InnerShadow radius={32} tone="dark" />
              <PlusCircleIcon size={22} />
              <Text style={styles.addBtnLabel}>Add invoice</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={[styles.bottomSheet, { paddingBottom: 110 + insets.bottom }]}>
          <View style={styles.handle} />
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Invoices List</Text>
          </View>

          {INVOICES.map((item, index) => {
            const meta = STATUS_META[item.status];
            return (
              <View key={item.id}>
                {index > 0 && <DashedLine color={Avenra.border} />}
                <View style={styles.row}>
                  <View style={styles.dateCol}>
                    {item.month ? (
                      <>
                        <Text style={styles.dateMonth}>{item.month}</Text>
                        <Text style={styles.dateDay}>{item.day}</Text>
                      </>
                    ) : null}
                  </View>

                  <View style={styles.detailCol}>
                    <Text style={styles.code}>{item.code}</Text>
                    <Text style={styles.kind}>{item.kind}</Text>
                  </View>

                  <View style={styles.amountCol}>
                    <Text style={styles.amount}>{item.amount}</Text>
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

      <BottomNav active="invoice" />
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
    flexGrow: 1,
    gap: 16,
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
  addBtnLabel: {
    ...type.bodyLargeSemibold,
  },
  bottomSheet: {
    flexGrow: 1,
    backgroundColor: Avenra.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 6,
    minHeight: 480,
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
  },
  listTitle: {
    ...type.bodyLargeBold,
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
  amountCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
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
