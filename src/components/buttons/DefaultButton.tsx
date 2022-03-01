import React from 'react';
import styled from 'styled-components/native';

interface DefaultButtonProps {
  onPress: (event: unknown) => void;
  title: string;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  onPress,
  title,
}) => (
  <TouchableWrapper onPress={onPress}>
    <ButtonTitle>{title}</ButtonTitle>
  </TouchableWrapper>
);

const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 100%;
`;

const TouchableWrapper = styled.TouchableOpacity`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 32px;
  padding-vertical: 10px;
  padding-horizontal: 15px;
`;
