import { View } from 'react-native';

import { UiInput } from '@/presentation/components/ui/input';
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

  return (
    <UiInput
      accessibilityLabel={accessibilityLabel}
      autoCapitalize="none"
      autoCorrect={false}
      clearButtonMode="while-editing"
      disableWhileLoading={false}
      isLoading={isLoading}
      leadingSlot={
        <View pointerEvents="none" style={styles.iconContainer}>
          <View style={styles.iconLens} />
          <View style={styles.iconHandle} />
        </View>
      }
      onChangeText={onChangeText}
      placeholder={placeholder}
      returnKeyType="search"
      testID={testID}
      value={value}
    />
  );
};
