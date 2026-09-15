import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type Href, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HelpQuestionIcon } from '@/components/avenra/icons';
import { InnerShadow } from '@/components/avenra/inner-shadow';
import { Avenra, type } from '@/constants/avenra';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Soft ambient glows */}
      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowGreen} />
      <View pointerEvents="none" style={styles.glowBlue} />

      <View style={styles.helpRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Help"
          style={({ pressed }) => [styles.helpBtn, pressed && styles.pressed]}>
          <InnerShadow radius={111} tone="light" />
          <HelpQuestionIcon />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.title}>Welcome to Avenra</Text>
          <Text style={styles.subtitle}>
            Access your Avenra account to manage payroll, invoices, and employee data.
          </Text>
        </View>

        <View style={styles.formBlock}>
          <View style={styles.form}>
            <Text style={styles.label}>
              Email address<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrap}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email here"
                placeholderTextColor={Avenra.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
          </View>
          <Pressable accessibilityRole="button">
            <Text style={styles.forgot}>Forgot Password</Text>
          </Pressable>
        </View>

        <View style={styles.ctaBlock}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/home' as Href)}
            style={({ pressed }) => [styles.btnShadow, pressed && styles.pressed]}>
            <LinearGradient
              colors={['#303030', '#13161B']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.continueBtn}>
              <InnerShadow radius={18} tone="dark" />
              <Text style={styles.continueLabel}>Continue</Text>
            </LinearGradient>
          </Pressable>

          <Text style={styles.legal}>
            By continuing, you agree to the{' '}
            <Text style={styles.legalLink}>Terms of Use</Text>
            {' '}and{' '}
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>

      <View style={{ height: Math.max(insets.bottom, 16) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Avenra.white,
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    width: 448,
    height: 215,
    left: '50%',
    marginLeft: -224,
    top: -79,
    borderRadius: 224,
    backgroundColor: Avenra.blue,
    opacity: 0.1,
  },
  glowGreen: {
    position: 'absolute',
    width: 220,
    height: 280,
    left: -90,
    bottom: -40,
    borderRadius: 140,
    backgroundColor: Avenra.green,
    opacity: 0.18,
    transform: [{ rotate: '-48deg' }],
  },
  glowBlue: {
    position: 'absolute',
    width: 280,
    height: 180,
    right: -20,
    bottom: 40,
    borderRadius: 140,
    backgroundColor: Avenra.blue,
    opacity: 0.18,
    transform: [{ rotate: '-37deg' }],
  },
  helpRow: {
    height: 68,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2,
  },
  helpBtn: {
    width: 36,
    height: 36,
    borderRadius: 111,
    backgroundColor: Avenra.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#262D3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    justifyContent: 'center',
    gap: 52,
    zIndex: 3,
  },
  welcome: {
    gap: 4,
    alignSelf: 'stretch',
  },
  title: {
    ...type.h4Semibold,
  },
  subtitle: {
    ...type.bodyLargeMedium,
    alignSelf: 'stretch',
  },
  formBlock: {
    gap: 8,
    alignSelf: 'stretch',
  },
  form: {
    gap: 8,
    alignSelf: 'stretch',
  },
  label: {
    ...type.labelMedium,
  },
  required: {
    color: Avenra.red,
  },
  inputWrap: {
    height: 49,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Avenra.inputBorder,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: Avenra.white,
  },
  input: {
    ...type.bodyMediumRegular,
    color: Avenra.black,
    padding: 0,
    margin: 0,
  },
  forgot: {
    ...type.labelMedium,
    color: Avenra.blue,
  },
  ctaBlock: {
    gap: 24,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  btnShadow: {
    alignSelf: 'stretch',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  continueBtn: {
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  continueLabel: {
    ...type.bodyLargeSemibold,
  },
  legal: {
    ...type.labelMedium,
    textAlign: 'center',
    maxWidth: 264,
  },
  legalLink: {
    ...type.bodyMediumSemibold,
    color: Avenra.black,
  },
  pressed: {
    opacity: 0.85,
  },
});
