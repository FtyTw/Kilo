import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';

const PressableWrapper = styled.Pressable`
  width: 20px;
  height: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 4px;
  border-width: 1px;
  background-color: ${props => (!props.checked ? '#D8DDE8' : '#fff')};
  border-color: ${props => props.outlineColor};
`;

const SidesWrapper = styled.View`
  width: 10px;
  height: 7px;
  position: relative;
`;

const SidesView = styled.View`
  background-color: #027aff;
  position: absolute;
  top: 2px;
  transform: rotate(-45deg);
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  left: ${props => props.left}px;
`;

const AnimatedSidesView = Animated.createAnimatedComponent(SidesView);

/**
 * Checkbox component
 * @param {Boolean} 'disabled'
 * @param {Boolean} 'checked' should be provided from the parent component
 * @param {Number} 'duration' in ms for animation speed
 * @param {String} outline color of the checkbox, 'transparent' by default
 * @params {Animated.timing} onClearCheck func that might be triggered in a parallel with clean animation
 * @params { Animated.timing} onFillCheck func that might be triggered in a parallel with fill animation
 * @param {Function} onCheckedChange will be fired on every checked change after animation performed
 * @param {Function} setChecked setter for checked value from the parent component
 */

interface CheckBoxProps {
  disabled: boolean;
  checked: boolean;
  duration: number;
  outlineColor: string;
  onClearCheck: Array<typeof Animated.timing>;
  onFillCheck: Array<typeof Animated.timing>;
  onCheckedChange: (event: unknown) => void;
  setChecked: (event: unknown) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  disabled = false,
  checked = false,
  duration = 150,
  outlineColor = 'transparent',
  onClearCheck = [],
  onFillCheck = [],
  onCheckedChange,
  setChecked,
}) => {
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValues = [animatedValue2, animatedValue1];

  const animation = (animatedValue: Animated.Value, toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.quad),
    });

  const clearCheck = () =>
    Animated.parallel([
      Animated.sequence(animatedValues.map(value => animation(value, 0))),
      ...onClearCheck,
    ]).start(() => onCheckedChange(false));

  const fillCheck = () =>
    Animated.parallel([
      Animated.sequence(
        animatedValues
          .reverse()
          .map((value, index) => animation(value, index ? 10 : 5)),
      ),
      ...onFillCheck,
    ]).start(() => onCheckedChange(true));

  useEffect(() => {
    animateCheckbox(checked);
  }, [checked]);

  const animateCheckbox = checked => {
    onCheckedChange(checked);

    if (checked === true) {
      fillCheck();
    }

    if (checked === false) {
      clearCheck();
    }
  };

  const pressHandler = () => !disabled && setChecked(checked => !checked);

  return (
    <PressableWrapper
      checked={checked}
      onPress={pressHandler}
      outlineColor={outlineColor}
    >
      <SidesWrapper>
        <AnimatedSidesView height={animatedValue1} width={2} left={1} />
        <AnimatedSidesView width={animatedValue2} height={2} left={2} />
      </SidesWrapper>
    </PressableWrapper>
  );
};

export default CheckBox;
