import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@assets/theme';

import Icon from './Icon';
import ProgressLine from './ProgressLine';
import { useAnswersActions, useNavigationFuncs } from '../hooks';

interface HeaderProps {
  quantity: number;
}
const { isIOS } = global;

export const Header: React.FC<HeaderProps> = ({ quantity }) => {
  const { currentStep: step, currentStateName, goBack } = useNavigationFuncs();
  const { removeAnswerAction } = useAnswersActions();
  const {
    colors: { primaryContent },
  } = useTheme();

  const backAction = () => {
    removeAnswerAction(currentStateName);
    goBack();

    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <SafeAreaView>
      <Wrapper isIOS={isIOS}>
        <PressableStyled onPress={backAction} hitSlop={40}>
          <Icon name="chevron-left" size={24} color={primaryContent} />
        </PressableStyled>
        <StepsView>
          <StepsText>{`Step ${step} of ${quantity}`}</StepsText>
        </StepsView>
        <PressableStyled disabled />
      </Wrapper>

      <ProgressLine
        steps={quantity}
        localKey="header-steps"
        currentStep={step}
      />
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  height: ${({ isIOS, theme }) => (isIOS ? theme.headers.main : 54)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.padding.defaultHorizontal}px;
`;

const PressableStyled = styled.Pressable`
  width: 40px;
`;

const StepsView = styled.View`
  width: 100px;
  align-items: center;
`;

const StepsText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryContent};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.weight.bold};
`;
