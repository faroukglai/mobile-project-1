import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../components/avenra/bottom-nav';
import { BrandHeader } from '../components/avenra/brand-header';
import { DashedLine } from '../components/avenra/dashed-line';
import {
  BellIcon,
  ChatBubblesIcon,
  ChevronRightIcon,
  ChevronSelectorVerticalIcon,
  FaceIdIcon,
  HelpQuestionIcon,
  LightbulbIcon,
  MoonIcon,
  MoveLeftIcon,
  PadlockIcon,
  PencilIcon,
} from '../components/avenra/icons';
import { InnerShadow } from '../components/avenra/inner-shadow';
import { Avenra, type } from '../constants/avenra';

type RowControl = { kind: 'toggle'; value: boolean; onChange: (v: boolean) => void } | { kind: 'chevron' };

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      style={[styles.toggle, value ? styles.toggleOn : styles.toggleOff]}>
      <InnerShadow radius={100} tone={value ? 'dark' : 'light'} />
      <View style={[styles.toggleKnob, value ? styles.toggleKnobOn : styles.toggleKnobOff]} />
    </Pressable>
  );
}

function SettingsRow({
  label,
  Icon,
  control,
  showBorder,
  iconColor = Avenra.gray500,
}: {
  label: string;
  Icon: typeof BellIcon;
  control: RowControl;
  showBorder?: boolean;
  iconColor?: string;
}) {
  return (
    <View>
      {showBorder ? <DashedLine color={Avenra.border} /> : null}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <View style={styles.rowIcon}>
            <InnerShadow radius={8} tone="light" />
            <Icon size={16} color={iconColor} />
          </View>
          <Text style={styles.rowLabel}>{label}</Text>
        </View>
        {control.kind === 'toggle' ? (
          <Toggle value={control.value} onChange={control.onChange} />
        ) : (
          <ChevronRightIcon />
        )}
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [pushOn, setPushOn] = useState(true);
  const [faceIdOn, setFaceIdOn] = useState(false);
  const [leftHandedOn, setLeftHandedOn] = useState(false);

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
              accessibilityLabel="Switch account"
              style={({ pressed }) => [styles.switchBtn, pressed && styles.pressed]}>
              <InnerShadow radius={111} tone="light" />
              <ChevronSelectorVerticalIcon />
            </Pressable>
          }>
          <View style={styles.profileBlock}>
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces',
                }}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.editBadge}>
                <InnerShadow radius={12} tone="dark" />
                <PencilIcon />
              </View>
            </View>
            <Text style={styles.name}>Sam Lee</Text>
            <Text style={styles.email}>sam.lee@avenra.com</Text>
          </View>
        </BrandHeader>

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>App settings</Text>
          </View>

          <SettingsRow
            label="Push notifications"
            Icon={BellIcon}
            control={{ kind: 'toggle', value: pushOn, onChange: setPushOn }}
          />
          <SettingsRow
            label="Face ID unlock"
            Icon={FaceIdIcon}
            showBorder
            control={{ kind: 'toggle', value: faceIdOn, onChange: setFaceIdOn }}
          />
          <SettingsRow
            label="App passcode"
            Icon={PadlockIcon}
            iconColor={Avenra.gray500}
            showBorder
            control={{ kind: 'chevron' }}
          />
          <SettingsRow
            label="App appearance"
            Icon={MoonIcon}
            showBorder
            control={{ kind: 'chevron' }}
          />
          <SettingsRow
            label="Left-handed mode"
            Icon={MoveLeftIcon}
            showBorder
            control={{ kind: 'toggle', value: leftHandedOn, onChange: setLeftHandedOn }}
          />

          <View style={[styles.sectionHeader, styles.sectionHeaderSpaced]}>
            <Text style={styles.sectionTitle}>Supoort</Text>
          </View>

          <SettingsRow label="Support chat" Icon={ChatBubblesIcon} control={{ kind: 'chevron' }} />
          <SettingsRow
            label="Give app feedback"
            Icon={LightbulbIcon}
            showBorder
            control={{ kind: 'chevron' }}
          />
          <SettingsRow
            label="Help center"
            Icon={HelpQuestionIcon}
            iconColor={Avenra.gray500}
            showBorder
            control={{ kind: 'chevron' }}
          />
        </View>
      </ScrollView>

      <BottomNav active="profile" />
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
  switchBtn: {
    width: 36,
    height: 36,
    borderRadius: 111,
    backgroundColor: Avenra.profileBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileBlock: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 4,
  },
  avatarWrap: {
    width: 76,
    height: 76,
    marginBottom: 10,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: Avenra.progressTrack,
  },
  editBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Avenra.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Avenra.white,
    overflow: 'hidden',
  },
  name: {
    ...type.bodyLargeSemibold,
    color: Avenra.black,
    textAlign: 'center',
  },
  email: {
    ...type.bodyMediumMedium,
    color: Avenra.gray400,
    textAlign: 'center',
  },
  bottomSheet: {
    backgroundColor: Avenra.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 6,
    minHeight: 520,
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
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  sectionHeaderSpaced: {
    marginTop: 8,
  },
  sectionTitle: {
    ...type.bodyLargeBold,
  },
  row: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Avenra.profileBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rowLabel: {
    ...type.bodyMediumSemibold,
    flex: 1,
  },
  toggle: {
    width: 36,
    height: 20,
    borderRadius: 100,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  toggleOn: {
    backgroundColor: Avenra.blue,
  },
  toggleOff: {
    backgroundColor: Avenra.progressTrack,
  },
  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: Avenra.white,
    shadowColor: '#272727',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleKnobOn: {
    alignSelf: 'flex-end',
    marginRight: 2,
  },
  toggleKnobOff: {
    alignSelf: 'flex-start',
    marginLeft: 2,
  },
  pressed: {
    opacity: 0.85,
  },
});
