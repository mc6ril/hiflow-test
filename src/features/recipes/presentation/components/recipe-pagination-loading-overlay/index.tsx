import { memo } from 'react';
import { View } from 'react-native';

import { UiCard } from '@/presentation/components/ui/card';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

export const RecipePaginationLoadingOverlay = memo(() => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={t('recipes.paginationLoading')}
      accessible
      pointerEvents="none"
      style={styles.container}
    >
      {[0, 1].map((itemIndex) => (
        <UiCard
          key={`pagination-skeleton-${itemIndex}`}
          padded={false}
          radius="md"
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <View
              style={[
                styles.skeletonBlock,
                styles.skeletonThumbnail,
                {
                  backgroundColor: theme.colors.surfaceMuted,
                },
              ]}
            />
            <View style={styles.skeletonTextColumn}>
              <View
                style={[
                  styles.skeletonBlock,
                  styles.skeletonTitle,
                  {
                    backgroundColor: theme.colors.surfaceMuted,
                  },
                ]}
              />
              <View
                style={[
                  styles.skeletonBlock,
                  styles.skeletonLine,
                  {
                    backgroundColor: theme.colors.surfaceMuted,
                  },
                ]}
              />
              <View
                style={[
                  styles.skeletonBlock,
                  styles.skeletonLine,
                  styles.skeletonLineShort,
                  {
                    backgroundColor: theme.colors.surfaceMuted,
                  },
                ]}
              />
            </View>
          </View>
        </UiCard>
      ))}
    </View>
  );
});

RecipePaginationLoadingOverlay.displayName = 'RecipePaginationLoadingOverlay';
