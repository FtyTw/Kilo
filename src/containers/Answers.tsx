/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import { CustomButton } from '../components';
import {
  useAnswersActions,
  useFocusBackHandler,
  useNavigationFuncs,
} from '../hooks';

export const Answers: React.FC<{}> = () => {
  const { answers } = useSelector(({ answers }) => answers);
  const { clearAnswerAction } = useAnswersActions();
  const data = useMemo(
    () =>
      answers.map(({ label, answers }) => ({ title: label, data: answers })),
    [answers],
  );

  const { navigateToFirstQuestion } = useNavigationFuncs();

  const goBackAction = () => {
    clearAnswerAction();
    navigateToFirstQuestion();

    return true;
  };

  useFocusBackHandler(goBackAction);

  return (
    <StyledSafeView>
      <StyledSectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <StyledText>{`${index + 1}) ${item}`} </StyledText>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <StyledTitle>{title}</StyledTitle>
        )}
        ListFooterComponent={<StyledFooter />}
      />
      <CustomButton
        type="simple"
        title="Something wrong? Get back by press"
        onPress={goBackAction}
        containerStyles={{ marginBottom: 16, marginHorizontal: 24 }}
      />
    </StyledSafeView>
  );
};

const StyledSafeView = styled.SafeAreaView`
  flex: 1;
`;

const StyledSectionList = styled.SectionList`
  flex: 1;
  padding: 20px;
  margin-bottom: 20px;
`;

const StyledTitle = styled.Text`
  font-size: 16px;

  text-transform: uppercase;
`;
const StyledText = styled.Text`
  margin: 15px;
`;

const StyledFooter = styled.View`
  height: 20px;
`;
