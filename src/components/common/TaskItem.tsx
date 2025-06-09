import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State, RectButton } from 'react-native-gesture-handler';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import createStyles from '../../pages/homePage/style';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = -width * 0.25;

export default function TaskItem({ tarefa, index, toggleCheck, onDelete, styles }) {
  const { theme, currentThemeName } = useTheme();
  const baseStyles = createStyles(theme);

  const translateX = useRef(new Animated.Value(0)).current;

  const renderRightActions = () => {
    const trashIcon = currentThemeName === 'dark'
      ? require('../../assets/icons/Trash.png') // Ícone para o modo escuro
      : require('../../assets/icons/TrashLight.png'); // Ícone para o modo claro

    const scale = translateX.interpolate({
      inputRange: [SWIPE_THRESHOLD * 2, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const opacity = translateX.interpolate({
        inputRange: [SWIPE_THRESHOLD * 2, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
      <RectButton style={baseStyles.swipeableAction} onPress={() => onDelete(tarefa.id)}>
        <Animated.View style={[baseStyles.swipeableActionBackground, { opacity }]}>
            <Animated.Image
            source={trashIcon}
            style={[baseStyles.trashIcon, { transform: [{ scale }] }]}
            />
        </Animated.View>
      </RectButton>
    );
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const dragX = nativeEvent.translationX;

      if (dragX < SWIPE_THRESHOLD) {
        Animated.spring(translateX, {
          toValue: SWIPE_THRESHOLD,
          useNativeDriver: true,
          bounciness: 10,
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 10,
        }).start();
      }
    }
  };

  return (
    <View style={baseStyles.taskItemWrapper}>
      {renderRightActions()}

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View
          style={[
            baseStyles.containerTesk,
            { transform: [{ translateX }] },
          ]}
        >
          <View style={baseStyles.contentTesk}>
            <View style={baseStyles.tasktitle}>
              <Text style={[baseStyles.txth1, tarefa.concluida && baseStyles.taskCompletedText]}>{tarefa.titulo}</Text>
              <TouchableOpacity
                style={[baseStyles.checkContainer, tarefa.concluida && baseStyles.checkContainerChecked]}
                onPress={() => toggleCheck(index)}
              >
                {tarefa.concluida && <Text style={baseStyles.checkMark}>✓</Text>}
              </TouchableOpacity>
            </View>
            <Text style={[baseStyles.txtp, tarefa.concluida && baseStyles.taskCompletedText]}>{tarefa.descricao}</Text>

            <TouchableOpacity style={baseStyles.btn}>
              <Text style={baseStyles.txtbtn}>VER DETALHES</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}