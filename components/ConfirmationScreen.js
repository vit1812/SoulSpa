import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PauseConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You did it!</Text>
      <Text style={styles.subtitle}>
        Take a moment to notice how you feel.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6A5ACD',
    padding: 14,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
