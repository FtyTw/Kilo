import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

import { Route } from '../routes/RouteNames';
import { CustomButton } from '../components';

interface QuizProps {
  routeName: string;
  route: { name: string };
}

export const Quiz: React.FC<QuizProps> = ({
  route: { name: routeName = '' },
  navigation: { navigate },
}) => {
  const title = useMemo(
    () => routeName[0].toUpperCase() + routeName.slice(1),
    [routeName],
  );

  const navigateToQuestions = () => navigate(Route.Questions);

  return (
    <SafeAreaView>
      <StyledView>
        <StyledTitle>{title}</StyledTitle>
      </StyledView>
      <CustomButton onPress={navigateToQuestions} type="single" title="Hello" />
    </SafeAreaView>
  );
};

const StyledView = styled.View`
  height: 29px;
  margin: 24px 0;
`;

const StyledTitle = styled.Text`
  font-size: ${({
    theme: {
      fonts: {
        size: { xl },
      },
    },
  }) => xl}px;

  font-family: ${({
    theme: {
      fonts: {
        weight: { bold },
      },
    },
  }) => bold};

  color: ${({
    theme: {
      colors: { primaryContent },
    },
  }) => primaryContent};

  font-weight: bold;
`;
