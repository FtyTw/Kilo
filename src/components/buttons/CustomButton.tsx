import React, { useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import Icon from '../Icon';
import CheckBox from '../CheckBox';
import { useTheme } from '@assets/theme';

const ButtonTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  font-family: 'Lato-Black';
  margin-left: ${props => (props.type === 'multiple' ? 16 : 0)}px;
  color: ${props => props.color};
  font-weight: ${props =>
    (props.type === 'multiple' && props.pressed) ||
    props.type.match(/single|simple/g)
      ? 'bold'
      : 'normal'};
`;

const PressableWrapper = styled.Pressable`
  height: 54px;
  border-radius: 12px;
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 20px;
  flex-direction: ${props => (props.type === 'single' ? 'row-reverse' : 'row')};
  elevation: 1;
  justify-content: ${props => props.justify};
`;

const buttonTypeStyling = {
  colors: {
    multiple: ['#222222', '#fff'],
    single: ['#027AFF', '#fff'],
    simple: ['#fff', '#027AFF'],
  },
  textAlignment: {
    multiple: 'flex-start',
    single: 'space-between',
    simple: 'center',
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(PressableWrapper);

/**
 * Button component
 * @param {String} type accepts three possible values : multiple,single,simple
 * in case of multiple CheckBox component will appear
 * single will show only @param {String} title and Icon component with @param {String} iconName
 * simple will show only title with text centered
 * @param {Function} onPress will be fired on background animation finished after native onPress event will be finished
 */

interface CustomButtonProps {
  onPress: (event: unknown) => boolean;
  title: string;
  type: string;
  iconName: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  type = 'simple',
  iconName = 'chevron-right',
}) => {
  const [pressed, setPressed] = useState(false);
  const [checked, setChecked] = useState(false);
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const {
    colors: { primaryContent, invertedContent, blue, backgroundPrimary },
  } = useTheme();

  const buttonTypeStyling = {
    colors: {
      multiple: [primaryContent, invertedContent],
      single: [blue, invertedContent],
      simple: [invertedContent, blue],
    },
    textAlignment: {
      multiple: 'flex-start',
      single: 'space-between',
      simple: 'center',
    },
  };

  const backgroundRanges = [backgroundPrimary, blue];
  const outputRange = useMemo(
    () => (type === 'simple' ? backgroundRanges.reverse() : backgroundRanges),
    [type],
  );
  const mainAnimation = toValue =>
    Animated.timing(animatedValue1, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    });

  const [clearAnimation, fillAnimation] = useMemo(
    () => [0, 1].map(mainAnimation),
    [mainAnimation],
  );

  const animatedBackground = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange,
  });

  const onCheckedChange = (value: boolean) => setPressed(value);
  const justify = useMemo(() => buttonTypeStyling.textAlignment[type], [type]);
  const color = useMemo(
    () => buttonTypeStyling.colors[type][+pressed],
    [type, pressed],
  );

  return (
    <AnimatedPressable
      type={type}
      justify={justify}
      background={animatedBackground}
      style={{
        backgroundColor: animatedBackground,
      }}
      onPressIn={() => {
        setPressed(true);
        mainAnimation(1).start();
      }}
      onPress={() => {
        setPressed(false);
        setChecked(checked => !checked);
        mainAnimation(0).start(onPress);
      }}
    >
      {type === 'single' && <Icon name={iconName} size={18} color={color} />}

      {type === 'multiple' && (
        <CheckBox
          //
          onClearCheck={[clearAnimation]}
          onFillCheck={[fillAnimation]}
          onCheckedChange={onCheckedChange}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      <ButtonTitle type={type} pressed={pressed} color={color}>
        {title}
      </ButtonTitle>
    </AnimatedPressable>
  );
};
