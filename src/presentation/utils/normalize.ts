import { Dimensions, PixelRatio, Platform } from 'react-native';

const TARGET_SCREEN_WIDTH = 390;
const TABLET_BREAKPOINT = 768;

const getScreenWidth = (): number => {
  const windowSize = Dimensions.get('window');

  return Math.min(windowSize.width, windowSize.height);
};

const isTablet = (): boolean => {
  if (Platform.OS === 'ios') {
    return Platform.isPad;
  }

  return getScreenWidth() >= TABLET_BREAKPOINT;
};

const scaleFactor = (): number => {
  return Math.min(1, getScreenWidth() / TARGET_SCREEN_WIDTH);
};

export const normalize = (size: number): number => {
  if (isTablet()) {
    return size;
  }

  const scaledSize = size * scaleFactor();

  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};
