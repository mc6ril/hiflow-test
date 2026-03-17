import { UiButton } from '@/presentation/components/ui/button';
import { UiScreen } from '@/presentation/components/ui/screen';
import { UiStateCard } from '@/presentation/components/ui/state-card';
import { useI18n } from '@/presentation/hooks/useI18n';

type StartupFallbackPageProps = {
  message: string;
  onRetry: () => void;
};

export const StartupFallbackPage = ({
  message,
  onRetry,
}: StartupFallbackPageProps) => {
  const { t } = useI18n();

  return (
    <UiScreen centered padded>
      <UiStateCard
        action={
          <UiButton fullWidth label={t('common.retry')} onPress={onRetry} />
        }
        message={message}
        subtitle={t('startup.errorSubtitle')}
        title={t('startup.errorTitle')}
      />
    </UiScreen>
  );
};
