import DeviceInfo from 'react-native-device-info';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;

globalThis.aspectRatio = aspectRatio;
globalThis.brand = DeviceInfo.getBrand().toLowerCase();
globalThis.hasNotch = DeviceInfo.hasNotch();
globalThis.height = height;
globalThis.isIOS = Platform.OS === 'ios';
globalThis.isSmallHeight = height < 690;
globalThis.isSmallScreen = width < 350;
globalThis.width = width;
