import { useNavigation, useNavigationState } from '@react-navigation/native';

import { Route } from '../routes/RouteNames';
import { useQuestions } from './selectors';

export const useNavigationFuncs = () => {
  const navigation = useNavigation();
  const index = useNavigationState(({ index }) => index);

  const { questions, visited_page } = useQuestions();
  const storedStepIndex = questions.findIndex(
    ({ key }) => key === visited_page,
  );

  const currentIndex = ~storedStepIndex ? storedStepIndex : index;
  const currentStep = currentIndex + 1;
  const currentStateName = questions[currentIndex]?.key
    ? questions[currentIndex].key
    : null;

  const goToPreviousState = () => {
    if (currentStep === 1) {
      navigation.navigate(Route.Quiz);

      return;
    }

    if (!navigation.canGoBack()) return;

    navigation.goBack();
  };

  const navigateToAnswers = () => navigation.navigate(Route.Answers);

  const navigateToFirstQuestion = () => {
    const { key: firstRoute } = questions[0];

    navigation.navigate(firstRoute);
  };

  const goToStepBeforeCurrent = () => {
    if (questions[currentIndex - 1]) {
      navigation.push(questions[currentIndex - 1].key);
    }
  };

  const goToNextState = () => {
    const { key: nextStateName } = questions[currentIndex + 1];

    navigation.navigate(nextStateName);
  };

  const goBack = currentStep - 1 ? goToStepBeforeCurrent : goToPreviousState;

  return {
    currentStep,
    goBack,
    goToPreviousState,
    goToStepBeforeCurrent,
    goToNextState,
    currentStateName,
    navigateToAnswers,
    navigateToFirstQuestion,
  };
};
