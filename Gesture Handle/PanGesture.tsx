import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home({ navigation }: HomeParamProp) {

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const onGestureHandler = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value
      context.positionY = positionY.value
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ]
  }))

  return (
    <PanGestureHandler onGestureEvent={onGestureHandler}>
      <Animated.View style={[myCarsButtonStyle, styles.buttonView]}>
        <ButtonAnimated
          onPress={handleOpenMyCars}
          style={[styles.button, { backgroundColor: theme.colors.main }]}
        >
          <Ionicons
            name="ios-car-sport"
            size={32}
            color={theme.colors.shape}
          />
        </ButtonAnimated>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    position: "absolute",
    bottom: 13,
    right: 22,
  }
})
