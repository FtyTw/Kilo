/* eslint-disable  react-native/no-inline-styles  */

import React, { useState } from 'react';
import styled from 'styled-components/native';

import { CustomButton } from '../components';
import { useAnswersActions, useNavigationFuncs } from '../hooks';

const { isIOS } = global;

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
  const [checkedValues, setCheckedValues] = useState([]);
  const { goToNextState, currentStep, navigateToAnswers } =
    useNavigationFuncs();

  const { addAnswerAction } = useAnswersActions();

  const handleAnswers = (data: Array<string> | string) => {
    const answers = Array.isArray(data) ? data : [data];
    const { key, label } = question;
    const payload = { key, label, answers };
    addAnswerAction(payload);
  };

  const { type, options, label } = question;

  const onCheckAll = () => {
    setCheckAll(true);
    const allAnswers = options.map(({ label }) => label);
    setTimeout(() => {
      onNextButtonClick(allAnswers);
    }, 500);
  };

  const onNextButtonClick = answers => {
    handleAnswers(answers);

    if (currentStep !== quantity) {
      goToNextState();
    } else {
      navigateToAnswers();
    }

    setCheckedValues([]);
  };

  const onAnswerButtonClick = answer => {
    if (type === 'single') {
      onNextButtonClick(answer);
    }

    if (type === 'multiple') {
      setCheckedValues(checkedValues =>
        checkedValues.includes(answer)
          ? checkedValues.filter(i => i !== answer)
          : [...checkedValues, answer],
      );
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
              onPress={() => onAnswerButtonClick(optionLabel)}
              containerStyles={{ marginBottom: 16 }}
            />
          ))}
      </StyledScrollView>
      {type === 'multiple' && (
        <ShadowView isIOS={isIOS}>
          <CustomButton
            disabled={!checkedValues.length}
            type="simple"
            title="Next"
            onPress={() => onNextButtonClick(checkedValues)}
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
  box-shadow: ${({ isIOS }) =>
    isIOS ? '0px 2px 24px rgba(0,0,0,0.2)' : '0px 2px 24px'};

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
