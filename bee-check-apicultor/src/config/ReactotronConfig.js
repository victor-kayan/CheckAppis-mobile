import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux'
import { AsyncStorage } from 'react-native';

const tron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(reactotronRedux())
  .connect();

tron.clear();

console.tron = tron;

export default tron;