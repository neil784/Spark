import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function EmptyFeed() {
  return (
    <View style={styles.container}>
      {/* <FeedEmpty width={'100%'} height={'50%'} style={styles.img} /> */}
      <Image source={require('../assets/feed_empty.png')} style={styles.img} />
      <Text style={styles.message}>
        Nothing to see here! Why not create your own brainstorm?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '80%',
  },
  message: {
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  img: {
    width: '100%',
    height: '50%',
  },
});
