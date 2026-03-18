import type { ReactNode } from 'react';
import { Text as NativeText, type TextProps } from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

type UiTitleTone = 'default' | 'muted' | 'accent' | 'inverse';
type UiTitleAlign = 'left' | 'center' | 'right';
type UiTitleLevel = 1 | 2 | 3;

type UiTitleProps = TextProps & {
  align?: UiTitleAlign;
  children: ReactNode;
  isHeader?: boolean;
  level?: UiTitleLevel;
  tone?: UiTitleTone;
};

export const UiTitle = ({
  align = 'left',
  children,
  isHeader = true,
  level = 1,
  style,
  tone = 'default',
  ...props
}: UiTitleProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <NativeText
      accessibilityRole={isHeader ? 'header' : undefined}
      {...props}
      style={[
        styles.base,
        level === 1
          ? styles.level1
          : level === 2
            ? styles.level2
            : styles.level3,
        styles[align],
        styles[tone],
        style,
      ]}
    >
      {children}
    </NativeText>
  );
};
