import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import {
  getActiveRouteName,
  navigationRef,
  setStatusBar,
} from '../utils/navigation';
import { Questions } from '../containers';
import { ErrorLoading, Header, LoadingState } from '../components';
import { Route } from './RouteNames';
import { useQuestionsActions } from '../hooks';

const disabledAndroidBackScreens: string[] = [Route.Demo];

let currentRouteName = 'unknown';
let previousRouteName = 'unknown';

export const getCurrentRouteName = () => currentRouteName;
export const getPreviousRouteName = () => previousRouteName;

const QuestionsStack = createStackNavigator();

const QuestionsNavigator = () => {
  const { getQuestionsAction, setQuestionsLoadingAction } =
    useQuestionsActions();
  const {
    questions = [],
    error = true,
    loading = false,
    visited_page = null,
  } = useSelector(state => state.questions);

  const onMount = () => {
    if (!questions.length) {
      getQuestionsAction();
    } else {
      setQuestionsLoadingAction(false);
    }
  };

  const quantity = questions.length;

  const Options = {
    initialRouteName: visited_page,
    screenOptions: {
      animationEnabled: false,
      header: props => <Header {...props} quantity={quantity} />,
      cardStyle: { backgroundColor: '#fff' },
    },
  };

  useEffect(onMount, []);

  if (loading) {
    return <LoadingState />;
  } else if (error) {
    return <ErrorLoading />;
  } else {
    return (
      <QuestionsStack.Navigator {...Options}>
        {questions.map(question => (
          <QuestionsStack.Screen key={question.key} name={question.key}>
            {props => (
              <Questions {...props} question={question} quantity={quantity} />
            )}
          </QuestionsStack.Screen>
        ))}
      </QuestionsStack.Navigator>
    );
  }
};

const Navigator = () => {
  const onMount = () => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBack);

    return () => onUnmount();
  };

  const onUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', onAndroidBack);
  };

  const { setLastVisitedPageAction } = useQuestionsActions();

  useEffect(onMount, []);

  const onAndroidBack = () => {
    const scene = currentRouteName;
    const enableBack = disabledAndroidBackScreens.indexOf(scene) !== -1;

    return enableBack;
  };

  const onRouteChange = (state: NavigationState) => {
    previousRouteName = currentRouteName;
    currentRouteName = getActiveRouteName(state) as string;

    if (currentRouteName !== previousRouteName) {
      setLastVisitedPageAction(currentRouteName);
      setStatusBar(currentRouteName);
    }
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state: NavigationState) => onRouteChange(state)}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={'questions_stack'} component={QuestionsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
