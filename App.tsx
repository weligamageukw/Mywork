import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './src/navigation/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';

function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
