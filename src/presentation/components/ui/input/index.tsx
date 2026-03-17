import { useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createUiInputStyles } from './styles';

type UiInputProps = Omit<TextInputProps, 'style'> & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
};

export const UiInput = ({
  containerStyle,
  editable = true,
  inputStyle,
  isLoading = false,
  leadingSlot,
  onBlur,
  onFocus,
  placeholderTextColor,
  selectionColor,
  trailingSlot,
  ...props
}: UiInputProps) => {
  const theme = useTheme();
  const styles = createUiInputStyles(theme);
  const [isFocused, setIsFocused] = useState(false);
  const isEditable = editable && !isLoading;

  return (
    <View
      style={[
        styles.container,
        isFocused ? styles.containerFocused : null,
        isEditable ? null : styles.containerDisabled,
        containerStyle,
      ]}
    >
      {leadingSlot === undefined ? null : (
        <View style={styles.slot}>{leadingSlot}</View>
      )}
      <TextInput
        {...props}
        editable={isEditable}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholderTextColor={placeholderTextColor ?? theme.colors.textMuted}
        selectionColor={selectionColor ?? theme.colors.accent}
        style={[styles.input, inputStyle]}
      />
      {isLoading ? (
        <ActivityIndicator color={theme.colors.accent} size="small" />
      ) : trailingSlot === undefined ? null : (
        <View style={styles.slot}>{trailingSlot}</View>
      )}
    </View>
  );
};
