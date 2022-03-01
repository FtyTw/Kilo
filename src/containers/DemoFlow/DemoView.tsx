import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useTranslation } from 'react-i18next';
import { DefaultButton } from '@components/index';
import styled from 'styled-components';

import { locale } from '../../utils/locale';

export const DemoView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <SectionContainer>
              <SectionTitle>{t('demo:stepOne')}</SectionTitle>
              <SectionDescription>
                Edit <TextHighlight>DemoView.tsx</TextHighlight> to screen and
                then come back to see your edits.
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>{t('demo:seeChanges')}</SectionTitle>
              <SectionDescription>
                <ReloadInstructions />
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>{t('demo:Debug')}</SectionTitle>
              <SectionDescription>
                <DebugInstructions />
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>{t('demo:Locale')}</SectionTitle>
              <SectionDescription>
                {t(`common:currentLanguage`)}
              </SectionDescription>
              <DefaultButton
                onPress={() =>
                  locale.changeLanguage(locale.language === 'en' ? 'lt' : 'en')
                }
                title={t('common:changeLanguage')}
              />
            </SectionContainer>
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary}; ;
`;

const SectionContainer = styled(View)`
  margin-top: 32px;
  padding-horizontal: 24px;
`;

const SectionTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  font-weight: 600;
`;

const SectionDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.text80};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  margin-top: 8px;
`;

const TextHighlight = styled(Text)`
  font-weight: 700;
`;
