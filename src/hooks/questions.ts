import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const useNavigationFuncs = () => {
  const navigation = useNavigation();
  const index = useNavigationState(({ index }) => index);
  const { questions, visited_page } = useSelector(state => state.questions);
  const storedStepIndex = questions.findIndex(
    ({ key }) => key === visited_page,
  );
  const currentIndex = ~storedStepIndex ? storedStepIndex : index;
  const currentStep = currentIndex + 1;
  const { key: currentStateName } = questions[currentIndex];

  const goToPreviousState = () => {
    if (!navigation.canGoBack()) return;

    navigation.goBack();
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
  };
};
