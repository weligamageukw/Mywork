import {Button, Text, View, StyleSheet} from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Button title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0e0e',
  },
  emptyText: {
    fontSize: 18,
    color: '#eee',
    flex: 1,
    alignSelf: 'center',
    marginTop: 150,
    textAlign: 'center',
  },
});
