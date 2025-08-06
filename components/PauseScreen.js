import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function PauseScreen({ navigation }) {
  const [duration, setDuration] = useState(1);
  const [mode, setMode] = useState('guided'); // 'guided' | 'music' | 'silent'

  const durations = [1, 3, 5];
  const modes = ['guided', 'music', 'silent'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Clarity Break:</Text>
      <Text style={styles.subtitle}>
        Even one quiet moment can return you to yourself.
      </Text>

      <View style={styles.row}>
        {durations.map((d) => (
          <TouchableOpacity
            key={d}
            style={[
              styles.optionButton,
              duration === d && styles.optionButtonSelected,
            ]}
            onPress={() => setDuration(d)}
          >
            <Text
              style={[
                styles.optionText,
                duration === d && styles.optionTextSelected,
              ]}
            >
              {d} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Choose Your Vibe:</Text>
      <View style={styles.row}>
        {modes.map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.optionButton,
              mode === m && styles.optionButtonSelected,
            ]}
            onPress={() => setMode(m)}
          >
            <Text
              style={[
                styles.optionText,
                mode === m && styles.optionTextSelected,
              ]}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('PauseSession', { duration, mode })}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.returnText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 160,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4B0082',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4B0082',
    marginTop: 8,
    marginBottom: 30,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    backgroundColor: '#F3E5F5',
  },
  optionButtonSelected: {
    backgroundColor: '#6A5ACD',
    borderColor: '#6A5ACD',
  },
  optionText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: 'white',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B0082',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#FFDEAD',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
  },
  returnText: {
    fontSize: 14,
    color: '#4B0082',
    textDecorationLine: 'underline',
  },
});
