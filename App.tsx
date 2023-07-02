import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Router from './src/navigation/MainNavigation';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';

function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}

export default App;
