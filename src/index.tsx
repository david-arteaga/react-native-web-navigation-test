import { AppRegistry, Platform } from 'react-native';
import App from './App';
const { name } = { name: 'webproject' };

AppRegistry.registerComponent(name, () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(name, {
    rootTag: document.getElementById('root'),
  });
}
