import { ScrollView, View } from 'react-native';

import { UiBadge } from '@/presentation/components/ui/badge';
import { UiButton } from '@/presentation/components/ui/button';
import { UiCard } from '@/presentation/components/ui/card';
import { UiInput } from '@/presentation/components/ui/input';
import { UiPressableCard } from '@/presentation/components/ui/pressable-card';
import { UiStateCard } from '@/presentation/components/ui/state-card';
import { UiText } from '@/presentation/components/ui/text';
import { UiTitle } from '@/presentation/components/ui/title';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createDesignSystemShowcaseStyles } from './styles';

const noop = () => undefined;

export const DesignSystemShowcase = () => {
  const theme = useTheme();
  const styles = createDesignSystemShowcaseStyles(theme);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.container}
      testID="design-system-showcase"
    >
      <View style={styles.hero}>
        <UiText tone="accent" variant="eyebrow">
          UI primitives
        </UiText>
        <UiTitle>Design system showcase</UiTitle>
        <UiText tone="muted">
          A lightweight catalog to iterate quickly on typography, buttons and
          surfaces before we refactor further.
        </UiText>
      </View>

      <UiCard>
        <View style={styles.sectionHeader}>
          <UiTitle level={3}>Titles</UiTitle>
          <UiText tone="muted" variant="caption">
            Three hierarchy levels aligned with the current theme.
          </UiText>
        </View>
        <View style={styles.stackSm}>
          <UiTitle level={1}>Level 1 title</UiTitle>
          <UiTitle level={2}>Level 2 title</UiTitle>
          <UiTitle level={3}>Level 3 title</UiTitle>
        </View>
      </UiCard>

      <UiCard tone="muted">
        <View style={styles.sectionHeader}>
          <UiTitle level={3}>Text</UiTitle>
          <UiText tone="muted" variant="caption">
            Default variants and tones for product copy.
          </UiText>
        </View>
        <View style={styles.stackSm}>
          <UiText variant="eyebrow">Eyebrow text</UiText>
          <UiText>
            Body text helps structure content while staying readable inside
            cards, screens and overlays.
          </UiText>
          <UiText tone="muted">
            Muted text can support secondary information or descriptions.
          </UiText>
          <UiText tone="accent" variant="caption" weight="semibold">
            Accent caption for highlights
          </UiText>
        </View>
      </UiCard>

      <UiCard>
        <View style={styles.sectionHeader}>
          <UiTitle level={3}>Buttons</UiTitle>
          <UiText tone="muted" variant="caption">
            Primary, secondary and ghost actions with loading and full-width
            states.
          </UiText>
        </View>
        <View style={styles.buttonGroup}>
          <UiButton label="Primary action" onPress={noop} />
          <UiButton
            label="Secondary action"
            onPress={noop}
            variant="secondary"
          />
          <UiButton label="Ghost action" onPress={noop} variant="ghost" />
          <UiButton isLoading label="Loading action" onPress={noop} />
          <UiButton
            fullWidth
            label="Full width action"
            onPress={noop}
            size="lg"
          />
        </View>
      </UiCard>

      <UiCard>
        <View style={styles.sectionHeader}>
          <UiTitle level={3}>Inputs</UiTitle>
          <UiText tone="muted" variant="caption">
            Shared input chrome for search and future forms.
          </UiText>
        </View>
        <View style={styles.inputGroup}>
          <UiInput onChangeText={noop} placeholder="Type here" value="" />
          <UiInput
            isLoading
            onChangeText={noop}
            placeholder="Loading input"
            value=""
          />
        </View>
      </UiCard>

      <UiCard tone="muted">
        <View style={styles.sectionHeader}>
          <UiTitle level={3}>Badges</UiTitle>
          <UiText tone="muted" variant="caption">
            Lightweight status markers with solid and soft variants.
          </UiText>
        </View>
        <View style={styles.badgeRow}>
          <UiBadge label="Neutral" />
          <UiBadge label="Accent" tone="accent" />
          <UiBadge label="Done" showDot tone="success" variant="solid" />
          <UiBadge label="In progress" showDot tone="warning" variant="solid" />
        </View>
      </UiCard>

      <UiCard>
        <View style={styles.sectionHeader}>
          <UiTitle level={3}>State Cards</UiTitle>
          <UiText tone="muted" variant="caption">
            Useful for loading, empty and error screens.
          </UiText>
        </View>
        <UiStateCard
          action={<UiButton fullWidth label="Retry action" onPress={noop} />}
          message="A single component now covers centered product states with shared spacing and typography."
          subtitle="Subtitle text for more context"
          title="Centered state"
        />
      </UiCard>

      <UiCard tone="accent">
        <View style={styles.sectionHeader}>
          <UiText tone="accent" variant="eyebrow">
            Surfaces
          </UiText>
          <UiTitle level={3}>Cards help frame content</UiTitle>
        </View>
        <UiText>
          Cards and pressable cards now share the same visual language, so
          redesigning a surface should propagate much more consistently.
        </UiText>
        <UiPressableCard style={styles.surfacePreview}>
          <UiTitle isHeader={false} level={3}>
            Pressable card
          </UiTitle>
          <UiText tone="muted" variant="caption">
            Reused by interactive recipe blocks and future tappable surfaces.
          </UiText>
        </UiPressableCard>
      </UiCard>
    </ScrollView>
  );
};
