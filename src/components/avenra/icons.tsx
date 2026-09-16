import { useId } from 'react';
import { View } from 'react-native';
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  SvgXml,
} from 'react-native-svg';

import { ICON_XML, type IconAssetName } from './icon-assets';

type IconProps = {
  size?: number;
  color?: string;
};

function tintXml(xml: string, color: string, uid: string) {
  return xml
    .replace(/fill="#0D0D12"/gi, `fill="${color}"`)
    .replace(/fill='#0D0D12'/gi, `fill='${color}'`)
    .replace(/stroke="#0D0D12"/gi, `stroke="${color}"`)
    .replace(/stroke='#0D0D12'/gi, `stroke='${color}'`)
    .replace(/fill="#666D80"/gi, `fill="${color}"`)
    .replace(/stroke="#666D80"/gi, `stroke="${color}"`)
    .replace(/clip0_[a-zA-Z0-9_]+/g, `clip0_${uid}`);
}

export function AssetIcon({
  name,
  size = 16,
  color = '#0D0D12',
}: {
  name: IconAssetName;
  size?: number;
  color?: string;
}) {
  const uid = useId().replace(/:/g, '');
  return <SvgXml xml={tintXml(ICON_XML[name], color, uid)} width={size} height={size} />;
}

export function HelpQuestionIcon({ size = 16, color = '#666D80' }: IconProps) {
  return <AssetIcon name="Help_Question_1" size={size} color={color} />;
}

/** Brand mark — not in assets/icons; kept as vector to match logo. */
export function SnowflakeIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M7 1.2v11.6M2.9 3.4l8.2 7.2M11.1 3.4l-8.2 7.2M1.2 7h11.6"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Path
        d="M5.2 2.4 7 1.2l1.8 1.2M5.2 11.6 7 12.8l1.8-1.2M2.2 5.1l.7-1.7 1.8.2M9.3 10.4l1.8.2.7-1.7M11.8 5.1l-.7-1.7-1.8.2M4.7 10.4l-1.8.2-.7-1.7"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function UserCircleIcon({ size = 16, color = '#666D80' }: IconProps) {
  return <AssetIcon name="User_Circle_Single" size={size} color={color} />;
}

export function PadlockIcon({ size = 14, color = '#29B372' }: IconProps) {
  return <AssetIcon name="Padlock_Square_1" size={size} color={color} />;
}

export function ReceiptIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Receipt" size={size} color={color} />;
}

export function CalendarAddIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Calendar_Add" size={size} color={color} />;
}

export function AlarmClockIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="alarm_clock" size={size} color={color} />;
}

export function CheckSquareIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Shield_Check" size={size} color={color} />;
}

export function BrightnessIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Flash_1" size={size} color={color} />;
}

export function BagIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Bag_Suitcase_2" size={size} color={color} />;
}

export function HandHeldIcon({ size = 13, color = '#0D0D12' }: IconProps) {
  return <AssetIcon name="Hand_Held" size={size} color={color} />;
}

export function ArrowCircleDownIcon({ size = 13, color = '#0D0D12' }: IconProps) {
  return <AssetIcon name="chevron_down" size={size} color={color} />;
}

export function MenuDotsIcon({ size = 14, color = '#808898' }: IconProps) {
  return <AssetIcon name="Horizontal_Menu_Circle" size={size} color={color} />;
}

export function HomeNavIcon({ size = 18, color = '#0D0D12' }: IconProps) {
  return <AssetIcon name="home_04" size={size} color={color} />;
}

export function BlankCalendarIcon({ size = 18, color = '#A3ACB9' }: IconProps) {
  return <AssetIcon name="Blank_Calendar" size={size} color={color} />;
}

export function CircleClockIcon({ size = 18, color = '#A3ACB9' }: IconProps) {
  return <AssetIcon name="Circle_Clock" size={size} color={color} />;
}

export function ApplicationAddIcon({ size = 18, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Application_Add" size={size} color={color} />;
}

export function InfoCircleIcon({ size = 14, color = '#A3ACB9' }: IconProps) {
  return <AssetIcon name="Information_Circle" size={size} color={color} />;
}

export function PlusCircleIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Add_Circle" size={size} color={color} />;
}

export function ArrowLeftIcon({ size = 16, color = '#666D80' }: IconProps) {
  return <AssetIcon name="arrow_narrow_left" size={size} color={color} />;
}

export function ChevronIcon({
  size = 14,
  color = '#0D0D12',
  direction = 'left',
}: IconProps & { direction?: 'left' | 'right' }) {
  const rotation = direction === 'left' ? '90deg' : '-90deg';
  return (
    <View style={{ transform: [{ rotate: rotation }] }}>
      <AssetIcon name="chevron_down" size={size} color={color} />
    </View>
  );
}

export function NewFileIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="New_File" size={size} color={color} />;
}

export function ChatBubblesIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Chat_Two_Bubbles_Oval" size={size} color={color} />;
}

export function LightbulbIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Lightbulb" size={size} color={color} />;
}

export function UsersGroupIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="User_Multiple_Group" size={size} color={color} />;
}

export function CogIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return <AssetIcon name="Cog" size={size} color={color} />;
}

