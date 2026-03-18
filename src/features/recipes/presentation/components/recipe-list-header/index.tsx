import { View } from 'react-native';

import { SearchInput } from '@/presentation/components/form/search-input';
import { UiTitle } from '@/presentation/components/ui/title';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

type RecipeListHeaderProps = {
  isSearchLoading: boolean;
  onSearchQueryChange: (value: string) => void;
  searchQuery: string;
};

export const RecipeListHeader = ({
  isSearchLoading,
  onSearchQueryChange,
  searchQuery,
}: RecipeListHeaderProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <UiTitle align="center">{t('app.name')}</UiTitle>
      <SearchInput
        accessibilityLabel={t('recipes.search.accessibilityLabel')}
        isLoading={isSearchLoading}
        onChangeText={onSearchQueryChange}
        placeholder={t('recipes.search.placeholder')}
        testID="recipes-search-input"
        value={searchQuery}
      />
    </View>
  );
};
