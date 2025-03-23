import { Dimensions, View } from 'react-native';
import { useGesture } from '~/contexts/GestureContext';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get('screen');
const maxTranslateX = width / 2 - 50;
const maxTranslateY = height / 2 - 50;

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Home() {
  const {
    score,
    setScore,
    setTapCount,
    setDoubleTapCount,
    setIsDragged,
    setIsSwipedLeft,
    setIsSwipedRight,
    setIsLongPressed,
    setIsSizeChanged,
  } = useGesture();

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      setTapCount((prev) => prev + 1);
      setScore((prev) => prev + 1);
    })
    .runOnJS(true);

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      setDoubleTapCount((prev) => prev + 1);
      setScore((prev) => prev + 2);
    })
    .runOnJS(true);

  const longPressGesture = Gesture.LongPress()
    .minDuration(3000)
    .onEnd(() => {
      setIsLongPressed(true);
      setScore((prev) => prev + 5);
    })
    .runOnJS(true);

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .onEnd(() => {
      setIsDragged(true);
      setScore((prev) => prev + 3);
    })
    .runOnJS(true);

  const swipeRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      translationX.value = withTiming(maxTranslateX);
      setIsSwipedRight(true);
      setScore((prev) => prev + randomInteger(1, 10));
    })
    .runOnJS(true);

  const swipeLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      translationX.value = withTiming(-maxTranslateX);
      setIsSwipedLeft(true);
      setScore((prev) => prev + randomInteger(1, 10));
    })
    .runOnJS(true);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
      setIsSizeChanged(true);
    })
    .onUpdate((event) => {
      scale.value = clamp(startScale.value * event.scale, 0.5, Math.min(width / 100, height / 100));
    })
    .runOnJS(true);

  const gesture = Gesture.Race(
    doubleTapGesture,
    tapGesture,
    longPressGesture,
    pinchGesture,
    swipeRightGesture,
    swipeLeftGesture,
    panGesture
  );

  return (
    <View className="flex-1 items-center justify-center">
      <GestureDetector gesture={gesture}>
        <Animated.View className="h-[100px] w-[100px] bg-blue-500" style={animatedStyle} />
      </GestureDetector>
    </View>
  );
}
