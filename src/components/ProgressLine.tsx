import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

interface ProgressLineProps {
  steps: number;
  key: string;
  currentStep: number;
}

export const ProgressLine: React.FC<ProgressLineProps> = ({
  steps = 1,
  localKey,
  currentStep,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const progressArray = useMemo(() => new Array(steps).fill(1), [steps]);

  return (
    <ProgressLineWrapper>
      {progressArray.map((i, localIndex) => (
        <ProgressLineElement
          key={`${localKey}-${localIndex}`}
          width={Math.floor(screenWidth / steps)}
          localIndex={localIndex}
          index={currentStep - 1}
        />
      ))}
    </ProgressLineWrapper>
  );
};

const ProgressLineWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProgressLineElement = styled.View`
  height: 2px;
  width: ${props => props.width}px;
  background: ${({
    localIndex,
    index,
    theme: {
      colors: { blue, white },
    },
  }) => (localIndex <= index ? blue : white)};
`;

export default ProgressLine;
