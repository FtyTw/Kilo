import React, { useEffect } from 'react';
import { BackHandler, Platform, StatusBar } from 'react-native';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  getActiveRouteName,
  navigationRef,
  setStatusBar,
} from '../utils/navigation';
import { Answers, Questions, Quiz } from '../containers';
import { ErrorLoading, Header, LoadingState } from '../components';
import { Route } from './RouteNames';
import { useDirection, useQuestions, useQuestionsActions } from '../hooks';

let currentRouteName = 'unknown';
let previousRouteName = 'unknown';

export const getCurrentRouteName = () => currentRouteName;
export const getPreviousRouteName = () => previousRouteName;

const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
const QuestionsStack = createStackNavigator();

const QuestionsNavigator = () => {
  const { getQuestionsAction, setQuestionsLoadingAction } =
    useQuestionsActions();
  const direction = useDirection();

  const {
    questions = [],
    error = false,
    loading = true,
    visited_page = null,
  } = useQuestions();

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
      header: props => <Header {...props} quantity={quantity} />,
      cardStyle: { backgroundColor: '#fff', paddingTop },
      gestureDirection: direction,
    },
  };

  useEffect(onMount, []);

  if (loading) {
    return <LoadingState />;
  } else if (error) {
    return <ErrorLoading errorMessage={error} />;
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
  const { visited_page = null } = useQuestions();
  currentRouteName = visited_page || currentRouteName;

  const { setLastVisitedPageAction } = useQuestionsActions();
  const direction = useDirection();

  const onMount = () => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBack);

    return () => onUnmount();
  };

  const onUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', onAndroidBack);
  };

  useEffect(onMount, []);

  const onAndroidBack = () => {
    if (currentRouteName === Route.Quiz || currentRouteName === 'unknown') {
      BackHandler.exitApp();
    }

    return false;
  };

  const onRouteChange = (state: NavigationState) => {
    previousRouteName = currentRouteName;
    currentRouteName = getActiveRouteName(state) as string;

    if (currentRouteName !== previousRouteName) {
      setStatusBar(currentRouteName);

      setLastVisitedPageAction(
        !currentRouteName.match(/quiz|answers/g) ? currentRouteName : null,
      );
    }
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state: NavigationState) => onRouteChange(state)}
    >
      <Stack.Navigator
        initialRouteName={visited_page ? Route.Questions : null}
        screenOptions={{
          headerShown: false,
          gestureDirection: direction,
        }}
      >
        <Stack.Screen
          options={{
            cardStyle: {
              paddingHorizontal: 24,
              paddingTop,
            },
          }}
          name={Route.Quiz}
          component={Quiz}
        />
        <Stack.Screen name={Route.Questions} component={QuestionsNavigator} />
        <Stack.Screen
          options={{ headerShown: false }}
          name={Route.Answers}
          component={Answers}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
