import { Platform, TextStyle } from 'react-native';

export const Avenra = {
  black: '#0D0D12',
  white: '#FFFFFF',
  blue: '#3A5EFF',
  blueSoft: '#8198FE',
  green: '#29B372',
  red: '#ED6363',
  pink: '#E665CC',
  purple: '#7C3FEE',
  purpleBorder: '#A676FF',
  orangeRed: '#E50914',
  orangeBorder: '#FD7279',
  gray500: '#808898',
  gray400: '#A3ACB9',
  gray600: '#666D80',
  border: '#EBEFF3',
  borderDashed: '#DFE1E6',
  inputBorder: '#EBEFF3',
  placeholder: '#A3ACB9',
  surface: '#FAFAFA',
  profileBg: '#F6F8FA',
  progressTrack: '#ECEFF3',
  navInactive: '#A3ACB9',
  amber: '#F5A623',
} as const;

/** SF Pro Rounded on iOS; closest system stack elsewhere. */
export const fontRounded = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
  web: 'SF Pro Rounded, ui-rounded, system-ui, sans-serif',
}) as string;

export const type = {
  h2Bold: {
    fontFamily: fontRounded,
    fontWeight: '700' as TextStyle['fontWeight'],
    fontSize: 28,
    lineHeight: 35,
    color: Avenra.black,
  },
  h4Semibold: {
    fontFamily: fontRounded,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 20,
    lineHeight: 25,
    color: Avenra.black,
  },
  bodyLargeBold: {
    fontFamily: fontRounded,
    fontWeight: '700' as TextStyle['fontWeight'],
    fontSize: 16,
    lineHeight: 20,
    color: Avenra.black,
  },
  bodyLargeSemibold: {
    fontFamily: fontRounded,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 16,
    lineHeight: 20,
    color: Avenra.white,
  },
  bodyLargeMedium: {
    fontFamily: fontRounded,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 16,
    lineHeight: 20,
    color: Avenra.gray500,
  },
  bodyMediumSemibold: {
    fontFamily: fontRounded,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 14,
    lineHeight: 17,
    color: Avenra.black,
  },
  bodyMediumMedium: {
    fontFamily: fontRounded,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 14,
    lineHeight: 17,
    color: Avenra.gray400,
  },
  bodyMediumRegular: {
    fontFamily: fontRounded,
    fontWeight: '400' as TextStyle['fontWeight'],
    fontSize: 14,
    lineHeight: 17,
    color: Avenra.placeholder,
  },
  labelMedium: {
    fontFamily: fontRounded,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 14,
    lineHeight: 17,
    color: Avenra.gray500,
  },
  bodySmallMedium: {
    fontFamily: fontRounded,
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 12,
    lineHeight: 15,
    color: Avenra.gray500,
  },
} as const;
