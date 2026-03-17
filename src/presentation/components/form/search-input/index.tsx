import { useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createSearchInputStyles } from './styles';

type SearchInputProps = {
  accessibilityLabel: string;
  isLoading?: boolean;
  onChangeText: (value: string) => void;
  placeholder: string;
  testID?: string;
  value: string;
};

export const SearchInput = ({
  accessibilityLabel,
  isLoading = false,
  onChangeText,
  placeholder,
  testID,
  value,
}: SearchInputProps) => {
  const theme = useTheme();
  const styles = createSearchInputStyles(theme);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[styles.container, isFocused ? styles.containerFocused : null]}
    >
      <View pointerEvents="none" style={styles.iconContainer}>
        <View style={styles.iconLens} />
        <View style={styles.iconHandle} />
      </View>
      <TextInput
        accessibilityLabel={accessibilityLabel}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        onBlur={() => {
          setIsFocused(false);
        }}
        onChangeText={onChangeText}
        onFocus={() => {
          setIsFocused(true);
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType="search"
        selectionColor={theme.colors.accent}
        style={styles.input}
        testID={testID}
        value={value}
      />
      {isLoading ? (
        <ActivityIndicator color={theme.colors.accent} size="small" />
      ) : null}
    </View>
  );
};
