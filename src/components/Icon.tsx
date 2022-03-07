import React from 'react';
import IconWrapper from 'react-native-vector-icons/FontAwesome';

interface IconProps {
  color: string;
  name: string;
  size: number;
}

export const Icon: React.FC<IconProps> = props => <IconWrapper {...props} />;

export default Icon;
