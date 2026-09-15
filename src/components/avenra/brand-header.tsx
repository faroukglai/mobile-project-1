import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { DashedLine } from '@/components/avenra/dashed-line';
import { PadlockIcon, SnowflakeIcon, UserCircleIcon } from '@/components/avenra/icons';
import { InnerShadow } from '@/components/avenra/inner-shadow';
import { Avenra, type } from '@/constants/avenra';

type HeaderRight = 'profile' | ReactNode;

export function BrandHeader({
  topInset,
  right = 'profile',
  children,
}: {
  topInset: number;
  right?: HeaderRight;
  children?: ReactNode;
}) {
  return (
    <View style={[styles.topPanel, { paddingTop: topInset }]}>
      <View style={styles.headerRow}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <InnerShadow radius={8} tone="dark" />
            <SnowflakeIcon />
          </View>
          <Text style={styles.brandName}>Avenra</Text>
        </View>
        {right === 'profile' ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}>
            <InnerShadow radius={111} tone="light" />
            <UserCircleIcon />
          </Pressable>
        ) : (
          right
        )}
      </View>
      {children}
    </View>
  );
}

export function InvoiceSummary() {
  return (
    <View style={styles.invoiceRow}>
      <View style={styles.invoiceLeft}>
        <Text style={styles.invoiceLabel}>Invoice sent for approval</Text>
        <Text style={styles.invoiceAmount}>$87,098.12</Text>
      </View>
      <View style={styles.payoutBadge}>
        <InnerShadow radius={10} tone="light" />
        <PadlockIcon />
        <Text style={styles.payoutText}>Guaranteed Payout</Text>
      </View>
    </View>
  );
}

export function PaymentStepper() {
  return (
    <View style={styles.stepper}>
      <DashedLine color={Avenra.borderDashed} style={styles.stepLineLeft} width={115} />
      <DashedLine color={Avenra.borderDashed} style={styles.stepLineRight} width={115} />
      <Step active label="Approved" />
      <Step label="Payment" />
      <Step label="Paid out" />
    </View>
  );
}

function Step({ label, active }: { label: string; active?: boolean }) {
  return (
    <View style={styles.step}>
      <View style={[styles.radio, active && styles.radioActive]}>
        <View style={[styles.radioDot, active && styles.radioDotActive]} />
      </View>
      <Text style={styles.stepLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topPanel: {
    backgroundColor: Avenra.white,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    overflow: 'hidden',
  },
  headerRow: {
    height: 68,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Avenra.blue,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#080808',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  brandName: {
    ...type.h4Semibold,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 111,
    backgroundColor: Avenra.profileBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  invoiceRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invoiceLeft: {
    gap: 6,
  },
  invoiceLabel: {
    ...type.bodyMediumMedium,
  },
  invoiceAmount: {
    ...type.h2Bold,
  },
  payoutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(41, 179, 114, 0.08)',
    overflow: 'hidden',
  },
  payoutText: {
    ...type.bodyMediumSemibold,
    color: Avenra.green,
  },
  stepper: {
    height: 77,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Avenra.border,
  },
  stepLineLeft: {
    position: 'absolute',
    left: 73,
    top: 23.5,
    zIndex: 0,
  },
  stepLineRight: {
    position: 'absolute',
    left: 187,
    top: 23.5,
    zIndex: 0,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
    zIndex: 2,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 80,
    backgroundColor: Avenra.white,
    borderWidth: 0.8,
    borderColor: Avenra.borderDashed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    backgroundColor: Avenra.blue,
    borderWidth: 0,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 80,
    backgroundColor: Avenra.borderDashed,
  },
  radioDotActive: {
    backgroundColor: Avenra.white,
  },
  stepLabel: {
    ...type.bodyMediumMedium,
    color: Avenra.black,
  },
  pressed: {
    opacity: 0.85,
  },
});
