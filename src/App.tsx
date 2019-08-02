import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createBrowserApp } from '@react-navigation/web';
import { Screen1, Screen2, Screen3, Screen4 } from './Screens';

const Navigator = createStackNavigator(
  {
    Screen1: Screen1,
    Screen2: Screen2,
    Screen3: Screen3,
    Screen4: Screen4,
  },
  {
    cardStyle: {
      flex: 1, // this is needed for web
    },
  },
);

export default Platform.select({
  default: createAppContainer,
  web: createBrowserApp,
})(Navigator);
