import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SoulLibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soul Library</Text>
      <Text style={styles.description}>
        A growing collection of guided meditations, articles, and uplifting resources for every season of your life.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006080',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
