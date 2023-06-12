import {View, Text, Button} from 'react-native';
import React, {useReducer} from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state;
  }
}

const ReducerTest = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{count}</Text>
      <Button title="inc" onPress={() => dispatch({type: 'inc'})} />
      <Button title="dec" onPress={() => dispatch({type: 'dec'})} />
    </View>
  );
};

export default ReducerTest;
