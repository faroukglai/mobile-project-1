import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  ChatBubblesIcon,
  CogIcon,
  HelpQuestionIcon,
  LightbulbIcon,
  NewFileIcon,
  ReviewStarFolderIcon,
  UsersGroupIcon,
} from '@/components/avenra/icons';
import { InnerShadow } from '@/components/avenra/inner-shadow';
import { Avenra, type } from '@/constants/avenra';

const MENU = [
  {
    id: 'files',
    label: 'Files',
    bg: '#E665CC',
    border: '#E665CC',
    radius: 9.14,
    Icon: NewFileIcon,
  },
  {
    id: 'support',
    label: 'Support chat',
    bg: 'rgba(124, 63, 238, 0.7)',
    border: '#A676FF',
    radius: 8,
    Icon: ChatBubblesIcon,
  },
  {
    id: 'feedback',
    label: 'Give aap feedback',
    bg: 'rgba(229, 9, 20, 0.7)',
    border: '#FD7279',
    radius: 8,
    Icon: LightbulbIcon,
  },
  {
    id: 'help',
    label: 'Help center',
    bg: '#F6A001',
    border: '#F6A001',
    radius: 8,
    Icon: HelpQuestionIcon,
  },
  {
    id: 'switch',
    label: 'Switch profile',
    bg: '#1E80F9',
    border: '#1E80F9',
    radius: 8,
    Icon: UsersGroupIcon,
  },
  {
    id: 'settings',
    label: 'Settings',
    bg: '#29B372',
    border: '#33B779',
    radius: 9.14,
    Icon: CogIcon,
  },
] as const;

export default function MoreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
          <InnerShadow radius={111} tone="light" />
          <ArrowLeftIcon />
        </Pressable>
        <Text style={styles.title}>More</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 24 + Math.max(insets.bottom, 16) },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.grid}>
          {Array.from({ length: 3 }, (_, row) => (
            <View key={row} style={styles.gridRow}>
              {MENU.slice(row * 2, row * 2 + 2).map((item) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                  <View
                    style={[
                      styles.iconWrap,
                      {
                        backgroundColor: item.bg,
                        borderColor: item.border,
                        borderRadius: item.radius,
                      },
                    ]}>
                    <InnerShadow radius={item.radius} tone="dark" />
                    <item.Icon size={16} color="#FFFFFF" />
                  </View>
                  <Text style={styles.cardLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.reviewCard}>
          <ReviewStarFolderIcon />
          <View style={styles.reviewCopy}>
            <Text style={styles.reviewTitle}>Liking your experience so far?</Text>
            <Text style={styles.reviewBody}>
              We'd really appreciate your thoughts.Leave us a review on the App Store!
            </Text>
          </View>
        </View>

        <Pressable style={({ pressed }) => [styles.ctaWrap, pressed && styles.pressed]}>
          <LinearGradient
            colors={['#303030', '#13161B']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.cta}>
            <InnerShadow radius={18} tone="dark" />
            <Text style={styles.ctaLabel}>Request time off</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Avenra.white,
  },
  header: {
    height: 68,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 111,
    backgroundColor: Avenra.profileBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#262D3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    ...type.bodyLargeBold,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 20,
  },
  grid: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Avenra.border,
    backgroundColor: Avenra.white,
    padding: 16,
    gap: 16,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardLabel: {
    ...type.bodyLargeMedium,
    color: Avenra.black,
  },
  reviewCard: {
    borderRadius: 16,
    backgroundColor: Avenra.surface,
    borderWidth: 1,
    borderColor: Avenra.white,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    shadowColor: '#262D3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewCopy: {
    flex: 1,
    gap: 4,
  },
  reviewTitle: {
    ...type.bodyLargeBold,
  },
  reviewBody: {
    ...type.bodyMediumMedium,
    color: Avenra.gray500,
  },
  ctaWrap: {
    borderRadius: 18,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cta: {
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ctaLabel: {
    ...type.bodyLargeSemibold,
  },
  pressed: {
    opacity: 0.85,
  },
});
