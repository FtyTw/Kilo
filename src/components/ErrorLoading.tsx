import React from 'react';
import styled from 'styled-components';

import { useQuestionsActions } from '../hooks';

interface ErrorLoadingProps {
  errorMessage: string;
}

export const ErrorLoading: React.FC<ErrorLoadingProps> = ({ errorMessage }) => {
  const { getQuestionsAction } = useQuestionsActions();

  return (
    <StyledSafeArea>
      <StyledPressable onPress={getQuestionsAction}>
        <StyledText>
          Something went wrong during questions loading, to try again click the
          button below
        </StyledText>

        <StyledText small>Try again</StyledText>

        <StyledText small>{errorMessage}</StyledText>
      </StyledPressable>
    </StyledSafeArea>
  );
};

const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
`;

const StyledPressable = styled.Pressable`
  justify-content: space-around;
  align-items: center;
  padding: 24px;
  text-align: center;
  display: flex;

  flex: 1;
`;

const StyledText = styled.Text`
  color: ${({
    theme: {
      colors: { error },
    },
  }) => error};
  font-family:${({
    theme: {
      fonts: {
        weight: { bold },
      },
    },
  }) => bold}
  font-size:${({
    small,
    theme: {
      fonts: {
        size: { xxxl, l },
      },
    },
  }) => (small ? l : xxxl)}
`;
