import React from 'react';
import { View, Button, Text } from 'react-native';
export function Screen1({ navigation }) {
  return (<View style={{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 40,
  }}>
    <Text>{'Screen1'}</Text>
    <Buttons navigation={navigation} />
  </View>);
}
export function Screen2({ navigation }) {
  return (<View style={{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 40,
  }}>
    <Text>{'Screen2'}</Text>
    <Buttons navigation={navigation} />
  </View>);
}
export function Screen3({ navigation }) {
  return (<View style={{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 40,
  }}>
    <Text>{'Screen3'}</Text>
    <Buttons navigation={navigation} />
  </View>);
}
export function Screen4({ navigation }) {
  return (<View style={{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 40,
  }}>
    <Text>{'Screen4'}</Text>
    <Buttons navigation={navigation} />
  </View>);
}
function Buttons({ navigation }) {
  return (<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
    <Button title="Screen1" onPress={() => navigation.navigate('Screen1')} />
    <Button title="Screen2" onPress={() => navigation.navigate('Screen2')} />
    <Button title="Screen3" onPress={() => navigation.navigate('Screen3')} />
    <Button title="Screen4" onPress={() => navigation.navigate('Screen4')} />
  </View>);
}
