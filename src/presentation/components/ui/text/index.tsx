import type { ReactNode } from 'react';
import { Text as NativeText, type TextProps } from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

export type UiTextVariant = 'body' | 'caption' | 'eyebrow';
export type UiTextTone = 'default' | 'muted' | 'accent' | 'inverse';
export type UiTextAlign = 'left' | 'center' | 'right';
export type UiTextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type UiTextProps = TextProps & {
  align?: UiTextAlign;
  children: ReactNode;
  tone?: UiTextTone;
  variant?: UiTextVariant;
  weight?: UiTextWeight;
};

export const UiText = ({
  align = 'left',
  children,
  style,
  tone = 'default',
  variant = 'body',
  weight,
  ...props
}: UiTextProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <NativeText
      {...props}
      style={[
        styles.base,
        styles[variant],
        styles[align],
        styles[tone],
        weight === undefined ? null : styles[weight],
        style,
      ]}
    >
      {children}
    </NativeText>
  );
};
