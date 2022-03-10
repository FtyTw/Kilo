import React from 'react';
import styled from 'styled-components';

export const LoadingState = () => (
  <LoadingView>
    <StyledIndicator />
  </LoadingView>
);

const LoadingView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledIndicator = styled.ActivityIndicator.attrs(
  ({
    theme: {
      colors: { blue },
    },
  }) => ({ size: 'large', color: blue }),
)``;
