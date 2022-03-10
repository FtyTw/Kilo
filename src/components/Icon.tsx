import React from 'react';
import IconWrapper from 'react-native-vector-icons/FontAwesome5';

interface IconProps {
  name: string;
  size: number;
  color: string;
}

export const Icon: React.FC<IconProps> = props => (
  <IconWrapper {...props} light />
);

export default Icon;
