/* eslint-disable  react-native/no-inline-styles  */

import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';

import { CustomButton } from '../components';
import { useAnswersActions, useNavigationFuncs } from '../hooks';

interface QuestionsProps {
  question: {
    key: string;
    label: string;
    options: Array<string>;
    type: string;
  };
  quantity: number;
}

export const Questions: React.FC<QuestionsProps> = ({ question, quantity }) => {
  const [checkAll, setCheckAll] = useState(null);

  let { current: checkedValues } = useRef([]);

  const { goToNextState, currentStep } = useNavigationFuncs();
  const { addAnswerAction } = useAnswersActions();

  const handleAnswers = () => {
    const { key, label } = question;
    const payload = { key, label, answers: checkedValues };
    addAnswerAction(payload);
  };

  const toggleAnswers = answer =>
    (checkedValues = checkedValues.includes(answer)
      ? checkedValues.filter(i => i !== answer)
      : [...checkedValues, answer]);

  const { type, options, label } = question;

  const onCheckAll = () => {
    setCheckAll(true);
    setTimeout(() => {
      checkedValues = options.map(({ label }) => label);
      handleAnswers();
      goToNextState();
    }, 500);
  };

  const onToggleAnswers = optionLabel => {
    toggleAnswers(optionLabel);

    if (type === 'single') {
      handleAnswers();
      goToNextState();
    }
  };

  const onNextButtonClick = () => {
    if (currentStep !== quantity) {
      handleAnswers();
      goToNextState();
    } else {
      console.log('navigate to answers');
    }
  };

  return (
    <StyledSafeArea>
      <TitleView>
        <TitleText>{label}</TitleText>
      </TitleView>

      <StyledScrollView>
        {type === 'multiple' && (
          <>
            <CustomButton
              title="Select all"
              type={'single'}
              onPress={onCheckAll}
              containerStyles={{ marginBottom: 16 }}
            />

            <Splitter />
          </>
        )}

        {type !== 'info' &&
          options.map(({ value, label: optionLabel }) => (
            <CustomButton
              key={value}
              checkAll={checkAll}
              title={optionLabel}
              type={type}
              onPress={() => onToggleAnswers(optionLabel)}
              containerStyles={{ marginBottom: 16 }}
            />
          ))}
      </StyledScrollView>
      {type === 'multiple' && (
        <ShadowView>
          <CustomButton
            type="simple"
            title="Next"
            onPress={onNextButtonClick}
            containerStyles={{ marginHorizontal: 24, marginTop: 16 }}
          />
          <IosShadowWrapper />
        </ShadowView>
      )}
    </StyledSafeArea>
  );
};

const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  position: relative;
`;

const TitleView = styled.View`
  padding: 24px 24px 0;
  position: relative;
  z-index: 1;
`;

const TitleText = styled.Text`
  color: ${props => props.theme.colors.primaryContent};
  font-size: ${props => props.theme.fonts.size.xl}px;
  font-family: ${props => props.theme.fonts.weight.bold};
`;

const StyledScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
}))`
  z-index: 2;
  position: relative;
`;

const ShadowView = styled.View`
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.2);
  height: 80px;
  background-color: #ffffff;
  position: relative;
  elevation: 6;
`;

const IosShadowWrapper = styled.View`
  height: 80px;
  background-color: #ffffff;
  position: relative;
`;

const Splitter = styled.View`
  height: 0px;
  margin-top: 8px;
  margin-bottom: 24px;
  border: 0.5px solid #dfe2e6;
`;
