import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@assets/theme';

import CheckBox from '../CheckBox';
import Icon from '../Icon';

const { isIOS } = global;
const ButtonTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  font-family: ${({ isBold }) => (isBold ? 'Lato-Bold' : 'Lato-Regular')};
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  margin-left: ${({ type }) => (type === 'multiple' ? 16 : 0)}px;
  color: ${({ color }) => color};
`;

const PressableWrapper = styled.TouchableOpacity`
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 20px;
  elevation: 5;
  justify-content: ${({ justify }) => justify};
  background: ${({ background }) => background};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  flex-direction: ${({ type }) => (type === 'single' ? 'row-reverse' : 'row')};
  box-shadow: ${({ isIOS }) =>
    isIOS ? '0px 2px 24px rgba(0,0,0,0.1)' : '0px 2px 24px'};
`;

const AnimatedPressable = Animated.createAnimatedComponent(PressableWrapper);

/**
 * Button component
 * @param {String} type accepts three possible values : multiple,single,simple
 * in case of multiple CheckBox component will appear
 * single will show only @param {String} title and Icon component with @param {String} iconName
 * simple will show only title with text centered
 * @param {Function} onPress will be fired on background animation finished after native onPress event will be finished
 * @param {Boolean} checkAll value can be used in case if there is group of CustomButton component and all of them has to be checked/unchecked
 */

interface CustomButtonProps {
  onPress: (event: unknown) => boolean;
  title: string;
  type: string;
  iconName: string;
  disabled: boolean;
  checkAll: boolean | null;
  containerStyles: {
    marginTop: number;
    marginBottom: number;
    margin: number;
    marginHorizontal: number;
  };
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  type = 'simple',
  iconName = 'chevron-right',
  disabled = false,
  checkAll = null,
  containerStyles = {},
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

  const isBold = useMemo(
    () => (type === 'multiple' && pressed) || type.match(/single|simple/g),
    [type, pressed],
  );

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

  useEffect(() => {
    if (typeof checkAll === 'boolean') {
      setChecked(checkAll);
    }
  }, [checkAll]);

  return (
    <AnimatedPressable
      isIOS={isIOS}
      delayPressIn={200}
      activeOpacity={1}
      disabled={disabled}
      type={type}
      justify={justify}
      background={animatedBackground}
      style={{
        backgroundColor: animatedBackground,
        ...containerStyles,
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
          onClearCheck={[clearAnimation]}
          onFillCheck={[fillAnimation]}
          onCheckedChange={onCheckedChange}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      <ButtonTitle isBold={isBold} type={type} pressed={pressed} color={color}>
        {title}
      </ButtonTitle>
    </AnimatedPressable>
  );
};