export function MapPinIcon({ size = 14, color = '#808898' }: IconProps) {
  return <AssetIcon name="Location_Pin_3" size={size} color={color} />;
}

export function VideoCamIcon({ size = 14, color = '#808898' }: IconProps) {
  return <AssetIcon name="Webcam_Video" size={size} color={color} />;
}

export function ChevronSelectorVerticalIcon({ size = 16, color = '#666D80' }: IconProps) {
  return <AssetIcon name="Arrow_Reload_Vertical_1" size={size} color={color} />;
}

export function PencilIcon({ size = 10, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path
        d="M1.5 7.8 7.2 2.1a.8.8 0 0 1 1.1 0l.5.5a.8.8 0 0 1 0 1.1L3.1 8.7 1.2 9.1l.3-1.3Z"
        stroke={color}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BellIcon({ size = 16, color = '#808898' }: IconProps) {
  return <AssetIcon name="Ringing_Bell_Notification" size={size} color={color} />;
}

export function FaceIdIcon({ size = 16, color = '#808898' }: IconProps) {
  return <AssetIcon name="User_Profile_Focus" size={size} color={color} />;
}

export function MoonIcon({ size = 16, color = '#808898' }: IconProps) {
  return <AssetIcon name="Waning_Cresent_Moon" size={size} color={color} />;
}

export function MoveLeftIcon({ size = 16, color = '#808898' }: IconProps) {
  return <AssetIcon name="Move_Left" size={size} color={color} />;
}

export function ChevronRightIcon({ size = 14, color = '#808898' }: IconProps) {
  return (
    <View style={{ transform: [{ rotate: '-90deg' }] }}>
      <AssetIcon name="chevron_down" size={size} color={color} />
    </View>
  );
}

/** Decorative folder+doc illustration from the home status card. */
export function FolderDocIcon({ size = 35 }: { size?: number }) {
  return (
    <Svg width={size} height={32} viewBox="0 0 35 32" fill="none">
      <Defs>
        <LinearGradient id="folderGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="rgba(20,27,52,0.18)" />
          <Stop offset="100%" stopColor="rgba(133,139,160,0.18)" />
        </LinearGradient>
        <LinearGradient id="dollarGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="29%" stopColor="#3A5EFF" />
          <Stop offset="100%" stopColor="#8198FE" />
        </LinearGradient>
      </Defs>
      <Path
        d="M2 10.5C2 8.5 3.5 7 5.5 7h7.2l2.2 2.4H29.5c2 0 3.5 1.5 3.5 3.5v12c0 2-1.5 3.5-3.5 3.5H5.5C3.5 28.4 2 26.9 2 24.9v-14.4Z"
        fill="url(#folderGrad)"
        stroke="#C1C7D0"
        strokeWidth={0.4}
      />
      <Rect x={2} y={12} width={31} height={14.5} rx={3} fill="#F5F6F8" stroke="#C1C7D0" strokeWidth={0.3} />
      <G>
        <Rect x={11.5} y={2} width={12} height={20} rx={1.5} fill="#FDFDFD" stroke="#E3E3E3" strokeWidth={0.4} />
        <Path d="M19.5 2l4 4H20a.5.5 0 0 1-.5-.5V2Z" fill="#F0F2F5" stroke="#E3E3E3" strokeWidth={0.3} />
        <Path
          d="M17.5 10.2v7.2M15.2 12.1c.4-.7 1-.9 1.7-.9 1 0 1.7.5 1.7 1.35 0 .7-.4 1.1-1.15 1.4-.7.3-.95.55-.95 1.05M15.2 16.8c.4.7 1 .95 1.8.95 1.1 0 1.85-.55 1.85-1.5"
          stroke="url(#dollarGrad)"
          strokeWidth={1.15}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

/** Decorative review folder illustration on the More screen. */
export function ReviewStarFolderIcon({ size = 35 }: { size?: number }) {
  return (
    <Svg width={size} height={32} viewBox="0 0 35 32" fill="none">
      <Defs>
        <LinearGradient id="reviewFolder" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="rgba(20,27,52,0.18)" />
          <Stop offset="100%" stopColor="rgba(133,139,160,0.18)" />
        </LinearGradient>
        <LinearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="29%" stopColor="#3A5EFF" />
          <Stop offset="100%" stopColor="#8198FE" />
        </LinearGradient>
      </Defs>
      <Path
        d="M2 10.5C2 8.5 3.5 7 5.5 7h7.2l2.2 2.4H29.5c2 0 3.5 1.5 3.5 3.5v12c0 2-1.5 3.5-3.5 3.5H5.5C3.5 28.4 2 26.9 2 24.9v-14.4Z"
        fill="url(#reviewFolder)"
        stroke="#A9A9A9"
        strokeWidth={0.4}
      />
      <Rect x={2} y={12} width={31} height={14.5} rx={3} fill="#F5F6F8" stroke="#A9A9A9" strokeWidth={0.3} />
      <Rect x={11.5} y={2} width={12} height={20} rx={1.5} fill="#FDFDFD" stroke="#E3E3E3" strokeWidth={0.4} />
      <Path
        d="M17.5 8.2l1.1 2.2 2.4.3-1.7 1.7.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.7-1.7 2.4-.3 1.1-2.2Z"
        fill="url(#starGrad)"
      />
    </Svg>
  );
}
