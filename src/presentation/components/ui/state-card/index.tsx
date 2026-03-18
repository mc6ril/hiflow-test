import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { UiCard, type UiCardTone } from '@/presentation/components/ui/card';
import { UiText } from '@/presentation/components/ui/text';
import { UiTitle } from '@/presentation/components/ui/title';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

type UiStateCardProps = {
  action?: ReactNode;
  align?: 'left' | 'center';
  children?: ReactNode;
  message?: string;
  style?: StyleProp<ViewStyle>;
  subtitle?: string;
  title: string;
  titleLevel?: 1 | 2 | 3;
  tone?: UiCardTone;
  topSlot?: ReactNode;
};

export const UiStateCard = ({
  action,
  align = 'center',
  children,
  message,
  style,
  subtitle,
  title,
  titleLevel = 1,
  tone = 'default',
  topSlot,
}: UiStateCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <UiCard
      style={[
        styles.card,
        align === 'center' ? styles.alignCenter : null,
        style,
      ]}
      tone={tone}
    >
      {topSlot === undefined ? null : (
        <View style={styles.topSlot}>{topSlot}</View>
      )}
      <View style={styles.content}>
        <UiTitle align={align} level={titleLevel}>
          {title}
        </UiTitle>
        {subtitle === undefined ? null : (
          <UiText align={align} tone="muted">
            {subtitle}
          </UiText>
        )}
        {message === undefined ? null : (
          <UiText align={align}>{message}</UiText>
        )}
      </View>
      {children}
      {action === undefined ? null : (
        <View style={styles.action}>{action}</View>
      )}
    </UiCard>
  );
};
