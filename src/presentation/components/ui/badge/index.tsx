import { View, type ViewProps } from 'react-native';

import { UiText } from '@/presentation/components/ui/text';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

export type UiBadgeTone = 'neutral' | 'accent' | 'success' | 'warning';
export type UiBadgeVariant = 'soft' | 'solid';

type UiBadgeProps = ViewProps & {
  label: string;
  showDot?: boolean;
  tone?: UiBadgeTone;
  variant?: UiBadgeVariant;
};

export const UiBadge = ({
  label,
  showDot = false,
  style,
  tone = 'neutral',
  variant = 'soft',
  ...props
}: UiBadgeProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const appearanceByVariant = {
    soft: {
      neutral: styles.softNeutral,
      accent: styles.softAccent,
      success: styles.softSuccess,
      warning: styles.softWarning,
    },
    solid: {
      neutral: styles.solidNeutral,
      accent: styles.solidAccent,
      success: styles.solidSuccess,
      warning: styles.solidWarning,
    },
  } as const;
  const textTone =
    variant === 'solid' ? 'inverse' : tone === 'neutral' ? 'muted' : 'accent';

  return (
    <View
      {...props}
      style={[styles.base, appearanceByVariant[variant][tone], style]}
    >
      {showDot ? (
        <View
          style={[
            styles.dot,
            variant === 'solid' ? styles.dotInverse : styles.dotAccent,
          ]}
        />
      ) : null}
      <UiText tone={textTone} variant="caption" weight="bold">
        {label}
      </UiText>
    </View>
  );
};
