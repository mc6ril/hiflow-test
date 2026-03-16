import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createBootstrapCardStyles } from './styles';

type BootstrapCardProps = {
  eyebrow: string;
  imageSource: number;
  subtitle: string;
  title: string;
};

export function BootstrapCard({
  eyebrow,
  imageSource,
  subtitle,
  title,
}: BootstrapCardProps) {
  const theme = useTheme();
  const styles = createBootstrapCardStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image contentFit="contain" source={imageSource} style={styles.logo} />
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}
