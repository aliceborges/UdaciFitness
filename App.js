import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
/*
  componentDidMount(){
    console.log('Before')
    debugger
    console.log('After')
  }
*/
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name='ios-pizza' color='red' size={100}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
