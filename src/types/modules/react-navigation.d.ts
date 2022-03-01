import { StackNavigationProp } from '@react-navigation/stack/';
import { RouteProp } from '@react-navigation/native';

import { NavigationMap } from '../../routes/NavigationMap';

declare module '@react-navigation/native' {
  export function useNavigation<T = StackNavigationProp<NavigationMap>>(): T;
  export function useRoute<
    RouteName = keyof NavigationMap,
    T = RouteProp<NavigationMap, RouteName>,
  >(): T;
}
